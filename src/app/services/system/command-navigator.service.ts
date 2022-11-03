import {
  ApplicationRef,
  ComponentFactoryResolver,
  ComponentRef,
  EventEmitter,
  Injectable,
  Injector
} from '@angular/core';
import * as uuid from 'uuid';
import {Router, Routes} from '@angular/router';
import {CommandParserService} from './command-parser.service';
import {TableComponentService} from '../crud/table-component.service';


@Injectable({
  providedIn: 'root'
})
export class CommandNavigatorService {

  public static NavPages: Routes = [];
  public currentId: string;
  public pages: any[] = [];
  public popupPageEmmiter: EventEmitter<ComponentRef<any>> = new EventEmitter();
  public sidebarMenuEmmiter: EventEmitter<string> = new EventEmitter();
  public componentRefOnNavigation: ComponentRef<any>;

  constructor(private componentFactoryResolver: ComponentFactoryResolver,
              private appRef: ApplicationRef,
              private injector: Injector,
              private router: Router,
              private commandParserService: CommandParserService,
              private tableComponentService: TableComponentService
  ) {
  }

  public navigate(command: string) {

    if (this.componentRefOnNavigation != null) {
      command = this.commandParserService.mapToCommand(command, '$PAGEID', this.componentRefOnNavigation.instance.pageId);
    }

    const commandParametersKeyValMap: Map<string, string> = this.commandParserService.parse(command);
    if (commandParametersKeyValMap == null) {
      return;
    }
    const commandType = commandParametersKeyValMap.get('COMMAND-TYPE');

    switch (commandType) {

      case 'DELETE': {
        this.deleteComponentData(commandParametersKeyValMap);
        break;
      }
      case 'POPUPPAGE':
      case 'POPUPFORM':
      case 'POPUPLIST': {
        this.componentRefOnNavigation = this.generateComponent(commandParametersKeyValMap);
        this.componentRefOnNavigation.instance.setPresetCommand(command);
        this.navigatoToPopupComponentRef(this.componentRefOnNavigation);
        break;
      }
      case 'SIDEBARMENU': {
        const locate = this.commandParserService.parsePart(command, 'LOCATE');
        this.sidebarMenuEmmiter.emit(locate.get('ID'));
        break;
      }

      case 'PIVOTLIST':
      case 'LIST':
      case 'FORM':
      case 'STATICPAGE': {
        let name = '';

       if (commandType === 'PIVOTLIST') {
          if (this.router.url.startsWith('/pivotlist?')) {
            name = 'pivotlist-alt';
          } else {
            name = 'pivotlist';
          }
        } else if (commandType === 'LIST') {
          if (this.router.url.startsWith('/list?')) {
            name = 'list-alt';
           } else {
            name = 'list';
          }
        } else if (commandType === 'FORM') {
          if (this.router.url.startsWith('/form?')) {
            name = 'form-alt';
          } else {
            name = 'form';
          }
        } else {
         name = commandParametersKeyValMap.get('NAME');
         if (this.router.url.startsWith('/dashboard?') && name === 'dashboard') {
           name = 'dashboard-alt';
         }
        }

        const base64Command = btoa(command);

        const urlParamsMap: Map<string, string> = new Map();
        urlParamsMap.set('nav', base64Command);
        if (commandParametersKeyValMap.has('SIDEBAR-STATUS')) {
          urlParamsMap.set('sidebar-status', commandParametersKeyValMap.get('SIDEBAR-STATUS'))
        }

        let tab = '';
        if (commandParametersKeyValMap.has('TAB')) {
          tab = commandParametersKeyValMap.get('TAB');
        }

        const urlParams = [...urlParamsMap].reduce((o, [key, value]) => (o[key] = value, o), {});

        if (tab === 'new') {
          const url = this.router.serializeUrl(this.router.createUrlTree(['/' + name], {queryParams: urlParams}));
          window.open(url, '_blank');
        } else {
          this.redirectWithQueryParamsTo(name, urlParams);
        }

        if (commandParametersKeyValMap.has('SIDEBAR-MENU')) {
          this.sidebarMenuEmmiter.emit(commandParametersKeyValMap.get('SIDEBAR-MENU'));
        }

        break;
      }
    }

    return this.componentRefOnNavigation;
  }

  private navigatoToPopupComponentRef(componentRef: ComponentRef<any>) {
    if (componentRef !== null) {
      this.popupPageEmmiter.emit(componentRef);
    }
  }

  public navigateToPreviousPage(pageId) {
    for (const page of this.pages) {
      if (pageId.toUpperCase() === page.instance.pageId.toUpperCase()) {
        if (page.instance.previousPage === null) {
          return;
        }

        if (page.instance.previousPage.instance.onFocusIn != null) {
          page.instance.previousPage.instance.onFocusIn();
        }

        const pageIndex = this.pages.indexOf(page)
        this.pages[pageIndex] = page.instance.previousPage;
        this.componentRefOnNavigation = page.instance.previousPage;
        this.redirectTo('/main/' + page.instance.previousPage.instance.pageId);
        return;
      }
    }
  }

