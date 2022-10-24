import {
  AfterViewInit,
  ApplicationRef,
  Component,
  ComponentRef,
  ElementRef,
  EmbeddedViewRef, OnDestroy,
  OnInit,
  Renderer2,
  ViewChild
} from '@angular/core';
import {ROUTES} from '../sidebar/sidebar.component';
import {ActivatedRoute, Router} from '@angular/router';
import {Location} from '@angular/common';
import {CommandNavigatorService} from '../../services/system/command-navigator.service';
import {LoadingService} from '../../services/system/loading.service';
import {delay} from 'rxjs/operators';
import {HttpErrorResponceService} from '../../services/system/http-error-responce.service';
import {NotificationService} from '../../services/system/notification.service';
import {UserDto} from '../../dtos/user/user-dto';
import {ListSearchService} from '../../services/system/list-search.service';
import {LanguageDTO} from '../../dtos/language/language-dto';
import {LanguageService} from '../../services/system/language.service';
import { UserService } from 'app/services/crud/user.service';
import {SseNotificationService} from '../../services/crud/sse-notification.service';

@Component({
  moduleId: module.id,
  selector: 'navbar-cmp',
  templateUrl: 'navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})

export class NavbarComponent implements OnInit, AfterViewInit, OnDestroy {
  public listTitles: any[];
  public location: Location;
  public nativeElement: Node;
  public toggleButton;
  public sidebarVisible: boolean;
  public sidebarVisibleForDesktop: boolean;
  public loading = false;
  public isCollapsed = true;
  private componentRef: ComponentRef<any>;

  @ViewChild('navbar-cmp', {static: false}) button;
  @ViewChild('pageDiv') pageDiv: ElementRef;
  @ViewChild('insertComponentModal') insertComponentModal: ElementRef;

  public userDto: UserDto;
  public popupTitle = '';

  constructor(location: Location,
              private renderer: Renderer2,
              private element: ElementRef,
              private router: Router,
              private navigatorService: CommandNavigatorService,
              private languageService: LanguageService,
              private loadingService: LoadingService,
              private httpErrorResponceService: HttpErrorResponceService,
              private notificationService: NotificationService,
              private appRef: ApplicationRef,
              private activatedRoute: ActivatedRoute,
              private listSearchService: ListSearchService,
              private userService: UserService,
              private sseNotificationService: SseNotificationService
  ) {
    this.location = location;
    this.nativeElement = element.nativeElement;
    this.sidebarVisible = false;
    this.sidebarVisibleForDesktop = true;

    navigatorService.popupPageEmmiter.subscribe(componentRef => {
      this.componentRef = componentRef;
      this.renderPage(componentRef);
      document.getElementById('insertComponentModalTrigger').click();
      this.popupTitle = componentRef.instance.getPopupTitle();

      setTimeout(() => {
        componentRef.instance.focusElement();
      }, 500);

      componentRef.instance.selectEmmiter.subscribe((returningValues: string[]) => {
        document.getElementById('buttonClose').click();
      });
    });
  }

  ngOnInit() {
    this.listTitles = ROUTES.filter(listTitle => listTitle);
    const navbar: HTMLElement = this.element.nativeElement;
    this.toggleButton = navbar.getElementsByClassName('navbar-toggle')[0];
    this.router.events.subscribe((event) => {
      this.sidebarClose();
    });

    /* Auto minimize sidebar if parameter says so*/
    this.activatedRoute.queryParams.subscribe(params => {

      if (params['sidebar-status'] === 'minimized') {
        this.updateToggle();
      }
    });

    this.listenToLoading();

    this.userDto = JSON.parse(localStorage.getItem('loggedin_user'));
    this.sseNotificationService.subscribe(this.userDto.id, this.notifySSEServerEvent);
  }

  notifySSEServerEvent = (event) => {
    this.notificationService.showNotification('top', 'center', 'alert-info', 'fa-id-card', '<b>Server Event</b> ' + event.data);
  }

  ngAfterViewInit(): void {
    this.insertComponentModal.nativeElement.addEventListener('click', this.onModalClosingActions.bind(this));
    this.insertComponentModal.nativeElement.addEventListener('keyup', this.onModalClosingActions.bind(this));
  }

  ngOnDestroy(): void {
    this.sseNotificationService.closeEventSource();
  }

  onModalClosingActions(event) {
    setTimeout(() => {
       if (this.insertComponentModal.nativeElement.style.display === 'none') {
         this.componentRef.instance.popupCloseEmmiter.emit(true);
         this.componentRef.destroy();
       }
    }, 200);
  }

  public renderPage(componentRef: ComponentRef<any>) {
    this.appRef.attachView(componentRef.hostView);
    const domElem = (componentRef.hostView as EmbeddedViewRef<any>).rootNodes[0] as HTMLElement;
    const childElements = this.pageDiv.nativeElement.childNodes;
    for (const childElement of childElements) {
      this.renderer.removeChild(this.pageDiv.nativeElement, childElement);
    }
    this.renderer.appendChild(this.pageDiv.nativeElement, domElem);
  }

  listenToLoading(): void {
    this.loadingService.loadingSub
      .pipe(delay(0))
      .subscribe((loading) => {
        this.loading = loading;
      });
  }

  mapPagesToHeaders() {
    const headers = [];
    for (const page of this.navigatorService.pages) {
      const params: Map<string, string> = page.instance.params;
      const key = 'HIDE-HEADER';

      if (params.has(key)) {
        if (params.get('HIDE-HEADER') === 'TRUE') {
          continue;
        }
      }

      headers.push(
        {
          pageId: page.instance.pageId,
          title: page.instance.getTitle()
        });
    }
    return headers;
  }

  getTitle() {
    let titlee = this.location.prepareExternalUrl(this.location.path());
    if (titlee.charAt(0) === '#') {
      titlee = titlee.slice(1);
    }
    for (let item = 0; item < this.listTitles.length; item++) {
      if (this.listTitles[item].path === titlee) {
        return this.listTitles[item].getTitle();
      }
    }
    return 'Dashboard';
  }

  sidebarToggle() {
    if (this.sidebarVisible === false) {
      this.sidebarOpen();
    } else {
      this.sidebarClose();
    }
  }

  sidebarOpen() {
    const toggleButton = this.toggleButton;
    const html = document.getElementsByTagName('html')[0];
    const mainPanel = <HTMLElement>document.getElementsByClassName('main-panel')[0];
    setTimeout(function () {
      toggleButton.classList.add('toggled');
    }, 500);

    html.classList.add('nav-open');
    if (window.innerWidth < 991) {
      mainPanel.style.position = 'fixed';
    }
    this.sidebarVisible = true;
  };

  sidebarClose() {
    const html = document.getElementsByTagName('html')[0];
    const mainPanel = <HTMLElement>document.getElementsByClassName('main-panel')[0];

    if (window.innerWidth < 991) {
      setTimeout(function () {
        mainPanel.style.position = '';
      }, 500);
    }
    this.toggleButton.classList.remove('toggled');
    this.sidebarVisible = false;
    html.classList.remove('nav-open');
  };

  collapse() {
    this.isCollapsed = !this.isCollapsed;
    const navbar = document.getElementsByTagName('nav')[0];
    if (!this.isCollapsed) {
      navbar.classList.remove('navbar-transparent');
      navbar.classList.add('bg-white');
    } else {
      navbar.classList.add('navbar-transparent');
      navbar.classList.remove('bg-white');
    }
  }

  updateToggle() {
    if (this.sidebarVisibleForDesktop === true) {
      this.renderer.addClass(document.body, 'sidebar-mini');
      this.sidebarVisibleForDesktop = false;
    } else {
      this.renderer.removeClass(document.body, 'sidebar-mini');
      this.sidebarVisibleForDesktop = true;
    }
  }

  navigateToDashboard() {
    this.navigatorService.navigate('STATICPAGE[NAME:d-dashboard,TITLE:Dashboard]');
  }

  closePageById(id: string) {
    this.navigatorService.closeById(id);
  }

  isTheActiveId(pageId: any) {
    if (pageId.toUpperCase() === this.navigatorService.currentId.toUpperCase()) {
      return true;
    } else {
      return false;
    }
  }

  logout() {
    this.router.navigate(['/login']);
  }

  setLanguage(language: LanguageDTO) {
    this.userDto.currentLanguage = language;
    localStorage.setItem('loggedin_user', JSON.stringify(this.userDto));
    this.userService.updateCurrentLanguage(language.id).subscribe(data => {
      this.languageService.languageSelectionEmmiter.emit(language.code);
    });

  }

  navigate(command: string) {
    if (command === '#logout#') {
      localStorage.removeItem('jwt_token');
      localStorage.removeItem('loggedin_user');
      sessionStorage.removeItem('sidebarMenu');
      this.logout();
      return;
    }
    if (command === '#clear-cache#') {
      localStorage.clear();
      sessionStorage.clear();
      this.logout();
      return;
    }
    this.navigatorService.navigate(command);
  }

  searchKeyDown(event: KeyboardEvent, command: string, searchVaule: string) {
    if ((event.ctrlKey && event.key) === 'Enter' || (event.metaKey && event.key) ) {
      let commandUpdated = command.replace('##search##', btoa(searchVaule));
      commandUpdated = commandUpdated.replace('##SEARCH##', btoa(searchVaule));
      this.navigatorService.navigate(commandUpdated);
    } else if (event.key === 'Enter') {
      this.listSearchService.listSearchEmmiter.emit(searchVaule);
    }
  }

  getCurrentLanguageImage() {
    if (this.userDto.currentLanguage == null) {
      return  this.userDto.defaultLanguage.image
    } else {
      return this.userDto.currentLanguage.image;
    }
  }
}
