import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { LoginResponse, UserData } from '../interfaces/auth.model';
import { ApiResponse } from '../interfaces/api-response.model';
import { SlotInfo, BookingRequest } from '../interfaces/turf.model';

const BASE_URL = 'https://api.classic7turf.com';

@Injectable({
    providedIn: 'root'
})
export class RestService {
    constructor(private http: HttpClient) {}

    private get headers(): HttpHeaders {
        return new HttpHeaders({
            'Content-Type': 'application/json'
        });
    }

    login(username: string, password: string): Observable<LoginResponse> {
        return this.http.post<LoginResponse>(`${BASE_URL}/Auth/Login`, { username, password })
            .pipe(
                map(response => {
                    localStorage.setItem('token', response.token);
                    return response;
                })
            );
    }

    verifyUser(loginID: string, password: string): Observable<ApiResponse<UserData[]>> {
        return this.http.post<ApiResponse<UserData[]>>(
            `${BASE_URL}/Login/VerifyUser`,
            { loginID, password },
            { headers: this.headers }
        );
    }

    getAvailableSlots(turfID: string, bookingDate: string): Observable<ApiResponse<SlotInfo[]>> {
        return this.http.post<ApiResponse<SlotInfo[]>>(
            `${BASE_URL}/Turf/GetAvailableSlots`,
            { turfID, bookingDate },
            { headers: this.headers }
        );
    }

    createBooking(bookingData: BookingRequest): Observable<ApiResponse<any>> {
        return this.http.post<ApiResponse<any>>(
            `${BASE_URL}/Turf/CreateBooking`,
            bookingData,
            { headers: this.headers }
        );
    }
}
