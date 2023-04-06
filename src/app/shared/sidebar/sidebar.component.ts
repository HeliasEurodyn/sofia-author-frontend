import {AfterViewInit, Component, OnDestroy, OnInit} from '@angular/core';
import {CommandNavigatorService} from '../../services/system/command-navigator.service';
import {MenuService} from '../../services/crud/menu.service';
import {MenuDTO} from '../../dtos/menu/menuDTO';
import {LanguageService} from '../../services/system/language.service';
import {SettingsService} from '../../services/crud/settings.service';
import {DomSanitizer} from '@angular/platform-browser';


export interface RouteInfo {
  id: string;
  path: string;
  title: string;
  icon: string;
  class: string;
  type: string;
  children: RouteInfo[];
}

export const ROUTES: RouteInfo[] = [
  // {path: '/dashboard', title: 'Dashboard', icon: 'nc-bank', cssClass: '', children: null},
  // {path: '#', title: 'Other Menus', icon: 'nc-layout-11', cssClass: 'parent-menu', children: null},
  // {path: '/listDto-designer-list', title: 'TableDTO Designer', icon: 'nc-settings', cssClass: '', children: null},
  // {path: '/menu-designer-list', title: 'MenuDTO Designer', icon: 'nc-tile-56', cssClass: '', children: null},
];

@Component({
  moduleId: module.id,
  selector: 'sidebar-cmp',
  templateUrl: 'sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})

export class SidebarComponent implements OnInit, OnDestroy, AfterViewInit {

  title = 'appBootstrap';

  public selectedMenuItems: any[];
  public defaultMenuItems: any[];
  public menuHeaders: any[];
  public sidebarMenu: MenuDTO;
  public username: '';
  public languageSelectionSubject;
  public sidebarImage = '';

  constructor(private navigatorService: CommandNavigatorService,
              private languageService: LanguageService,
              private menuService: MenuService,
              private settingsService: SettingsService,
              private sanitizer: DomSanitizer) {

    navigatorService.sidebarMenuEmmiter.subscribe(id => {

      this.getMenuFromBackend(id);
    });
  }

  ngOnInit() {
    if (sessionStorage.getItem('sidebarMenu') != null) {
      this.sidebarMenu = JSON.parse(sessionStorage.getItem('sidebarMenu'));
    } else {
      const loggedinUser = JSON.parse(localStorage.getItem('loggedin_user'));
      this.sidebarMenu = loggedinUser['sidebarMenu'];
      this.username = loggedinUser['username'];
    }

    const user = JSON.parse(localStorage.getItem('loggedin_user'));
    this.username = user['username'];

    this.selectedMenuItems = this.sidebarMenu.menuFieldList;
    this.defaultMenuItems = this.sidebarMenu.menuFieldList;

    this.defineSidebarImage();
  }

  defineSidebarImage() {
    this.settingsService.getSidebarImage().subscribe(icon => {
      if (icon != null) {
        this.sidebarImage = icon;
      } else {
        this.sidebarImage = './assets/img/sofia.png';
      }
    });
  }

  ngAfterViewInit() {
    this.applyLanguageSelection();
  }

  ngOnDestroy() {
    this.languageSelectionSubject.unsubscribe();
  }

  applyLanguageSelection() {
    this.languageSelectionSubject = this.languageService.languageSelectionEmmiter.subscribe((languageCode: string) => {
      this.getMenuFromBackend(this.sidebarMenu.id);
    });
  }

  getMenuFromBackend(id) {
    const language = JSON.parse(localStorage.getItem('loggedin_user')).currentLanguage;
    const languageId = language == null ? 0 : language.id;

    this.menuService.getMenuFromBackend(id, languageId).subscribe(data => {
      this.menuHeaders = [];
      this.selectedMenuItems = data['menuFieldList'];
      this.defaultMenuItems = data['menuFieldList'];
      sessionStorage.setItem('sidebarMenu', JSON.stringify(data));
    });
  }

  parentMenuSelection(id: string) {
    this.menuHeaders = [];
    this.selectedMenuItems = this.defaultMenuItems;
    this.parentMenuSelectionRecursive(this.selectedMenuItems, id);
    this.menuHeaders.reverse();
  }

  parentMenuSelectionRecursive(menuItems: any[], id: string) {
    for (const menuItem of menuItems) {
      if (menuItem.id === id) {
        this.menuHeaders.push(menuItem);
        this.selectedMenuItems = menuItem.menuFieldList;
        return true;
      } else if (menuItem.command === '#parent-menu#') {
        const foundInBranch = this.parentMenuSelectionRecursive(menuItem.menuFieldList, id);
        if (foundInBranch) {
          this.menuHeaders.push(menuItem);
          return true;
        }
      }
    }
    return false;
  }

  parentMenuUnselection(id: string) {
    this.menuHeaders = [];
    this.selectedMenuItems = this.defaultMenuItems;
    this.parentMenuUnselectionRecursive(this.selectedMenuItems, id);
    this.menuHeaders.reverse();
  }

  parentMenuUnselectionRecursive(menuItems: any[], id: string) {
    for (const menuItem of menuItems) {
      if (menuItem.id === id) {
        this.selectedMenuItems = menuItems;
        return true;
      }
      if (menuItem.command === '#parent-menu#') {
        const foundInBranch = this.parentMenuUnselectionRecursive(menuItem.menuFieldList, id);
        if (foundInBranch) {
          this.menuHeaders.push(menuItem);
          return true;
        }
      }
    }
    return false;
  }

  navigate(menuItem) {
    this.navigatorService.navigate(menuItem.command);
  }

  rightClickNavigate(menuItem, event){
      event.preventDefault();

    const parsedCommand = this.tryParseJSONObject(menuItem.command);
    if(parsedCommand != false){
      parsedCommand['TAB'] = 'new';
      parsedCommand['SIDEBAR-STATUS'] = 'minimized';
      this.navigatorService.navigate(JSON.stringify(parsedCommand));
    } else {
      this.navigatorService.navigate(menuItem.command);
    }
  }

  trustResource(resource) {
    return this.sanitizer.bypassSecurityTrustResourceUrl(resource);
  }

  private tryParseJSONObject(jsonString){
    try {
      var o = JSON.parse(jsonString);

      if (o && typeof o === "object") {
        return o;
      }
    }
    catch (e) { }

    return false;
  }

}
