import {Component, Input, OnInit} from '@angular/core';
import {AccessControlDTO} from '../../../dtos/access-control/access-control-dto';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-remove-element-modal',
  templateUrl: './remove-element-modal.component.html',
  styleUrls: ['./remove-element-modal.component.css']
})
export class RemoveElementModalComponent implements OnInit {

  @Input() public permission: AccessControlDTO

  constructor(public activeModal: NgbActiveModal) { }

  ngOnInit(): void {
    console.log(this.permission);
  }

  passBack() {
    this.activeModal.close(this.permission);
  }

  dismiss() {
    this.activeModal.close(null);
  }

}
