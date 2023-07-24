import { Component } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import {
  CountryISO,
  PhoneNumberFormat,
  SearchCountryField,
} from 'ngx-intl-tel-input';
import { AuthService } from '../services/auth.service';
import { UserDTO } from '../models/user.model';
import { MessageService } from 'primeng/api';
import { Router } from '@angular/router';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent {
  registerForm: FormGroup;
  isChecked: boolean = false;
  separateDialCode = false;
  SearchCountryField = SearchCountryField;
  CountryISO = CountryISO;
  PhoneNumberFormat = PhoneNumberFormat;
  preferredCountries: CountryISO[] = [
    CountryISO.Tunisia,
    CountryISO.UnitedStates,
    CountryISO.UnitedKingdom,
  ];
  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private messageService: MessageService,
    private router: Router
  ) {
    this.registerForm = this.fb.group({
      username: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
      firstName: new FormControl('', Validators.required),
      lastName: new FormControl('', Validators.required),
      age: new FormControl('', Validators.required),
      cin: new FormControl('', Validators.required),
      phoneNumber: new FormControl('', Validators.required),
      mailAddress: ['', [Validators.required, Validators.email]],
    });
  }
  onSubmit() {
    console.log(this.registerForm.value);
    this.registerForm.value.phoneNumber =
      this.registerForm.value.phoneNumber.nationalNumber;
    console.log(this.registerForm.value);
    const userDto = {} as UserDTO;
    userDto.username = this.registerForm.value.username;
    userDto.password = this.registerForm.value.password;
    userDto.lastName = this.registerForm.value.lastName;
    userDto.firstName = this.registerForm.value.firstName;
    userDto.age = this.registerForm.value.age;
    userDto.cin = this.registerForm.value.cin;
    userDto.phoneNumber = this.registerForm.value.phoneNumber;
    userDto.mailAddress = this.registerForm.value.mailAddress;

    this.authService.registerUser(userDto).subscribe({
      next: () => {
        this.messageService.add({
          severity: 'success',
          summary: 'Successful',
          detail: userDto.username + ' Saved Successfully',
          life: 3000,
        });
        setTimeout(() => {
          this.router.navigate(['']);
        }, 1000);
      },
      error: (error) => {
        console.log(error);
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: error.message,
          life: 3000,
        });
      },
      complete: () => {
        setTimeout(() => {
          this.router.navigate(['']);
        }, 1000);
      },
    });
  }
  acceptTerms() {
    this.isChecked = !this.isChecked;
  }
}
