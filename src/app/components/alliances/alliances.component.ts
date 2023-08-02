import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-alliances',
  templateUrl: './alliances.component.html',
  styleUrls: ['./alliances.component.scss'],
})
export class AlliancesComponent {
  constructor(private fb: FormBuilder) {}

  onSubmit() {
    // créer alliance
  }

  AllianceForm = this.fb.group({
    allianceName: ['', [Validators.required]],
    allianceTag: ['', [Validators.required]],
  });
}
