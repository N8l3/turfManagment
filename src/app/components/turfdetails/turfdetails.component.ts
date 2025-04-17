import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../../mat-module/mat-module.module';
import { Location } from '@angular/common';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { BookingService } from '../../services/booking.service';
import { Booking } from '../../interfaces/booking.interface';

@Component({
  selector: 'app-turfdetails',
  standalone: true,
  imports: [
    CommonModule, 
    MaterialModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule
  ],
  templateUrl: './turfdetails.component.html',
  styleUrl: './turfdetails.component.scss'
})
export class TurfdetailsComponent implements OnInit {
  turfId: number = 0;
  turfData: any;
  minDate = new Date();
  selectedDate: Date = new Date();
  selectedSlots: string[] = [];
  showBookingModal = false;
  bookingDetails = {
    name: '',
    mobile: '',
    email: ''
  };

  constructor(
    private route: ActivatedRoute,
    private location: Location,
    private bookingService: BookingService
  ) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.turfId = +params['id'];
      this.loadTurfDetails();
    });

    const state = window.history.state;
    if (state && state.turfData) {
      this.turfData = state.turfData;
    }
    this.updateBookedSlots();
  }

  updateBookedSlots() {
    if (this.turfId) {
      const dateKey = this.selectedDate.toISOString().split('T')[0];
      this.bookingService.getBookedSlots(this.turfId, dateKey);
    }
  }

  goBack() {
    this.location.back();
  }

  loadTurfDetails() {
    // Here you can load turf details from a service if needed
    console.log('Loading details for turf ID:', this.turfId);
  }

  timeSlots = [
    '6:00 AM', '6:30 AM', '7:00 AM', '7:30 AM', '8:00 AM', '8:30 AM',
    '9:00 AM', '9:30 AM', '10:00 AM', '10:30 AM', '11:00 AM', '11:30 AM',
    '12:00 PM', '12:30 PM', '1:00 PM', '1:30 PM', '2:00 PM', '2:30 PM',
    '3:00 PM', '3:30 PM', '4:00 PM', '4:30 PM', '5:00 PM', '5:30 PM',
    '6:00 PM', '6:30 PM', '7:00 PM', '7:30 PM', '8:00 PM', '8:30 PM',
    '9:00 PM', '9:30 PM', '10:00 PM'
  ];

  selectSlot(slot: string) {
    const index = this.selectedSlots.indexOf(slot);
    if (index === -1) {
      this.selectedSlots.push(slot);
    } else {
      this.selectedSlots.splice(index, 1);
    }
    this.selectedSlots.sort();
  }

  isSlotSelected(slot: string): boolean {
    return this.selectedSlots.includes(slot);
  }

  getSelectedTimeRange(): string {
    if (this.selectedSlots.length === 0) return '';
    return `${this.selectedSlots[0]} - ${this.getEndTime(this.selectedSlots[this.selectedSlots.length - 1])}`;
  }

  getEndTime(lastSlot: string): string {
    const time = new Date(`2000/01/01 ${lastSlot}`);
    time.setMinutes(time.getMinutes() + 30);
    return time.toLocaleTimeString('en-US', { 
      hour: 'numeric',
      minute: '2-digit',
      hour12: true 
    });
  }

  isMorningSlot(slot: string): boolean {
    const hour = new Date(`2000/01/01 ${slot}`).getHours();
    return hour >= 6 && hour < 11;
  }

  isAfternoonSlot(slot: string): boolean {
    const hour = new Date(`2000/01/01 ${slot}`).getHours();
    return hour >= 11 && hour < 16;
  }

  isEveningSlot(slot: string): boolean {
    const hour = new Date(`2000/01/01 ${slot}`).getHours();
    return hour >= 16 && hour < 20;
  }

  isNightSlot(slot: string): boolean {
    const hour = new Date(`2000/01/01 ${slot}`).getHours();
    return hour >= 20;
  }

  calculateTotalAmount(): number {
    let total = 0;
    this.selectedSlots.forEach(slot => {
      if (this.isMorningSlot(slot)) total += 500;
      else if (this.isAfternoonSlot(slot)) total += 800;
      else if (this.isEveningSlot(slot)) total += 1200;
      else if (this.isNightSlot(slot)) total += 1000;
    });
    return total;
  }

  calculateDiscount(): number {
    const subtotal = this.calculateTotalAmount();
    return Math.round(subtotal * 0.2); // 20% discount
  }

  calculateFinalAmount(): number {
    const subtotal = this.calculateTotalAmount();
    const discount = this.calculateDiscount();
    return subtotal - discount;
  }

  openBookingModal() {
    this.showBookingModal = true;
  }

  closeBookingModal() {
    this.showBookingModal = false;
    this.bookingDetails = { name: '', mobile: '', email: '' };
  }

  confirmBooking() {
    try {
      const newBooking: Booking = {
        id: Date.now().toString(),
        turfId: this.turfId,
        turfName: this.turfData.name,
        turfLocation: this.turfData.location,
        date: this.selectedDate.toISOString().split('T')[0],
        timeSlots: this.selectedSlots,
        userDetails: {
          name: this.bookingDetails.name,
          mobile: this.bookingDetails.mobile,
          email: this.bookingDetails.email
        },
        amount: {
          subtotal: this.calculateTotalAmount(),
          discount: this.calculateDiscount(),
          final: this.calculateFinalAmount()
        },
        bookingDate: new Date().toISOString(),
        status: 'confirmed'
      };

      this.bookingService.addBooking(newBooking);
      this.closeBookingModal();
      this.selectedSlots = [];
      this.updateBookedSlots();
    } catch (error) {
      console.error('Booking failed:', error);
      // Handle error (you might want to show an error message to the user)
    }
  }

  isSlotBooked(slot: string): boolean {
    if (!this.turfId) return false;
    const dateKey = this.selectedDate.toISOString().split('T')[0];
    return !this.bookingService.isSlotAvailable(
      this.turfId,
      dateKey,
      slot
    );
  }

  // Add these properties for custom slot selector
  customStartHour: string = '';
  customStartMinute: string = '00';
  customEndHour: string = '';
  customEndMinute: string = '00';

  availableHours = Array.from({ length: 17 }, (_, i) => {
    const hour = i + 6; // Starting from 6 AM
    const value = hour.toString().padStart(2, '0');
    const label = `${hour > 12 ? hour - 12 : hour}:00 ${hour >= 12 ? 'PM' : 'AM'}`;
    return { value, label };
  });

  availableMinutes = ['00', '30'];

  isValidCustomSlot(): boolean {
    if (!this.customStartHour || !this.customEndHour) return false;
    
    const startTime = new Date(`2000/01/01 ${this.customStartHour}:${this.customStartMinute}`);
    const endTime = new Date(`2000/01/01 ${this.customEndHour}:${this.customEndMinute}`);
    
    return startTime < endTime;
  }

  addCustomSlot() {
    if (!this.isValidCustomSlot()) return;

    const startTime = new Date(`2000/01/01 ${this.customStartHour}:${this.customStartMinute}`);
    const endTime = new Date(`2000/01/01 ${this.customEndHour}:${this.customEndMinute}`);
    
    const slots: string[] = [];
    let currentTime = new Date(startTime);

    while (currentTime < endTime) {
      slots.push(currentTime.toLocaleTimeString('en-US', {
        hour: 'numeric',
        minute: '2-digit',
        hour12: true
      }));
      currentTime.setMinutes(currentTime.getMinutes() + 30);
    }

    slots.forEach(slot => {
      if (!this.isSlotBooked(slot) && !this.isSlotSelected(slot)) {
        this.selectSlot(slot);
      }
    });
  }
}
