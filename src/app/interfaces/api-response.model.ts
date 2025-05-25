export interface ApiResponse<T> {
    requestid: string;
    success: boolean;
    message: string;
    statuscode: string | null;
    errors: any | null;
    currentpage: number;
    pagesize: number;
    totalpages: number;
    totalitems: number;
    orderby: string;
    orderbydesc: boolean;
    data: T;
}