import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { MessageService } from 'primeng/api';
import { UserService } from '../services/user.service';
import {
  CountryISO,
  PhoneNumberFormat,
  SearchCountryField,
} from 'ngx-intl-tel-input';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent {
  userForm: FormGroup;
  imageSrc: any;
  imageUrl: any =
    'https://thumbs.dreamstime.com/z/abstract-sports-coach-stands-his-back-t-shirt-baseball-cap-background-coaching-theme-splash-191918960.jpg?w=576';
   editFile: boolean = true;
  removeUpload: boolean = false;
  separateDialCode = false;
  SearchCountryField = SearchCountryField;
  CountryISO = CountryISO;
  PhoneNumberFormat = PhoneNumberFormat;
  preferredCountries: CountryISO[] = [
    CountryISO.Tunisia,
    CountryISO.UnitedStates,
    CountryISO.UnitedKingdom,
  ];
  @ViewChild('fileInput') el: ElementRef;

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private messageService: MessageService,
    private router: Router,
    private activeRoute: ActivatedRoute
  ) {
    let userId = this.activeRoute.snapshot.params['id'];
    if (userId) {
      this.userService.getUserByUsername(userId).subscribe(user=>{
        console.log(user)
        this.userForm.get('idUser').setValue(user.idUser)
        this.userForm.get('username').setValue(user.username)
        this.userForm.get('firstName').setValue(user.firstName)
        this.userForm.get('lastName').setValue(user.lastName)
        this.userForm.get('phoneNumber').setValue(user.phoneNumber)
        this.userForm.get('mailAddress').setValue(user.mailAddress)
        this.userForm.get('cin').setValue(user.cin)
        this.userForm.get('age').setValue(user.age)
        if(user.image){
          this.userForm.get('image').setValue('data:image/jpeg;base64,' + user.image)
          this.imageUrl = this.userForm.value.image
        }

      })
    }
  }

  ngOnInit(): void {
    this.initForm();
    this.userForm.controls['username'].disable()
  }

  initForm(): void {
    this.userForm = this.formBuilder.group({
      idUser: [null],
      username: ['', Validators.required],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      mailAddress: ['', [Validators.required, Validators.email]],
      phoneNumber: ['', Validators.required],
      cin: ['', Validators.required],
      age: ['', Validators.required],
      image: [null],
    });
  }

  onSubmit(): void {

    this.userForm.value.phoneNumber =
    this.userForm.value.phoneNumber.nationalNumber;
    console.log(this.userForm.value)

    if(this.userForm.value.image != undefined ){
      if(this.userForm.value.image.includes(',')){
        let index = this.userForm.value.image.indexOf(',')
        this.userForm.value.image = this.userForm.value.image.substring(index+1,this.userForm.value.length)
      }
    }
    if (this.userForm.valid && this.userForm.value.idUser) {
      this.userService
        .updateUser(this.userForm.value.idUser, this.userForm.value)
        .subscribe({
          next: (res) => {
            console.log(res)
            this.messageService.add({
              severity: 'success',
              summary: 'Successful',
              detail: 'Profile updated Successfully',
              life: 3000,
            });
            setTimeout(() => {
              this.router.navigate(['home']);
            }, 1000);
          },
          error: (error) => {
            this.messageService.add({
              severity: 'error',
              summary: 'Error',
              detail: error.message,
              life: 3000,
            });
          },
          complete: () => {},
        });
    }
  }

  onUploadImage(event, files) {
    this.imageUrl =
      event.currentFiles[0].objectURL.changingThisBreaksApplicationSecurity;
    const file: File = files[0];
    const reader = new FileReader();

    reader.onload = (e) => {
      const imageData: ArrayBuffer = e.target.result as ArrayBuffer;
      const imageByteArray = new Uint8Array(imageData);
      this.userForm.value.image = Array.from(imageByteArray);
    };

    reader.readAsArrayBuffer(file);
  }
}
