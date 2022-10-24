import {Component, OnInit} from '@angular/core';
import {UserDto} from '../../dtos/sofia/user/user-dto';
import {MenuDTO} from '../../dtos/sofia/menu/menuDTO';
import {UserService} from '../../services/crud/user.service';
import {MenuService} from '../../services/crud/menu.service';
import {CommandNavigatorService} from '../../services/system/sofia/command-navigator.service';
import {ActivatedRoute} from '@angular/router';
import {Location} from '@angular/common';
import {PageComponent} from '../page/page-component';

@Component({
  selector: 'app-user-cmp',
  templateUrl: 'user.component.html'
})
export class UserComponent extends PageComponent implements OnInit {

  public userDTO: UserDto = new UserDto();
  public menuDTOS: MenuDTO[];
  public mode: string;

  constructor(private userService: UserService,
              private menuService: MenuService,
              private navigatorService: CommandNavigatorService,
              private activatedRoute: ActivatedRoute,
              private location: Location) {
    super();
  }

  ngOnInit(): void {
    this.initNav(this.activatedRoute);
      this.userService.getCurrentUser().subscribe(data => {
        this.userDTO = data;
      });
  }

  save() {
      this.userService.update(this.userDTO).subscribe(data => {
        this.location.back();
      });
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
}
