import { CalendarOptions } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import { Component, ChangeDetectorRef } from '@angular/core';
import { DateSelectArg, EventClickArg, EventApi } from '@fullcalendar/core';
import interactionPlugin from '@fullcalendar/interaction';
import timeGridPlugin from '@fullcalendar/timegrid';
import listPlugin from '@fullcalendar/list';
import { INITIAL_EVENTS, createEventId } from './event-utils';
import { ReservationService } from '../services/reservation.service';
import { Reservation, Terrain } from '../models/terrain.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReservationDTO } from '../models/reservation';
import { TerrainService } from '../services/terrain.service';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.scss'],
})
export class BookingComponent {
  displayAddEvent: boolean = false;
  calendarVisible = true;
  bookingDescription: string;
  terrainList : Terrain[]=[]
  calendarOptions: CalendarOptions = {
    plugins: [interactionPlugin, dayGridPlugin, timeGridPlugin, listPlugin],
    headerToolbar: {
      left: 'prev,next',
      center: 'today',
      right: 'dayGridMonth,timeGridWeek,timeGridDay,listWeek',
    },

    initialView: 'dayGridMonth',
    initialEvents: INITIAL_EVENTS, // alternatively, use the `events` setting to fetch from a feed
    weekends: true,
    editable: true,
    selectable: true,
    selectMirror: true,
    dayMaxEvents: true,
    select: this.handleDateSelect.bind(this),
    eventClick: this.handleEventClick.bind(this),
    eventsSet: this.handleEvents.bind(this),
    /* you can update a remote database when these fire:
    eventAdd:
    eventChange:
    eventRemove:
    */
  };
  currentEvents: EventApi[] = [];
  dateInformation: DateSelectArg;
  reservations: Reservation[] = [];
  reservationForm: FormGroup;
  thumbnail : any
  constructor(
    private changeDetector: ChangeDetectorRef,
    private reservationService: ReservationService,
    private formBuilder: FormBuilder,
    private terrainService : TerrainService,
    private sanitizer: DomSanitizer
  ) {
    this.terrainService.getAllTerrains().subscribe(res=>{
      res.forEach((baseImage) => {
        let objectURL = 'data:image/jpeg;base64,' + baseImage.image;
        this.thumbnail = this.sanitizer.bypassSecurityTrustUrl(objectURL);
        baseImage.image = this.thumbnail;
      });
      this.terrainList = res
      
    })
    this.loadReservations();
    this.createForm();
  }

  private createForm() {
    this.reservationForm = this.formBuilder.group({
      idReservation: [null],
      idUser: ['', Validators.maxLength(255)],
      startDate: [null, Validators.required],
      endDate: [null, Validators.required],
      idTerrain: [null, Validators.required],
      userId: [null, Validators.required],
      reservationCourseId: [null],
      description: ['']
    });
  }

  private loadReservations() {
    this.reservationService.getAllReservations().subscribe(
      (reservations) => {
        this.reservations = reservations;
      },
      (error) => {
        console.error('Error fetching reservations:', error);
      }
    );
  }

  handleCalendarToggle() {
    this.calendarVisible = !this.calendarVisible;
  }

  handleWeekendsToggle() {
    const { calendarOptions } = this;
    calendarOptions.weekends = !calendarOptions.weekends;
  }
  getRandomColor(): string {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }

  saveEvent() {
    let selectInfo = this.dateInformation;
    let title = this.bookingDescription;
    const calendarApi = selectInfo.view.calendar;
    calendarApi.unselect(); // clear date selection
    if (this.reservationForm.valid) {
      const reservation: ReservationDTO = this.reservationForm.value;
      this.reservationService.createReservation(reservation).subscribe(
        (createdIdReservation) => {
          console.log('Reservation created with ID:', createdIdReservation);
          // Reset the form after successful submission
          if (title) {
            calendarApi.addEvent({
              id: createEventId(),
              title,
              start: selectInfo.startStr,
              end: selectInfo.endStr,
              allDay: selectInfo.allDay,
              color: this.getRandomColor(),
            });
          }
          this.bookingDescription = undefined;
          this.displayAddEvent = false;
          this.reservationForm.reset();
        },
        (error) => {
          console.error('Error creating reservation:', error);
        }
      );
    }
 
  }
  handleDateSelect(selectInfo: DateSelectArg) {
    this.dateInformation = selectInfo;
    this.displayAddEvent = true;
  }

  handleEventClick(clickInfo: EventClickArg) {
    if (
      confirm(
        `Are you sure you want to delete the event '${clickInfo.event.title}'`
      )
    ) {
      clickInfo.event.remove();
    }
  }

  handleEvents(events: EventApi[]) {
    this.currentEvents = events;
    this.changeDetector.detectChanges();
  }

  resetDescription() {
    this.bookingDescription = undefined;
  }
}
