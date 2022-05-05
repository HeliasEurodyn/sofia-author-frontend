import {Component, OnInit} from '@angular/core';
import {PageComponent} from '../../page/page-component';
import {ActivatedRoute} from '@angular/router';
import {UserGroupService} from '../../../../services/crud/sofia/user-group.service';
import {UserGroupDto} from '../../../../dtos/sofia/user/user-group-dto';
import {Location} from '@angular/common';
import {UserService} from '../../../../services/crud/sofia/user.service';
import {UserDto} from '../../../../dtos/sofia/user/user-dto';

@Component({
  selector: 'app-user-group-form',
  templateUrl: './user-group-form.component.html',
  styleUrls: ['./user-group-form.component.css']
})
export class UserGroupFormComponent extends PageComponent implements OnInit {

  public dto: UserGroupDto;
  public users: UserDto[];
  public mode: string;
  public visibleSection = 'general';


  constructor(private activatedRoute: ActivatedRoute,
              private service: UserGroupService,
              private userService: UserService,
              private location: Location) {
    super();
  }

  ngOnInit(): void {
    this.initNav(this.activatedRoute);

    let id = '0';
    this.mode = 'new-record';
    this.dto = new UserGroupDto();

    const locateParams = this.getLocateParams();
    if (locateParams.has('ID')) {
      id = locateParams.get('ID');
      this.mode = 'edit-record';
    }

    if (this.mode === 'edit-record') {
      this.service.getById(id).subscribe(data => {
        this.dto = data;
      });
    }

    this.retrieveUsers();
  }

  retrieveUsers() {
    this.userService.get().subscribe(data => {
      this.users = data;
    });
  }

  save() {
    if (this.mode === 'edit-record') {
      this.service.update(this.dto).subscribe(data => {
        this.location.back();
      });

    } else {
      this.service.save(this.dto).subscribe(data => {
        this.location.back();
      });
    }
  }

  delete() {
    this.service.delete(this.dto.id).subscribe(data => {
      this.location.back();
    });
  }

  setVisibleSection(visibleSection: string) {
    this.visibleSection = visibleSection;
  }

  addUser(user: UserDto) {
    if (this.dto.users == null) {
      this.dto.users = [];
    }

    this.dto.users.push(user);
  }

  removeUser(user: UserDto) {
    this.dto.users =
      this.dto.users.filter(item => item !== user);
  }
}
