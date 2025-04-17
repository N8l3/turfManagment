import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../../mat-module/mat-module.module';
import { FormsModule } from '@angular/forms';
import { BookingService } from '../../services/booking.service';
import { Booking } from '../../interfaces/booking.interface';
import { MatTableModule } from '@angular/material/table';

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [
    CommonModule, 
    MaterialModule, 
    FormsModule,
    MatTableModule
  ],
  templateUrl: './user.component.html',
  styleUrl: './user.component.scss'
})
export class UserComponent implements OnInit {
  userBookings: Booking[] = [];
  displayedColumns: string[] = [
    'bookingId', 
    'date', 
    'turf', 
    'timeSlots', 
    'userDetails', 
    'amount', 
    'cancellationDetails', // Add this line
    'actions'
  ];
  showCancelModal = false;
  selectedBooking: Booking | null = null;
  cancellationReason = '';
  cancellationCharge = 0;

  constructor(private bookingService: BookingService) {}

  ngOnInit() {
    this.loadBookings();
  }

  loadBookings() {
    this.bookingService.getBookings().subscribe(bookings => {
      // Ensure bookings are properly loaded and formatted
      this.userBookings = bookings.map(booking => ({
        ...booking,
        status: booking.status || 'confirmed' // Ensure status is set
      }));
      console.log('Loaded bookings:', this.userBookings); // Debug log
    });
  }

  isCancellable(booking: Booking): boolean {
    // Simplified check for testing
    return booking.status === 'confirmed';
  }

  openCancelModal(booking: Booking) {
    this.selectedBooking = booking;
    this.showCancelModal = true;
    this.cancellationCharge = Math.round(booking.amount.final * 0.2); // 20% cancellation charge
  }

  closeCancelModal() {
    this.showCancelModal = false;
    this.selectedBooking = null;
    this.cancellationReason = '';
  }

  confirmCancellation() {
    if (this.selectedBooking && this.cancellationReason) {
      this.bookingService.cancelBooking(
        this.selectedBooking.id,
        this.cancellationReason,
        this.cancellationCharge
      );
      this.loadBookings(); // Reload the bookings after cancellation
      this.closeCancelModal();
    }
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
