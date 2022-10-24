export class FilterField {

  public displayValue = '';
  public isChecked = true;
  public isVisibleOnList = true;

  public constructor(_displayValue) {
    this.displayValue = _displayValue;
    this.isChecked = true;
    this.isVisibleOnList = true;
  }
}
