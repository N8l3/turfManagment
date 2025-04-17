export interface Booking {
  id: string;
  turfId: number;
  turfName: string;
  turfLocation: string;
  date: string;
  timeSlots: string[];
  userDetails: {
    name: string;
    mobile: string;
    email: string;
  };
  amount: {
    subtotal: number;
    discount: number;
    final: number;
  };
  bookingDate: string;
  status: 'confirmed' | 'cancelled' | 'completed';
  cancellation?: {
    reason: string;
    charge: number;
    date: string;
  };
}