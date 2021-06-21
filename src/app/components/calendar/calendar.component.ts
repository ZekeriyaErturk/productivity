import { AuthService } from './../../services/auth.service';
import { CalendarService } from './../../services/calendar.service';
import {
  ConfirmationService,
  MessageService,
  ConfirmEventType,
} from 'primeng/api';
import { Component, OnInit } from '@angular/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css'],
})
export class CalendarComponent implements OnInit {
  display = false;
  events: any[];
  options: any;
  user: any;

  constructor(
    public confirmationService: ConfirmationService,
    public messageService: MessageService,
    public calendarService: CalendarService,
    public authService: AuthService
  ) {
    this.authService.GetUser().subscribe((res) => {
      this.user = { id: res?.uid || null, name: res?.displayName || null };
      if (this.user.id !== null) {
        this.calendarService.eventByUid(this.user.id).subscribe((res) => {
          this.events = res;
        });
      } else {
        this.events = [];
      }
    });
  }

  ngOnInit(): void {
    this.options = {
      plugins: [dayGridPlugin, timeGridPlugin, interactionPlugin],
      defaultDate: new Date(),
      header: {
        left: 'prev,next,today',
        center: 'title',
        right: 'dayGridMonth,timeGridWeek,timeGridDay',
      },
      select: this.handleDateSelect.bind(this),
      eventClick: this.handleEventClick.bind(this),
      selectable: true,
    };
  }

  handleDateSelect(selectInfo: any) {
    let title = prompt('Eklenicek Etkinliğin Başlığını Giriniz');
    const calendarApi = selectInfo.view.calendar;

    calendarApi.unselect(); // clear date selection

    if (title) {
      let newEvent;
      const event = {
        title,
        start: selectInfo.startStr,
        end: selectInfo.endStr,
        allDay: selectInfo.allDay,
      };
      newEvent = { ...event };
      newEvent.eventUid = this.user.id;
      newEvent.eventUser = this.user.name;
      this.calendarService.addEvent(newEvent);
    }
  }

  handleEventClick(clickInfo: any) {
    this.confirmationService.confirm({
      message: 'Kayıtlı Etkinliği Silmek İstiyorsunuz',
      header: 'Silme Onayı',
      icon: 'pi pi-info-circle',
      accept: () => {
        this.messageService.add({
          severity: 'success',
          summary: 'Onaylandı',
          detail: 'Kayıt Silindi',
        });
        const eventId = clickInfo.event._def.publicId;
        this.calendarService.deleteEvent(eventId);
        clickInfo.event.remove();
      },
      reject: (type) => {
        switch (type) {
          case ConfirmEventType.REJECT:
            this.messageService.add({
              severity: 'error',
              summary: 'İptal Edildi',
              detail: 'Silme İşlemi İptal Edildi',
            });
            break;
          case ConfirmEventType.CANCEL:
            this.messageService.add({
              severity: 'warn',
              summary: 'İptal Edildi',
              detail: 'Silme İşlemi İptal Edildi',
            });
            break;
        }
      },
    });
  }
}
