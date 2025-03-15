import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-turf',
  imports: [CommonModule, FormsModule],
  templateUrl: './turf.component.html',
  styleUrl: './turf.component.scss',
})
export class TurfComponent {
  turfs: any[] = [];
  selectedDate: { [key: number]: Date } = {}; // Store selected date per turf
  showPopup: boolean = false;
  selectedSlots: any[] = [];
  selectedTurf: any = null;
  userName: string = '';
  userMobile: string = '';

  constructor() {
    this.turfs = [
      {
        id: 1,
        name: 'Green Arena',
        location: 'Andheri, Mumbai',
        dates: this.generateDatesWithSlots('08:00', '22:00'),
        openTime: '8:00 AM',
        closeTime: '10:00 PM',
      },
      {
        id: 2,
        name: 'Blue Turf',
        location: 'Bandra, Mumbai',
        dates: this.generateDatesWithSlots('07:00', '23:00'),
        openTime: '7:00 AM',
        closeTime: '11:00 PM',
      },
      {
        id: 3,
        name: 'Elite Sports Complex',
        location: 'Powai, Mumbai',
        dates: this.generateDatesWithSlots('06:00', '22:00'),
        openTime: '6:00 AM',
        closeTime: '10:00 PM',
      },
    ];

    // Set default selected date as the first available date for each turf
    this.turfs.forEach((turf) => {
      this.selectedDate[turf.id] = turf.dates[0].date;
    });
  }

  generateDatesWithSlots(open: string, close: string) {
    let today = new Date();
    let datesArray = [];

    for (let i = 0; i < 5; i++) {
      let date = new Date();
      date.setDate(today.getDate() + i);

      datesArray.push({
        date: date,
        slots: this.slotCalculator(open, close),
      });
    }

    return datesArray;
  }

  slotCalculator(open: string, close: string) {
    let openHour = parseInt(open.split(':')[0]);
    let closeHour = parseInt(close.split(':')[0]);
    let slots: any[] = [];

    for (let hour = openHour; hour < closeHour; hour++) {
      let startTime = this.formatTime(hour);
      let endTime = this.formatTime(hour + 1);

      slots.push({
        time: `${startTime} - ${endTime}`,
        booked: false,
        user: null,
      });
    }

    return slots;
  }

  formatTime(hour: number): string {
    let period = hour >= 12 ? 'PM' : 'AM';
    let formattedHour = hour > 12 ? hour - 12 : hour;
    return `${formattedHour}:00 ${period}`;
  }

  toggleSlotSelection(slot: any) {
    if (slot.booked) {
      return;
    }

    let index = this.selectedSlots.indexOf(slot);
    if (index === -1) {
      this.selectedSlots.push(slot);
    } else {
      this.selectedSlots.splice(index, 1);
    }
  }

  openBookingPopup(turf: any) {
    if (this.selectedSlots.length > 0) {
      this.showPopup = true;
      this.selectedTurf = turf;
    }
  }

  confirmBooking() {
    if (this.selectedSlots.length > 0 && this.userName && this.userMobile) {
      this.selectedSlots.forEach((slot) => {
        slot.booked = true;
        slot.user = { name: this.userName, mobile: this.userMobile };
      });

      this.showPopup = false;
      this.userName = '';
      this.userMobile = '';
      this.selectedSlots = [];
    }
  }

  closePopup() {
    this.showPopup = false;
    this.selectedSlots = [];
  }

  getSelectedSlots(turf: any) {
    let selectedDate = this.selectedDate[turf.id];
    return (
      turf.dates.find((d) => d.date.getTime() === selectedDate.getTime())
        ?.slots || []
    );
  }
}
