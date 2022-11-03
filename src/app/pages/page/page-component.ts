import {CommandParserService} from '../../services/system/command-parser.service';
import {EventEmitter, Injectable, Injector} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Title} from '@angular/platform-browser';

@Injectable()
export class PageComponent {

  injector = Injector.create({
    providers: [
      {provide: CommandParserService, deps: []},
      {provide: Title, deps: []},
    ]
  });
  public commandParserService: CommandParserService;
  public windowTitle: Title;
  public params: Map<string, string> = new Map();
  public pageId: string;
  public nextPage = null;
  public previousPage = null;
  public selectEmmiter: EventEmitter<string[]> = new EventEmitter();
  public popupCloseEmmiter: EventEmitter<boolean> = new EventEmitter();

  public presetCommand = null;

  constructor() {
  }

  public initNav(activatedRoute: ActivatedRoute) {
    this.commandParserService = this.injector.get(CommandParserService);
    this.windowTitle = this.injector.get(Title);
    activatedRoute.queryParams.subscribe(params => {
      this.setBase64NavParams(params['nav']);
    });
  }

  onFocusIn() {
  }

  hasReturningValues() {
    if (this.params.has('RETURN')) {
      return true;
    } else {
      return false;
    }
  }

  public setBase64NavParams(base64Command) {
    const command = atob(base64Command);
    this.setNavParams(command);
  }

  public setNavParams(command) {
    if (this.presetCommand !== null) {
      command = this.presetCommand;
    }
    this.params = this.commandParserService.parse(command);
  }

  public setPresetCommand(command) {
    this.presetCommand = command;
  }

  getLocateParams(): Map<string, string> {
    return this.commandParserService.parseMapPart(this.params, 'LOCATE');
  }

  getReturningDisplayValues(): Map<string, string> {

    return this.commandParserService.parseMapPart(this.params, 'RETURN-DISPLAY');
  }

  getParams(paramPart: string) {
    return this.commandParserService.parseMapPart(this.params, paramPart);
  }

  public getWindowCustomTitleFromCommand() {
    if (this.params.has('TITLE')) {
      return this.params.get('TITLE');
    }
    return '';
  }

  public getFocusClass() {
    if (this.params.has('FOCUS')) {
      return this.params.get('FOCUS');
    }
    return '';
  }

  public focusElement() {
    const focusClass = this.getFocusClass();
    if (focusClass === '') {
      return;
    }
    const elements = document.getElementsByClassName(focusClass);
    if (elements.length === 1) {
      const htmlELement = elements[0] as HTMLElement;
      htmlELement.focus();
      return true;
    }
    return false;
  }

  public commandShowCustomTitle() {
    if (this.params.has('SHOWTITLE')) {
      if (this.params.get('SHOWTITLE') === 'NO') {
        return false;
      }
      return true;
    }
    return true;
  }

  public getPopupTitle() {
    if (this.params.has('POPUPTITLE')) {
      return this.params.get('POPUPTITLE');
    }
    return '';
  }

  setTitle(titleValue) {
  }

}
