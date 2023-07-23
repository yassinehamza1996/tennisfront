import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Coach } from '../models/coach.model';
import { CoachService } from '../services/coach.service';
import { MessageService } from 'primeng/api';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-coach',
  templateUrl: './add-coach.component.html',
  styleUrls: ['./add-coach.component.scss'],
})
export class AddCoachComponent implements OnInit {
  coachForm: FormGroup;
  imageSrc: any;
  imageUrl: any =
    'https://thumbs.dreamstime.com/z/abstract-sports-coach-stands-his-back-t-shirt-baseball-cap-background-coaching-theme-splash-191918960.jpg?w=576';
  editFile: boolean = true;
  removeUpload: boolean = false;
  @ViewChild('fileInput') el: ElementRef;

  constructor(
    private formBuilder: FormBuilder,
    private coachService: CoachService,
    private messageService : MessageService,
    private router : Router
  ) {}

  ngOnInit(): void {
    this.initForm();
  }

  initForm(): void {
    this.coachForm = this.formBuilder.group({
      idCoach: [null],
      coachName: ['', Validators.required],
      age: [null, [Validators.required, Validators.min(18)]],
      cin: ['', Validators.required],
      mailAddress: ['', [Validators.required, Validators.email]],
      phoneNumber: ['', Validators.required],
      image: [null],
    });
  }

  onSubmit(): void {
    if (this.coachForm.valid) {
      this.coachService.createCoach(this.coachForm.value).subscribe((res) => {
        this.messageService.add({
          severity: 'success',
          summary: 'Successful',
          detail: this.coachForm.value.coachName + 'Saved Successfully',
          life: 3000,
        });
        setTimeout(()=>{                           
          this.router.navigate(['managecoaches'])
     }, 1000);
      },
      (error)=>{
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: error,
          life: 3000,
        });
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
      this.coachForm.value.image = Array.from(imageByteArray);
    };

    reader.readAsArrayBuffer(file);
  }
}
