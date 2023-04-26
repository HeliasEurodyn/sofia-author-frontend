import {Component, OnInit} from '@angular/core';
import {AceConfigInterface} from 'ngx-ace-wrapper';
import 'brace';
import 'brace/mode/json';
import 'brace/theme/github';
import {PageComponent} from "../page/page-component";
import {ActivatedRoute} from "@angular/router";
import {Title} from "@angular/platform-browser";

@Component({
  selector: 'app-expression-viewer',
  templateUrl: './nav-command-calculator.component.html',
  styleUrls: ['./nav-command-calculator.component.css']
})
export class NavCommandCalculatorComponent extends PageComponent implements OnInit {

  public aceJavascriptEditorConfig: AceConfigInterface = {
    mode: 'json',
    theme: 'github',
    readOnly : false
  };

  expressionValue: string = '' ;

  navSampleMenu: string =
    '{\n' +
    '    "COMMAND-TYPE": "STATICPAGE",\n' +
    '    "NAME": "nav-command-calculator",\n' +
    '    "TITLE": "Welcome to sofia\'s command calculator"\n' +
    '}'

  navSampleSelector: string =
    '{\n' +
    '    "COMMAND-TYPE": "POPUPLIST",\n' +
    '    "LOCATE": "(ID=fdb77c82-efdd-4673-8563-872657d97f12)",\n' +
    '    "RETURN": "cf_id",\n' +
    '    "FOCUS": "header-filter-cf_name",\n' +
    '    "DISPLAY": "(organization.name)",\n' +
    '    "REFRESH": "organization",\n' +
    '    "HIDE-DELETE": "YES"\n' +
    '}';

  navSamplePlugin: string =
  '{\n' +
    '  "COMMAND-TYPE": "STATICPAGE",\n' +
    '  "NAME": "ui-plugin",\n' +
    '  "CONTEXT": "demo",\n' +
    '  "HTML": ["mypage.html"],\n' +
    '  "JS": ["mypage.js","mypage2.js"]\n' +
    '}';

  navSampleForm: string =
    '{\n' +
    '    "COMMAND-TYPE": "FORM",\n' +
    '    "LOCATE": {\n' +
    '        "ID":"form_uuid", \n' +
    '        "SELECTION-ID":"#cf_id"\n' +
    '    }\n' +
    '}';

  navSampleList: string =
    '{\n' +
    '    "COMMAND-TYPE": "LIST",\n' +
    '    "LOCATE": {\n' +
    '        "ID":"list_uuid", \n' +
    '        "SELECTION-ID":"#cf_id"\n' +
    '    }\n' +
    '}';

  navSamplePopupsearch: string =
    '{\n' +
    '    "COMMAND-TYPE": "POPUPPAGE",\n' +
    '    "NAME": "search",\n' +
    '    "POPUPTITLE": "Search For #Entities of the Application by code",\n' +
    '    "LOCATE": {\n' +
    '        "ID": "search_uuid"\n' +
    '    },\n' +
    '    "VALUE": "##search##"\n' +
    '}';

  constructor(private activatedRoute: ActivatedRoute,
              private title: Title) {
    super();
  }

  ngOnInit(): void {
    this.initNav(this.activatedRoute);

    if (this.params.has('TITLE')) {
      this.title.setTitle(this.params.get('TITLE'));
    }
  }

  stringify() {
    var parsedJson = JSON.parse(this.expressionValue);
    this.expressionValue = JSON.stringify(parsedJson);
  }

  beautify() {
    var parsedJson = JSON.parse(this.expressionValue);
    this.expressionValue = JSON.stringify(parsedJson, null, 4);
  }

  hideChildren(exprUnit: any) {
    exprUnit.hideFieldList = true;
  }

  showChildren(exprUnit: any) {
    exprUnit.hideFieldList = false;
  }

  addSampleCommand(sample: string) {
    if(sample == 'menu'){
      this.expressionValue = this.navSampleMenu;
    } else if (sample == 'selector'){
      this.expressionValue = this.navSampleSelector;
    } else if(sample == 'plugin'){
      this.expressionValue = this.navSamplePlugin;
    } else if(sample == 'form'){
      this.expressionValue = this.navSampleForm;
    }else if(sample == 'list'){
      this.expressionValue = this.navSampleList;
    }else if(sample == 'popup_search'){
      this.expressionValue = this.navSamplePopupsearch;
    }
  }

}
