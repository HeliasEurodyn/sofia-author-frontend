import {Component, OnInit, SecurityContext} from '@angular/core';
import {ExpressionService} from '../../services/crud/expression.service';
import {ExprUnitDTO} from '../../dtos/expression/expr-unit-dto';
import {AceConfigInterface} from 'ngx-ace-wrapper';
import 'brace';
import 'brace/mode/javascript';
import 'brace/theme/github';
import {HttpClient} from '@angular/common/http';
import {DomSanitizer} from '@angular/platform-browser';


@Component({
  selector: 'app-expression-viewer',
  templateUrl: './expression-viewer.component.html',
  styleUrls: ['./expression-viewer.component.css']
})
export class ExpressionViewerComponent implements OnInit {

  public aceJavascriptEditorConfig: AceConfigInterface = {
    mode: 'javascript',
    theme: 'github',
    readOnly : false
  };

  expressionValue = 'if(strEqualsTo(\'test\',\'test\'),numberSubtraction(10,getSqlVal(\'Select id from user where username = #q#admin#q#\')),\'not equals\')';
  resultValue: string;
  exprUnitTree: ExprUnitDTO;
  expressions: any[];
  searchTerm = '';
  expressionsToDisplay: any[] = [];
  filteredExpressions: any[] = [];

  constructor(private service: ExpressionService,
              private http: HttpClient,
              private sanitizer: DomSanitizer) {
    this.expressionsToDisplay = [];
  }

  ngOnInit(): void {
    this.http.get<any[]>('/assets/expressionDictionary.js').subscribe((data) => {
      this.expressions = data;
      this.filteredExpressions = data;
      console.log('Expressions loaded:', this.expressions);
    });
  }

  run() {
      this.service.getResult(this.expressionValue).subscribe(resultValue => {
        this.resultValue = resultValue;
        this.service.getExpressionUnits(this.expressionValue).subscribe(exprUnitTree => {
          this.exprUnitTree = exprUnitTree;
        });
      });
  }

  expressionKeyDown(event: KeyboardEvent) {
    if (event.key === 'Enter') {
      this.service.getResult(this.expressionValue).subscribe(resultValue => {
        this.resultValue = resultValue;

        this.service.getExpressionUnits(this.expressionValue).subscribe(exprUnitTree => {
          this.exprUnitTree = exprUnitTree;
        });

      });
    }
  }

  filterExpressions() {
    console.log('Filtering expressions...');
    if (this.searchTerm.trim() === '') {
      // If the search term is empty, show all expressions
      this.filteredExpressions = this.expressions;
    } else {
      // Filter expressions by name or description
      const lowerSearchTerm = this.searchTerm.toLowerCase();
      this.filteredExpressions = this.expressions.filter((expression) => {
        return (
          expression.name.toLowerCase().includes(lowerSearchTerm) ||
          this.sanitizer.sanitize(SecurityContext.HTML, expression.description)
            .toLowerCase()
            .includes(lowerSearchTerm)
        );
      });
    }
  }

  performSearch() {
    this.filterExpressions();
  }

  hideChildren(exprUnit: any) {
    exprUnit.hideFieldList = true;
  }

  showChildren(exprUnit: any) {
    exprUnit.hideFieldList = false;
  }

  addExpression(test: string) {

  }

  trustResource(resource) {
    return this.sanitizer.bypassSecurityTrustHtml(resource);
  }
}
