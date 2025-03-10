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
  turfSlots = [
    {
      name: 'Andheri Sports Turf',
      location: 'Andheri, Mumbai',
      slots: this.generateTimeSlots(),
    },
    {
      name: 'Bandra Football Arena',
      location: 'Bandra, Mumbai',
      slots: this.generateTimeSlots(),
    },
    {
      name: 'Worli Kick-Off Turf',
      location: 'Worli, Mumbai',
      slots: this.generateTimeSlots(),
    },
  ];

  generateTimeSlots() {
    const slots = [];
    let startTime = 6; // Start from 6:00 AM
    let endTime = 23; // End at 11:00 PM

    for (let i = startTime; i < endTime; i++) {
      let slotTime = `${this.formatTime(i)} - ${this.formatTime(i + 1)}`;
      slots.push({ time: slotTime, available: Math.random() < 0.7 });
    }
    return slots;
  }

  formatTime(hour: number): string {
    let period = hour >= 12 ? 'PM' : 'AM';
    let formattedHour = hour > 12 ? hour - 12 : hour;
    return `${formattedHour}:00 ${period}`;
  }

  toggleSlot(slot: any) {
    slot.available = !slot.available;
  }
}
