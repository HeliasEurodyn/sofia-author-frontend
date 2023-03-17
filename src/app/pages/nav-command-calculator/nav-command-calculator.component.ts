import {Component, OnInit} from '@angular/core';
import {AceConfigInterface} from 'ngx-ace-wrapper';
import 'brace';
import 'brace/mode/json';
import 'brace/theme/github';

@Component({
  selector: 'app-expression-viewer',
  templateUrl: './nav-command-calculator.component.html',
  styleUrls: ['./nav-command-calculator.component.css']
})
export class NavCommandCalculatorComponent implements OnInit {

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

  resultValue: string;

  constructor() {
  }

  ngOnInit(): void {
  }

  run() {
    this.resultValue = '';
    console.log(this.expressionValue);
    var parsedJson = JSON.parse(this.expressionValue);
    this.resultValue = JSON.stringify(parsedJson);
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
    } else if (sample = 'selector'){
      this.expressionValue = this.navSampleSelector;
    }
  }
}
