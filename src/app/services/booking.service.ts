import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Booking } from '../interfaces/booking.interface';

@Injectable({
  providedIn: 'root'
})
export class BookingService {
  private readonly STORAGE_KEY = 'turf_bookings';
  private bookings = new BehaviorSubject<Booking[]>(this.loadBookings());

  private loadBookings(): Booking[] {
    const stored = localStorage.getItem(this.STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  }

  private saveBookings(bookings: Booking[]) {
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(bookings));
    this.bookings.next(bookings);
  }

  isSlotAvailable(turfId: number, date: string, timeSlot: string): boolean {
    const bookings = this.bookings.getValue();
    const normalizedDate = new Date(date).toISOString().split('T')[0];
    const bookedSlots = bookings.filter(booking => 
      booking.turfId === turfId && 
      new Date(booking.date).toISOString().split('T')[0] === normalizedDate && 
      booking.status !== 'cancelled'
    );

    return !bookedSlots.some(booking => booking.timeSlots.includes(timeSlot));
  }

  getBookedSlots(turfId: number, date: string): string[] {
    const bookings = this.bookings.getValue();
    const normalizedDate = new Date(date).toISOString().split('T')[0];
    return bookings
      .filter(booking => 
        booking.turfId === turfId && 
        new Date(booking.date).toISOString().split('T')[0] === normalizedDate && 
        booking.status !== 'cancelled'
      )
      .flatMap(booking => booking.timeSlots)
      .sort();
  }

  addBooking(booking: Booking) {
    const currentBookings = this.bookings.getValue();
    
    // Check if any of the selected slots are already booked
    const isAnySlotBooked = booking.timeSlots.some(slot => 
      !this.isSlotAvailable(booking.turfId, booking.date, slot)
    );

    if (isAnySlotBooked) {
      throw new Error('One or more selected slots are already booked');
    }

    this.saveBookings([...currentBookings, booking]);
  }

  getBookings(): Observable<Booking[]> {
    return this.bookings.asObservable();
  }

  cancelBooking(bookingId: string, reason: string, charge: number) {
    const currentBookings = this.bookings.getValue();
    const updatedBookings = currentBookings.map(booking => {
      if (booking.id === bookingId) {
        return {
          ...booking,
          status: 'cancelled' as const,
          cancellation: {
            reason,
            charge,
            date: new Date().toISOString()
          }
        };
      }
      return booking;
    });
    this.saveBookings(updatedBookings);
  }

  getBookingById(bookingId: string): Booking | undefined {
    const bookings = this.bookings.getValue();
    return bookings.find(booking => booking.id === bookingId);
  }

  getBookingsByStatus(status: 'confirmed' | 'cancelled' | 'completed'): Observable<Booking[]> {
    return this.bookings.pipe(
      map(bookings => bookings.filter(booking => booking.status === status))
    );
  }

  getBookingStats() {
    const bookings = this.bookings.getValue();
    return {
      total: bookings.length,
      confirmed: bookings.filter(b => b.status === 'confirmed').length,
      cancelled: bookings.filter(b => b.status === 'cancelled').length,
      completed: bookings.filter(b => b.status === 'completed').length,
      totalRevenue: bookings
        .filter(b => b.status !== 'cancelled')
        .reduce((sum, b) => sum + b.amount.final, 0),
      cancellationCharges: bookings
        .filter(b => b.status === 'cancelled')
        .reduce((sum, b) => sum + (b.cancellation?.charge || 0), 0)
    };
  }

  getTurfBookings(turfId: number): Observable<Booking[]> {
    return this.bookings.pipe(
      map(bookings => bookings.filter(booking => booking.turfId === turfId))
    );
  }

  getUserBookings(mobile: string): Observable<Booking[]> {
    return this.bookings.pipe(
      map(bookings => bookings.filter(booking => booking.userDetails.mobile === mobile))
    );
  }

  getDateBookings(date: string): Observable<Booking[]> {
    return this.bookings.pipe(
      map(bookings => bookings.filter(booking => booking.date === date))
    );
  }
}