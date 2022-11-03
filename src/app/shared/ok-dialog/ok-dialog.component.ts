import {Component, OnInit} from '@angular/core';
import * as uuid from 'uuid';

@Component({
  selector: 'app-ok-dialog',
  templateUrl: './ok-dialog.component.html',
  styleUrls: ['./ok-dialog.component.css']
})
export class OkDialogComponent implements OnInit {
  public uuid = '';
  public title = '';
  public description = '';

  constructor() { }

  ngOnInit(): void {
    this.uuid = uuid.v4();
  }

  public openPopup(title: string, description: string): void {
    this.title = title;
    this.description = description;
    document.getElementById(this.uuid).click();
  }
}
