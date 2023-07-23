import { Component } from '@angular/core';
import { CoachService } from '../services/coach.service';
import { Coach } from '../models/coach.model';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ExcelService } from '../services/excel-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-manage-coaches',
  templateUrl: './manage-coaches.component.html',
  styleUrls: ['./manage-coaches.component.scss'],
})
export class ManageCoachesComponent {
  coachList: Coach[] = [];
  selectedCoach: Coach[] = [];
  coach: Coach;

  submitted: boolean;
  reload : boolean = false;
  constructor(
    private coachService: CoachService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private excelService: ExcelService,
    private router : Router
  ) {
    this.coachService.getCoaches().subscribe((coaches) => {
      this.coachList = coaches;
    });
    // if(this.reload){
    //   window.location.reload();
    // }
  }
  deleteSelectedCoaches() {
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete the selected coach?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        let coachList = this.selectedCoach.map(res=>res.idCoach)
        this.coachService.deleteAll(coachList).subscribe(res=>{
          this.coachList = this.coachList.filter(
            (val) => !this.selectedCoach.includes(val)
          );
          this.selectedCoach = null;
          this.messageService.add({
            severity: 'success',
            summary: 'Successful',
            detail: 'Coachs Deleted',
            life: 3000,
          });
        })
        
      },
    });
  }

  editCoach(coach) {
    console.log(coach)
    this.router.navigate(['editcoach/'+coach.idCoach])
  }

  deleteCoach(coach: Coach) {
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete ' + coach.coachName + '?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.coachService.deleteCoach(coach.idCoach).subscribe((res) => {
          this.coachList = this.coachList.filter(
            (val) => val.idCoach !== coach.idCoach
          );
          this.coach = {} as Coach;
          this.messageService.add({
            severity: 'success',
            summary: 'Successful',
            detail: 'Coach Deleted',
            life: 3000,
          });
        });
      },
    });
  }

  saveCoach(){

  }

  exportDataToExcel(): void {
    const clonedList = JSON.parse(JSON.stringify(this.coachList));
    clonedList.forEach(res=>{
      delete res.image 
      delete res.idCoach 
    })
    console.log(clonedList)
    this.excelService.exportToExcel(clonedList, 'coachlist');
  }
}
