import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService, ConfirmationService } from 'primeng/api';
import { ExcelService } from '../services/excel-service.service';
import { Terrain } from '../models/terrain.model';
import { TerrainService } from '../services/terrain.service';

@Component({
  selector: 'app-manage-courts',
  templateUrl: './manage-courts.component.html',
  styleUrls: ['./manage-courts.component.scss']
})
export class ManageCourtsComponent {
  courtsList: Terrain[] = [];
  selectedCourt: Terrain[] = [];
  court: Terrain;

  submitted: boolean;
  reload : boolean = false;
  constructor(
    private courtService: TerrainService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private excelService: ExcelService,
    private router : Router
  ) {
    this.courtService.getAllTerrains().subscribe((coaches) => {
      this.courtsList = coaches;
    });
    // if(this.reload){
    //   window.location.reload();
    // }
  }
  deleteselectedCourtes() {
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete the selected court?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        let courtsList = this.selectedCourt.map(res=>res.idTerrain)
        this.courtService.deleteAllTerrain(courtsList).subscribe(res=>{
          this.courtsList = this.courtsList.filter(
            (val) => !this.selectedCourt.includes(val)
          );
          this.selectedCourt = null;
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

  editCourt(court : Terrain) {
    console.log(court)
    this.router.navigate(['editcourt/'+court.idTerrain])
  }

  deleteCourt(court: Terrain) {
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete ' + court.name + '?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.courtService.deleteTerrain(court.idTerrain).subscribe((res) => {
          this.courtsList = this.courtsList.filter(
            (val) => val.idTerrain !== court.idTerrain
          );
          this.court = {} as Terrain;
          this.messageService.add({
            severity: 'success',
            summary: 'Successful',
            detail: 'court Deleted',
            life: 3000,
          });
        });
      },
    });
  }

  saveCoach(){

  }

  exportDataToExcel(): void {
    const clonedList = JSON.parse(JSON.stringify(this.courtsList));
    clonedList.forEach(res=>{
      delete res.image 
      delete res.idCoach 
    })
    console.log(clonedList)
    this.excelService.exportToExcel(clonedList, 'courtsList');
  }

  getCourtStatusClass(status : string) : string{
    if(status == 'available'){
      return 'available-cls';
    }
      return 'unavailable-cls'
    
  }
}
