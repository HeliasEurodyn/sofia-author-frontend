import { Component, OnInit } from '@angular/core';
import {PageComponent} from '../page/page-component';
import {RoleService} from '../../services/crud/role.service';
import {RoleDTO} from '../../dtos/user/role-dto';
import {UserDto} from '../../dtos/user/user-dto';
import {AccessControlService} from '../../services/crud/access-control.service';
import {PrivilegeDTO} from '../../dtos/access-control/privilege-dto';
import {NotificationService} from '../../services/system/notification.service';
import {AccessControlDTO} from '../../dtos/access-control/access-control-dto';
import {Location} from '@angular/common';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {RemoveElementModalComponent} from '../../modals/remove_element_modal/remove-element-modal/remove-element-modal.component';

@Component({
  selector: 'app-access-control',
  templateUrl: './access-control.component.html',
  styleUrls: ['./access-control.component.css']
})
export class AccessControlComponent extends PageComponent implements OnInit {

  public types = ['list', 'form', 'menu', 'component', 'dashboard' , 'report' , 'xls import', 'search designer', 'custom query']

  public visibleSection = 'permissions';
  public roles: Array<RoleDTO>;
  public usersHavingTheRole: Array<UserDto>
  public usersNotHavingTheRole: Array<UserDto>
  public selectedRoleId: String;
  public selectedRoleName: String;
  public selectedType: String;
  public selectedTypeOnPermissionAddDialog: String;

  public permissions: Array<AccessControlDTO>;
  public initialPermissions: Array<AccessControlDTO>;
  parentSelectorForUsersHavingTheRole: false;

  parentSelectorForUsersNotHavingTheRole: false;

  constructor(private roleService: RoleService,
              private  accessControlService: AccessControlService,
              private notificationService: NotificationService,
              private location: Location,
              private modalService: NgbModal) {
    super();
  }

  ngOnInit(): void {
    this.usersHavingTheRole = new Array<UserDto>();
    this.usersNotHavingTheRole = new Array<UserDto>();
    this.selectedRoleName = ''
    this.selectedType = ''
    this.selectedTypeOnPermissionAddDialog = 'list';
    this.refresh();
  }

  reload() {
    location.reload();
  }

  refresh() {
    this.accessControlService.getPermissions().subscribe(data => {
      this.initialPermissions = data;
      this.permissions = this?.initialPermissions;
    })
    this.roleService.get().subscribe(data => {
      this.roles = data;
    });

  }

  setVisibleSection(visibleSection: string) {
    this.visibleSection = visibleSection;
  }

  getUsers(roleId: string) {
    this.selectedRoleId = roleId;

    this.accessControlService.getUsersByRole(roleId).subscribe(data => {
      this.usersHavingTheRole = data;
      this.usersHavingTheRole.forEach(user => user.isChecked = false);
    })
  }
  getAvailableUsers(roleId: string) {
    this.selectedRoleId = roleId;

    this.accessControlService.getUsersWithoutTheGivenRole(roleId).subscribe(data => {
      this.usersNotHavingTheRole = data;
      this.usersNotHavingTheRole.forEach(user => user.isChecked = false);
    })
  }
  addUsersToRole() {
     let selectedUsers = this.usersNotHavingTheRole
       .filter(user => user.isChecked === true)
       .map(user => user?.id);

     const privilegeDTO = new PrivilegeDTO(this.selectedRoleId, selectedUsers)
     this.accessControlService.addUsersToRole(privilegeDTO).subscribe(response => {
       this.notificationService.showNotification('top', 'center', 'alert-success', 'fa-id-card', response?.message);
     });
     this.selectedRoleId = null;
     selectedUsers = null;
     this.parentSelectorForUsersNotHavingTheRole = false;
  }
  removeUsersFromRole() {
    let selectedUsers = this.usersHavingTheRole
      .filter(user => user.isChecked === true)
      .map(user => user?.id);

    const privilegeDTO = new PrivilegeDTO(this.selectedRoleId, selectedUsers)
    this.accessControlService.removeUserFromRole(privilegeDTO).subscribe(response => {
      this.notificationService.showNotification('top', 'center', 'alert-success', 'fa-id-card', response?.message);
    })
    this.selectedRoleId = null;
    selectedUsers = null;
    this.parentSelectorForUsersHavingTheRole = false;
  }

  onSelectUser($event) {

    const id = $event.target.value;
    const isChecked = $event.target.checked;

    this.usersHavingTheRole.map(user => {
      if (user.id === id) {
        user.isChecked = isChecked;
        return user;
      }

      if (id === '-1') {
        user.isChecked = this.parentSelectorForUsersHavingTheRole;
        return user;
      }

      return  user;
    });
  }

  onSelectAvailableUser($event) {
    const id = $event.target.value;
    const isChecked = $event.target.checked;

    this.usersNotHavingTheRole.map(user => {
      if (user.id === id) {
        user.isChecked = isChecked;
        return user;
      }

      if (id === '-1') {
        user.isChecked = this.parentSelectorForUsersNotHavingTheRole;
        return user;
      }
        return user;
    });
    console.log(this.usersNotHavingTheRole);
  }

  closeAddUsersModal() {
    this.parentSelectorForUsersNotHavingTheRole = false;
    this.selectedRoleId = null;
  }

  closeRemoveUsersModal() {
    this.parentSelectorForUsersHavingTheRole = false;
    this.selectedRoleId = null;
  }

  checkIThereIsSelectedItem(user: UserDto) {
     return user.isChecked;
  }

  navigateToPreviousPage() {
    this.location.back();
  }

  savePermissions() {
    this.accessControlService.update(this.permissions).subscribe(response => {
      this.reload();
    })
  }

  getFilteredPermissions() {

    this.permissions = this.initialPermissions

     if (this.selectedRoleName) {
         this.permissions = this.permissions?.filter(permission => permission?.roleName === this?.selectedRoleName);

     }
     if (this.selectedType) {
       this.permissions = this.permissions?.filter(permission => permission?.type === this?.selectedType);
     }
  }

  addPermissions() {

  }

  clearFilters() {
    this.selectedRoleName = '';
    this.selectedType = '';
    this.permissions = this.initialPermissions;
  }

  removePermission(permission: AccessControlDTO) {
      const modalReference = this.modalService.open(RemoveElementModalComponent);
      modalReference.componentInstance.element = permission;

    modalReference.result.then((permissionForDelete) => {
      if (permissionForDelete) {
        this.accessControlService.delete(permissionForDelete.id).subscribe(data => {
           this.permissions = this.permissions.filter(item => item !== permissionForDelete);
           this.initialPermissions = this.initialPermissions.filter(item => item !== permissionForDelete)
        });
      }
    });
  }


}
