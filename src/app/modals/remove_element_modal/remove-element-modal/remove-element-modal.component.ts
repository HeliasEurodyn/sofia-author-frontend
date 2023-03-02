import {Component, Input, OnInit} from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-remove-element-modal',
  templateUrl: './remove-element-modal.component.html',
  styleUrls: ['./remove-element-modal.component.css']
})
export class RemoveElementModalComponent implements OnInit {

  @Input() public element: any

  constructor(public activeModal: NgbActiveModal) { }

  ngOnInit(): void {
    console.log(this.element);
  }

  passBack() {
    this.activeModal.close(this.element);
  }

  dismiss() {
    this.activeModal.close(null);
  }

}
