import { Component } from '@angular/core';
import { MaterialModule } from '../../../mat-module/mat-module.module';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dash-content',
  imports: [MaterialModule, CommonModule],
  templateUrl: './dash-content.component.html',
  styleUrl: './dash-content.component.scss',
})
export class DashContentComponent {
  turfs = [
    { name: 'Andheri Sports Turf', location: 'Andheri, Mumbai', image: 'assets/turf1.jpg' },
    { name: 'Bandra Football Arena', location: 'Bandra, Mumbai', image: 'assets/turf2.jpg' },
    { name: 'Worli Kick-Off Turf', location: 'Worli, Mumbai', image: 'assets/turf3.jpg' },
    { name: 'Dadar Elite Turf', location: 'Dadar, Mumbai', image: 'assets/turf4.jpg' },
    { name: 'Juhu Premium Turf', location: 'Juhu, Mumbai', image: 'assets/turf5.jpg' },
  ];

  timeSlots = this.generateTimeSlots();
  bookings: { [key: string]: boolean } = {};

  generateTimeSlots() {
    const slots = [];
    for (let hour = 6; hour < 23; hour++) {
      slots.push(`${this.formatTime(hour)} - ${this.formatTime(hour + 1)}`);
    }
    return slots;
  }

  formatTime(hour: number): string {
    let period = hour >= 12 ? 'PM' : 'AM';
    let formattedHour = hour > 12 ? hour - 12 : hour;
    return `${formattedHour}:00 ${period}`;
  }

  toggleSlot(turfName: string, timeSlot: string) {
    const key = `${turfName}-${timeSlot}`;
    this.bookings[key] = !this.bookings[key];
  }

  isBooked(turfName: string, timeSlot: string): boolean {
    return this.bookings[`${turfName}-${timeSlot}`] || false;
  }
}
