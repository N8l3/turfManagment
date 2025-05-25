export interface LoginRequest {
    username: string;
    password: string;
}

export interface LoginResponse {
    token: string;
    validity: string;
    isValidUser: boolean;
    apiExpiringOn: string;
}

export interface VerifyUserRequest {
    loginID: string;
    password: string;
}

export interface UserData {
    userID: string;
    userName: string;
    userEmail: string;
    userMobile: string;
    lastLoginDate: string;
}