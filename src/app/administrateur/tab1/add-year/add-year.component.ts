import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { AdderService } from '../../../service/adder';

@Component({
  selector: 'app-add-year',
  templateUrl: './add-year.component.html',
  styleUrls: ['./add-year.component.scss'],
})
export class AddYearComponent implements OnInit {

  constructor(private modal: ModalController,
              private adder: AdderService) { }

  ngOnInit() {}


  dismiss()
  {
    this.modal.dismiss();
  }
  submit(f)
  {
    f = f.value;    
    this.adder.addYear(f)
    this.modal.dismiss();
  }
}
