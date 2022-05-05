import {Component, OnInit} from '@angular/core';
import * as uuid from 'uuid';

@Component({
  selector: 'app-yes-no-dialog',
  templateUrl: './yes-no-dialog.component.html',
  styleUrls: ['./yes-no-dialog.component.css']
})
export class YesNoDialogComponent implements OnInit {
  public uuid = '';
  public title = '';
  public description = '';
  public callback: any;

  constructor() {
  }

  ngOnInit(): void {
    this.uuid = uuid.v4();
  }

  public openPopup(title: string, description: string, callback: (n: boolean) => any): void {
    this.title = title;
    this.description = description;
    this.callback = callback;
    document.getElementById(this.uuid).click();
  }

  yesClicked() {
    this.callback(true);
  }

  noClicked() {
    this.callback(false);
  }

}
