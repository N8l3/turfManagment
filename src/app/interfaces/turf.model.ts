export interface SlotInfo {
    turfID: string;
    slotID: string;
    dayOfWeek: string;
    startTime: string;
    endTime: string;
    price: string;
    slotStatus: string;
}

export interface BookingRequest {
    fullName: string;
    email: string;
    mobileNumber: string;
    altMobileNumber: string;
    turfID: string;
    SlotID: string[];
    bookingDate: string;
    advanceAmount: string;
    discountAmount: string;
    finalAmount: string;
    paymentMode: string;
}