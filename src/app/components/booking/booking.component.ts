import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../../mat-module/mat-module.module';
import { BookingService } from '../../services/booking.service';
import { Booking } from '../../interfaces/booking.interface';

@Component({
  selector: 'app-booking',
  standalone: true,
  imports: [CommonModule, MaterialModule],
  templateUrl: './booking.component.html',
  styleUrl: './booking.component.scss'
})
export class BookingComponent implements OnInit {
  bookings: Booking[] = [];
  displayedColumns: string[] = ['date', 'turf', 'slots', 'amount', 'status'];

  constructor(private bookingService: BookingService) {}

  ngOnInit() {
    this.bookingService.getBookings().subscribe(bookings => {
      this.bookings = bookings;
    });
  }

  getTimeRange(slots: string[]): string {
    if (!slots.length) return '';
    return `${slots[0]} - ${this.getEndTime(slots[slots.length - 1])}`;
  }

  private getEndTime(lastSlot: string): string {
    const time = new Date(`2000/01/01 ${lastSlot}`);
    time.setMinutes(time.getMinutes() + 30);
    return time.toLocaleTimeString('en-US', { 
      hour: 'numeric',
      minute: '2-digit',
      hour12: true 
    });
  }
}
