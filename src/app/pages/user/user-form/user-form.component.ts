import {Component, OnInit} from '@angular/core';
import {PageComponent} from '../../page/page-component';
import {UserDto} from '../../../dtos/sofia/user/user-dto';
import {UserService} from '../../../services/crud/sofia/user.service';
import {CommandNavigatorService} from '../../../services/system/sofia/command-navigator.service';
import {MenuService} from '../../../services/crud/sofia/menu.service';
import {MenuDTO} from '../../../dtos/sofia/menu/menuDTO';
import {ActivatedRoute} from '@angular/router';
import {Location} from '@angular/common';
import {RoleService} from '../../../services/crud/sofia/role.service';
import {RoleDTO} from '../../../dtos/sofia/user/role-dto';
import {LanguageDTO} from '../../../dtos/sofia/language/language-dto';
import {LanguageService} from '../../../services/crud/sofia/language.service';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css']
})
export class UserFormComponent extends PageComponent implements OnInit {

  public userDTO: UserDto;
  public menuDTOS: MenuDTO[];
  public roleDTOS: RoleDTO[];
  public languageDTOS: LanguageDTO[];
  public mode: string;
  public visibleSection = 'general';

  constructor(private userService: UserService,
              private menuService: MenuService,
              private roleService: RoleService,
              private navigatorService: CommandNavigatorService,
              private activatedRoute: ActivatedRoute,
              private location: Location,
              private languageService: LanguageService
  ) {
    super();
  }

  ngOnInit(): void {
    this.initNav(this.activatedRoute);

    let id = '0';
    this.mode = 'new-record';
    this.userDTO = new UserDto();

    const locateParams = this.getLocateParams();
    if (locateParams.has('ID')) {
      id = locateParams.get('ID');
      this.mode = 'edit-record';
    }

    if (this.mode === 'edit-record') {
      this.userService.getById(id).subscribe(data => {
        this.userDTO = data;
        this.cleanIdsIfCloneEnabled();
      });
    }

    this.retrieveComponents();
  }

  retrieveComponents() {
    this.menuService.get().subscribe(data => {
      this.menuDTOS = data;
    });

    this.roleService.get().subscribe(data => {
      this.roleDTOS = data;
    });

    this.languageService.get().subscribe(data => {
      this.languageDTOS = data;
    });
  }

  cleanIdsIfCloneEnabled() {
    if (this.params.has('TYPE')) {
      if (this.params.get('TYPE').toUpperCase() === 'CLONE') {
        this.userDTO.id = null;
        this.userDTO.version = null;
        this.mode = 'new-record';
      }
    }
  }

  delete() {
    this.userService.delete(this.userDTO.id).subscribe(data => {
      this.navigatorService.closeAndBack(this.pageId);
    });
  }

  save() {

    if (this.mode === 'edit-record') {
      this.userService.update(this.userDTO).subscribe(data => {
        this.location.back();
      });
    } else {
      this.userService.save(this.userDTO).subscribe(data => {
        this.location.back();
      });
    }
  }

  showNextPageButton() {
    if (this.nextPage === null) {
      return false;
    } else {
      return true;
    }
  }

  showPreviousPageButton() {
    if (this.previousPage === null) {
      return false;
    } else {
      return true;
    }
  }

  navigateToNextPage() {
    this.navigatorService.navigateToNextPage(this.pageId);
  }

  navigateToPreviousPage() {
    this.navigatorService.navigateToPreviousPage(this.pageId);
  }

  selectSidebarMenu(menu: MenuDTO) {
    this.userDTO.sidebarMenu = menu;
  }

  selectHeaderMenu(menu: MenuDTO) {
    this.userDTO.headerMenu = menu;
  }

  selectDefaultLanguage(languageDTO: LanguageDTO) {
    this.userDTO.defaultLanguage = languageDTO;
  }

  addLanguage(languageDTO: LanguageDTO) {
    if (this.userDTO.languages == null){
      this.userDTO.languages = [];
    }

    this.userDTO.languages.push(languageDTO);
  }

  setVisibleSection(visibleSection: string) {
    this.visibleSection = visibleSection;
  }

  selectRole(role: RoleDTO) {
    if (this.userDTO.roles == null) {
      this.userDTO.roles = [];
    }
    this.userDTO.roles.push(role);
  }

  removeRole(role: RoleDTO) {
    this.userDTO.roles =
      this.userDTO.roles.filter(item => item !== role);
  }

  removeLanguage(language: LanguageDTO) {
    this.userDTO.languages =
      this.userDTO.languages.filter(item => item !== language);
  }

}
