import {
  AfterViewInit,
  ApplicationRef,
  Component,
  ComponentFactoryResolver,
  ComponentRef,
  ElementRef,
  EmbeddedViewRef,
  Injector,
  OnInit,
  Renderer2,
  ViewChild
} from '@angular/core';
import {CommandNavigatorService} from '../../../services/system/sofia/command-navigator.service';
import {InternalMessageService} from '../../../shared/utils/internal-message-service';
import {ActivatedRoute, NavigationEnd, Router} from '@angular/router';

@Component({
  selector: 'app-navigator',
  templateUrl: './navigator.component.html',
  styleUrls: ['./navigator.component.css']
})
export class NavigatorComponent implements OnInit, AfterViewInit {

  @ViewChild('pageDiv') pageDiv: ElementRef;

  constructor(private componentFactoryResolver: ComponentFactoryResolver,
              private appRef: ApplicationRef,
              private injector: Injector,
              private renderer: Renderer2,
              private internalMessageService: InternalMessageService,
              private activatedRoute: ActivatedRoute,
              private router: Router,
              private commandNavigatorService: CommandNavigatorService) {
    // this.commandNavigatorService.popupPageEmmiter.subscribe((componentRef) => {
    //   document.getElementById('popupSelector').click();
    //    }
    // );

  }

  ngOnInit(): void {

//    document.getElementById('popupSelector').click();
  }


  ngAfterViewInit(): void {
    this.refreshDirectionComponent();
    this.subscripeRootChange();
  }

  refreshDirectionComponent() {
    let pageId = '';
    if (this.activatedRoute.snapshot.paramMap.has('id')) {
      pageId = this.activatedRoute.snapshot.paramMap.get('id');
    }

    let pageRendered = false;
    for (const page of this.commandNavigatorService.pages) {
      if (pageId.toUpperCase() === page.instance.pageId.toUpperCase()) {
        this.commandNavigatorService.currentId = pageId;
        this.renderPage(page);
        pageRendered = true;
      }
    }

    if (!pageRendered && this.commandNavigatorService.pages.length > 0) {
      this.renderPage(this.commandNavigatorService.pages[0]);
    }
  }

  subscripeRootChange() {
    this.router.events.subscribe((event) => {
        if (event instanceof NavigationEnd) {
          this.refreshDirectionComponent();
        }
      }
    );
  }

  public renderPage(page: ComponentRef<any>) {
    this.appRef.attachView(page.hostView);
    const domElem = (page.hostView as EmbeddedViewRef<any>).rootNodes[0] as HTMLElement;
    const childElements = this.pageDiv.nativeElement.childNodes;
    for (const childElement of childElements) {
      this.renderer.removeChild(this.pageDiv.nativeElement, childElement);
    }
    this.renderer.appendChild(this.pageDiv.nativeElement, domElem);
  }

  logout() {
    localStorage.removeItem('jwt_token');
    localStorage.removeItem('loggedin_user');
    this.router.navigateByUrl(`/login`);
  }

}