  public navigateToNextPage(pageId) {
    for (const page of this.pages) {
      if (pageId.toUpperCase() === page.instance.pageId.toUpperCase()) {
        if (page.instance.nextPage === null) {
          return;
        }

        if (page.instance.nextPage.instance.onFocusIn != null) {
          page.instance.nextPage.instance.onFocusIn();
        }

        this.pages[this.pages.indexOf(page)] = page.instance.nextPage;
        this.componentRefOnNavigation = page.instance.nextPage;
        this.redirectTo('/main/' + page.instance.nextPage.instance.pageId);
      }
    }
  }

  public navigateById(pageId: string) {
    for (const page of this.pages) {
      if (pageId.toUpperCase() === page.instance.pageId.toUpperCase()) {

        if (page.instance.onFocusIn != null) {
          page.instance.onFocusIn();
        }

        this.redirectTo('/main/' + page.instance.pageId);
      }
    }
  }

  public closeAndBack(pageId) {
    for (const page of this.pages) {
      if (pageId.toUpperCase() === page.instance.pageId.toUpperCase()) {
        if (page.instance.previousPage === null) {
          this.closeById(pageId);
        }

        if (page.instance.previousPage.instance.onFocusIn != null) {
          page.instance.previousPage.instance.onFocusIn();
        }

        const pageIndex = this.pages.indexOf(page)
        this.pages[pageIndex] = page.instance.previousPage;
        this.componentRefOnNavigation = page.instance.previousPage;
        this.redirectTo('/main/' + page.instance.previousPage.instance.pageId);

        return;
      }
    }
  }

  public closeById(id: string) {
    for (const page of this.pages) {
      if (id.toUpperCase() === page.instance.pageId.toUpperCase()) {
        const pageIndex = this.pages.indexOf(page);

        if (page.instance.nextPage !== null && page.instance.nextPage !== undefined) {
          this.destroyNextPageBranch(page.instance.nextPage);
        }

        if (page.instance.previousPage !== null && page.instance.previousPage !== undefined) {
          this.destroyPreviousPageBranch(page.instance.previousPage);
        }

        this.appRef.detachView(page.hostView);
        page.destroy();

        this.pages.splice(pageIndex, 1);
      }
    }

    if (this.pages.length > 0 && id.toUpperCase() === this.currentId.toUpperCase()) {

      if (this.pages[this.pages.length - 1].instance.onFocusIn != null) {
        this.pages[this.pages.length - 1].instance.onFocusIn();
      }

      // this.componentRefOnNavigation = this.pages[this.pages.length - 1].instance;
      this.redirectTo('/main/' + this.pages[this.pages.length - 1].instance.pageId);
    }
  }

  private destroyNextPageBranch(page: ComponentRef<any>) {
    if (page.instance.nextPage !== null && page.instance.nextPage !== undefined) {
      this.destroyNextPageBranch(page.instance.nextPage);
    }
    this.appRef.detachView(page.hostView);
    page.destroy();
  }

  private destroyPreviousPageBranch(page: ComponentRef<any>) {
    if (page.instance.previousPage !== null && page.instance.previousPage !== undefined) {
      this.destroyNextPageBranch(page.instance.previousPage);
    }
    this.appRef.detachView(page.hostView);
    page.destroy();
  }

  public deleteComponentData(parameters: Map<string, string>) {
    if (!parameters.has('COMPONENT-ID') || !parameters.has('SELECTION-ID')) {
      return null;
    }

    this.tableComponentService.deleteComponentData(parameters.get('COMPONENT-ID'), parameters.get('SELECTION-ID')).subscribe();
  }

  public generateComponent(pageParameters: Map<string, string>) {
    if (!pageParameters.has('COMMAND-TYPE')) {
      return null;
    }

    const commandType = pageParameters.get('COMMAND-TYPE');
    let navPageName = '';
    switch (commandType) {
      case 'POPUPLIST': {
        navPageName = 'LIST';
        break;
      }
      case 'LIST': {
        navPageName = 'LIST';
        break;
      }
      case 'FORM': {
        navPageName = 'FORM';
        break;
      }
      case 'POPUPFORM': {
        navPageName = 'FORM';
        break;
      }
      case 'POPUPPAGE':
      case 'STATICPAGE': {
        navPageName = pageParameters.get('NAME');
        break;
      }
    }

    const navPage = CommandNavigatorService.NavPages.filter(route => route.path.toUpperCase() === navPageName.toUpperCase());

    if (navPage.length === 0) {
      return null;
    }
    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(navPage[0].component);
    const componentRef: ComponentRef<any> = componentFactory.create(this.injector);
    componentRef.instance.params = pageParameters;
    componentRef.instance.pageId = uuid.v4();
    return componentRef;
  }

  private redirectTo(uri: string) {
    this.router.navigateByUrl('/', {skipLocationChange: true}).then(() =>
      this.router.navigate([uri]));
  }

  private redirectWithQueryParamsTo(url: string, urlParams: any) {
    this.router.navigate(['/' + url], {queryParams: urlParams});
  }
}
