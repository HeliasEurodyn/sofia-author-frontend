import {Component, OnInit} from '@angular/core';
import {AceConfigInterface} from 'ngx-ace-wrapper';
import 'brace';
import 'brace/mode/json';
import 'brace/theme/github';
import {PageComponent} from "../page/page-component";
import {ActivatedRoute} from "@angular/router";
import {Title} from "@angular/platform-browser";

@Component({
  selector: 'app-nav-command-calculator-page',
  templateUrl: './nav-command-calculator.component.html',
  styleUrls: ['./nav-command-calculator.component.css']
})
export class NavCommandCalculatorPageComponent extends PageComponent implements OnInit {

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

}
