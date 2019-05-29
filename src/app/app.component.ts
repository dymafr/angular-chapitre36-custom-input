import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  public form: FormGroup;

  constructor(public fb: FormBuilder) {}

  ngOnInit() {
    this.form = this.fb.group({
      name: [''],
      code: [''],
      address: [{
        address: '78 Rue du Moulin Vert, Paris 14e Arrondissement, Île-de-France, France',
        lat: 48.8304,
        lng: 2.32209
      }]
    });


  }


}
