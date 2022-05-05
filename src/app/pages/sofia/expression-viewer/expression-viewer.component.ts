import {Component, OnInit} from '@angular/core';
import {ExpressionService} from '../../../services/crud/sofia/expression.service';
import {ExprUnitDTO} from '../../../dtos/sofia/expression/expr-unit-dto';
import {AceConfigInterface} from 'ngx-ace-wrapper';

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

  expressionValue: string = 'if(strEqualsTo(\'test\',\'test\'),numberSubtraction(10,getSqlVal(\'Select id from user where username = #q#admin#q#\')),\'not equals\')';
  resultValue: string;
  exprUnitTree: ExprUnitDTO;

  constructor(private service: ExpressionService) {
  }

  ngOnInit(): void {
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

  hideChildren(exprUnit: any) {
    exprUnit.hideFieldList = true;
  }

  showChildren(exprUnit: any) {
    exprUnit.hideFieldList = false;
  }
}
