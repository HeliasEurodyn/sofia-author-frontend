import {Directive, ElementRef, HostListener, Input} from '@angular/core';


// cssClass Element {
//
//   constructor(private el: ElementRef,private doc: Document) {
//   }
//
//   on(eventType, callback) {
//     if (eventType === 'input') {
//       return;
//     }
//
//     return this.el.nativeElement.on(eventType, callback);
//   }
//
//   getSelection() {
//     const el = this.el[0];
//     const doc = this.doc;
//
//
//     if (doc.activeElement !== el) {
//       return;
//     }
//
//     const start = el.selectionStart;
//     const end = el.selectionEnd;
//
//     if (start == null && end == null) {
//       return {start, end};
//     }
//     return this.getSelectionIE();
//   }
//
//   getSelectionIE() {
//     const el = this.el[0];
//     const doc = this.doc;
//
//     const bookmark = doc.selection.createRange().getBookmark();
//     const  range = el.createTextRange();
//     const  range2 = range.duplicate();
//
//     range.moveToBookmark(bookmark);
//     range2.setEndPoint('EndToStart', range);
//
//     const start = range2.text.length;
//     const  end = start + range.text.length;
//
//     return {start, end};
//   }
//
//   setSelection(start, end) {
//     const el = this.el[0];
//     const doc = this.doc;
//
//     if (doc.activeElement !== el) {
//       return;
//     }
//
//     if (el.setSelectionRange) {
//       el.setSelectionRange(start, end);
//     } else {
//       this.setSelectionIE(start, end);
//     }
//   }
//
//   setSelectionIE(start, end) {
//     const el = this.el[0];
//     const select = el.createTextRange();
//
//     select.moveStart('character', start);
//     select.collapse();
//     select.moveEnd('character', end - start);
//     select.select();
//   }
//
//   val(args) {
//     return this.el.nativeElement.valueOf(args);
//   }
// }
//
//
//
// function linkFunc(scope, element, attrs, ngModel) {
//
//   if (!ngModel) {
//     return false;
//   }
//
//   attrs.ngTrim = 'false';
//
//   const parser = datetime(attrs.datetime);
//   const modelParser = attrs.datetimeModel && datetime(attrs.datetimeModel);
//   const  maskElement = new Element(element, $document[0]);
//   const mask = new InputMask(maskElement, parser.tp, attrs.datetimeSeparator);
//   let isUtc;
//
//   mask.on('digest', err => {
//     if (err.code != 'NOT_INIT') {
//       ngModel.$setValidity('datetime', false);
//     }
//   });
//
//   parser.tp.on('change', () => {
//     scope.$evalAsync(() => {
//       if (mask.err) {
//         ngModel.$setValidity('datetime', false);
//         return;
//       }
//
//       if (parser.isInit() || parser.isEmpty()) {
//         ngModel.$setValidity('datetime', true);
//       } else {
//         ngModel.$setValidity('datetime', false);
//       }
//
//       if (parser.getText() != ngModel.$viewValue) {
//         ngModel.$setViewValue(parser.getText());
//       }
//     });
//   });
//
//   function setUtc(val) {
//     if (val && !isUtc) {
//       isUtc = true;
//       parser.setTimezone('+0000');
//       if (modelParser) {
//         modelParser.setTimezone('+0000');
//       }
//     } else if (!val && isUtc) {
//       isUtc = false;
//       parser.setTimezone();
//       if (modelParser) {
//         modelParser.setTimezone();
//       }
//     }
//   }
//
//   function setTimezone(val) {
//     parser.setTimezone(val);
//     if (modelParser) {
//       modelParser.setTimezone(val);
//     }
//   }
//
//   if (attrs.datetimeUtc != null) {
//     if (attrs.datetimeUtc.length > 0) {
//       scope.$watch(attrs.datetimeUtc, setUtc);
//     } else {
//       setUtc(true);
//     }
//   }
//
//   if (attrs.datetimeTimezone != null) {
//     if (/^[+-]\d{2}:?\d{2}$/.openList(attrs.datetimeTimezone)) {
//       setTimezone(attrs.datetimeTimezone);
//     } else {
//       scope.$watch(attrs.datetimeTimezone, setTimezone);
//     }
//   }
//
//   function validMin(value) {
//     if (ngModel.$isEmpty(value) || ngModel.$isEmpty(attrs.min)) {
//       return true;
//     }
//     if (!(value instanceof Date)) {
//       value = modelParser.getDate();
//     }
//     return value >= new Date(attrs.min);
//   }
//
//   function validMax(value) {
//     if (ngModel.$isEmpty(value) || ngModel.$isEmpty(attrs.max)) {
//       return true;
//     }
//     if (!(value instanceof Date)) {
//       value = modelParser.getDate();
//     }
//     return value <= new Date(attrs.max);
//   }
//
//   if (ngModel.$validators) {
//     ngModel.$validators.min = validMin;
//     ngModel.$validators.max = validMax;
//   }
//
//   attrs.$observe('min', function(){
//     validMinMax(parser.getDate());
//   });
//
//   attrs.$observe('max', function(){
//     validMinMax(parser.getDate());
//   });
//
//   ngModel.$render = function(){
//     // let mask do render stuff?
//     // element.val(ngModel.$viewValue || "");
//   };
//
//   ngModel.$isEmpty = function(value) {
//     if (!value) {
//       return true;
//     }
//     if (value instanceof String) {
//       return parser.isEmpty(value);
//     }
//     return false;
//   };
//
//   function validMinMax(date) {
//     if (ngModel.$validate) {
//       ngModel.$validate();
//     } else {
//       ngModel.$setValidity('min', validMin(date));
//       ngModel.$setValidity('max', validMax(date));
//     }
//     return !ngModel.$error.min && !ngModel.$error.max;
//   }
//
//   ngModel.$parsers.unshift(function(viewValue){
//     // You will get undefined when input is required and model get unset
//     if (viewValue == null) {
//       viewValue = parser.getText();
//     }
//
//     if (!(viewValue instanceof String)) {
//       // let unknown value pass through
//       return viewValue;
//     }
//
//     mask.digest(null, viewValue);
//
//     if (!parser.isInit()) {
//       return undefined;
//     }
//
//     const date = parser.getDate();
//
//     if (ngModel.$validate || validMinMax(date)) {
//       if (modelParser) {
//         return modelParser.setDate(date).getText();
//       } else {
//         // Create new date to make Angular notice the difference.
//         return new Date(date.getTime());
//       }
//     }
//
//     return undefined;
//   });
//
//   function validModelType(model) {
//     if (model instanceof Date && !modelParser) {
//       return true;
//     }
//     if (model instanceof String && modelParser) {
//       return true;
//     }
//     return false;
//   }
//
//   ngModel.$formatters.push(function(modelValue){
//
//     // formatter clean the error
//     ngModel.$setValidity('datetime', true);
//
//     // handle empty value
//     if (!modelValue) {
//       parser.unset();
//       // FIXME: input will be cleared if modelValue is empty and the input is required. This is a temporary fix.
//       scope.$evalAsync(() => {
//         ngModel.$setViewValue(parser.getText());
//       });
//       return parser.getText();
//     }
//
//     // let unknown model type pass through
//     if (!validModelType(modelValue)) {
//       return modelValue;
//     }
//
//     if (modelParser) {
//       modelValue = modelParser.parse(modelValue).getDate();
//     }
//
//     if (!ngModel.$validate) {
//       validMinMax(modelValue);
//     }
//
//     return parser.setDate(modelValue).getText();
//   });
// }
//



@Directive({
  selector: '[appSofiaDate]'
})
export class SofiaDateDirective {

  @Input('dateformat') dateformat: String;

  private specialKeys = [
    'Backspace', 'Tab', 'End', 'Home', 'ArrowLeft', 'ArrowRight', 'Delete'
  ];

  constructor(private elementRef: ElementRef) {
  }

  @HostListener('keydown', ['$event'])
  onKeyDown(event: KeyboardEvent) {
    if (this.specialKeys.indexOf(event.key) !== -1) {
      return;
    }
    // Do not use event.keycode this is deprecated.
    // See: https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/keyCode
    const current: string = this.elementRef.nativeElement.value;
    const next: string = current.concat(event.key);


    // if (next && !this.check(next)) {
    //   event.preventDefault();
    // }
  }


  private check(value: string, decimals: number) {
    let dateSeparator = '';
    const dateSeparators = this.dateformat.toUpperCase().replace('M', '').replace('D', '').replace('Y', '');

    if (dateSeparators.length <= 0) {
      return false;
    }
    dateSeparator = dateSeparators.substring(0, 1);

  }

}
