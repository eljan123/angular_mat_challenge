import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatRadioModule } from '@angular/material/radio';  
import { MatCheckboxModule } from '@angular/material/checkbox'; 

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    CommonModule, 
    ReactiveFormsModule, 
    MatButtonModule, 
    MatFormFieldModule, 
    MatInputModule, 
    MatSlideToggleModule,
    MatRadioModule, 
    MatCheckboxModule 
  ],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  userName: string = '';
  email: string = '';
  message: string = '';
  submitted = false;
  isDarkMode = false;

  formData: FormGroup = new FormGroup({
    userName: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email]),
    isAdultAttending: new FormControl(false),
    numAdults: new FormControl({ value: '', disabled: true }, Validators.required),
    isChildAttending: new FormControl(false),
    numChildren: new FormControl({ value: '', disabled: true }, Validators.required),
    message: new FormControl('')
  });

  constructor() {
    this.formData.controls['isAdultAttending'].valueChanges.subscribe(value => {
      if (value) {
        this.formData.controls['numAdults'].enable();
      } else {
        this.formData.controls['numAdults'].disable();
      }
    });

    this.formData.controls['isChildAttending'].valueChanges.subscribe(value => {
      if (value) {
        this.formData.controls['numChildren'].enable();
      } else {
        this.formData.controls['numChildren'].disable();
      }
    });
  }

  onClickSubmit(data: { userName: string; email: string; numAdults: number; numChildren: number; message: string }) {
    this.submitted = true;
    this.userName = data.userName;
    this.email = data.email;
    this.message = data.message;

    if (this.formData.valid) {
      console.log('Form submitted successfully!', this.formData.value);
    } else {
      console.log('Form is not valid!');
    }
  }

  toggleTheme() {
    this.isDarkMode = !this.isDarkMode;
    if (this.isDarkMode) {
      document.body.classList.add('dark-theme');
    } else {
      document.body.classList.remove('dark-theme');
    }
  }
}