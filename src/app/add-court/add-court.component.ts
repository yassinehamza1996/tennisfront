import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { MessageService } from 'primeng/api';
import { TerrainService } from '../services/terrain.service';

@Component({
  selector: 'app-add-court',
  templateUrl: './add-court.component.html',
  styleUrls: ['./add-court.component.scss']
})
export class AddCourtComponent {
  courtForm: FormGroup;
  imageSrc: any;
  statusList : string[]=[]
  selectedStatus : string;
  imageUrl: any =
    'https://images.sidearmdev.com/crop?url=https%3a%2f%2fdxbhsrqyrr690.cloudfront.net%2fsidearm.nextgen.sites%2fucsdtritons.com%2fimages%2f2020%2f6%2f16%2fNorthview5.jpg&height=563&width=1000&type=jpeg&gravity=smart';
  editFile: boolean = true;
  removeUpload: boolean = false;
  @ViewChild('fileInput') el: ElementRef;
  courtId : number;
  constructor(
    private formBuilder: FormBuilder,
    private courtService: TerrainService,
    private messageService : MessageService,
    private router : Router,
    private activeRoute: ActivatedRoute
  ) {
    this.courtId = this.activeRoute.snapshot.params['id'];
    if (this.courtId) {
      this.courtService.getTerrain(this.courtId).subscribe(court=>{
        console.log(court)
        this.courtForm.get('idTerrain').setValue(court.idTerrain)
        this.courtForm.get('name').setValue(court.name)
        this.courtForm.get('status').setValue(court.status)
        this.courtForm.get('capacity').setValue(court.capacity)
        this.courtForm.get('price').setValue(court.price)
        this.courtForm.get('type').setValue(court.type)
        this.courtForm.get('description').setValue(court.description)
        this.courtForm.get('image').setValue('data:image/jpeg;base64,' + court.image)
        this.imageUrl = this.courtForm.value.image
      })
    }
  }

  ngOnInit(): void {
    this.initForm();
    this.statusList.push('available','unavailable')
  }

  initForm(): void {
    this.courtForm = this.formBuilder.group({
      idTerrain: [null],
      name: ['', Validators.required],
      status: [null, Validators.required],
      capacity: ['', Validators.required],
      price: ['', [Validators.required]],
      description: ['', Validators.required],
      type: ['',Validators.required],
      image: ['',null],
    });
  }

  onSubmit(): void {
    if(this.courtForm.value.image != undefined ){
      if(this.courtForm.value.image.includes(',')){
        let index = this.courtForm.value.image.indexOf(',')
        this.courtForm.value.image = this.courtForm.value.image.substring(index+1,this.courtForm.value.length)
      }
    }
    if (this.courtForm.valid && !this.courtForm.value.idTerrain) {
      this.courtService.createTerrain(this.courtForm.value).subscribe((res) => {
        this.messageService.add({
          severity: 'success',
          summary: 'Successful',
          detail: this.courtForm.value.name + 'Saved Successfully',
          life: 3000,
        });
        setTimeout(()=>{                           
          this.router.navigate(['courts'])
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
    }else{
      this.courtService.updateTerrain(this.courtForm.value.idTerrain,this.courtForm.value).subscribe((res) => {
        this.messageService.add({
          severity: 'success',
          summary: 'Successful',
          detail: this.courtForm.value.name + 'Saved Successfully',
          life: 3000,
        });
        setTimeout(()=>{                           
          this.router.navigate(['courts'])
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
      this.courtForm.value.image = Array.from(imageByteArray);
    };

    reader.readAsArrayBuffer(file);
  }
}
