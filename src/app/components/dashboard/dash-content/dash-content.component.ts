import { Component } from '@angular/core';
import { MaterialModule } from '../../../mat-module/mat-module.module';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dash-content',
  imports: [MaterialModule, CommonModule],
  templateUrl: './dash-content.component.html',
  styleUrl: './dash-content.component.scss',
})
export class DashContentComponent {
  constructor(private router: Router) {}

  turfs = [
    {
      id: 1,
      name: 'Andheri Sports Turf',
      location: 'Andheri, Mumbai',
      image: 'https://images.unsplash.com/photo-1459865264687-595d652de67e?q=80&w=1000&auto=format&fit=crop',
      price: 1200,
      rating: 4.5
    },
    {
      id: 2,
      name: 'Bandra Football Arena',
      location: 'Bandra, Mumbai',
      image: 'https://images.unsplash.com/photo-1552667466-07770ae110d0?q=80&w=1000&auto=format&fit=crop',
      price: 1500,
      rating: 4.8
    },
    {
      id: 3,
      name: 'Worli Kick-Off Turf',
      location: 'Worli, Mumbai',
      image: 'https://images.unsplash.com/photo-1529900748604-07564a03e7a6?q=80&w=1000&auto=format&fit=crop',
      price: 1300,
      rating: 4.3
    },
    {
      id: 4,
      name: 'Dadar Elite Turf',
      location: 'Dadar, Mumbai',
      image: 'https://images.unsplash.com/photo-1575361204480-aadea25e6e68?q=80&w=1000&auto=format&fit=crop',
      price: 1100,
      rating: 4.2
    },
    {
      id: 5,
      name: 'Juhu Premium Turf',
      location: 'Juhu, Mumbai',
      image: 'https://images.unsplash.com/photo-1518604666860-9ed391f76460?q=80&w=1000&auto=format&fit=crop',
      price: 1800,
      rating: 4.7
    },
    {
      id: 6,
      name: 'Thane Sports Hub',
      location: 'Thane, Mumbai',
      image: 'https://images.unsplash.com/photo-1487466365202-1afdb86c764e?q=80&w=1000&auto=format&fit=crop',
      price: 1000,
      rating: 4.4
    },
  ];

  timeSlots = this.generateTimeSlots();
  bookings: { [key: string]: { booked: boolean; user?: string } } = {};
  selectedSlot: { turf: string; time: string } | null = null;

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
    if (this.bookings[key]?.booked) {
      delete this.bookings[key];
    } else {
      this.selectedSlot = { turf: turfName, time: timeSlot };
    }
  }

  confirmBooking() {
    if (this.selectedSlot) {
      const key = `${this.selectedSlot.turf}-${this.selectedSlot.time}`;
      this.bookings[key] = { booked: true, user: 'You' };
      this.selectedSlot = null;
    }
  }
  goToTurfDetails(turf) {
    this.router.navigate(['/dashboard/turfDetails', turf.id], {
      state: { turfData: turf }
    });
  }
}
