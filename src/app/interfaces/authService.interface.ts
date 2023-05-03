export interface LoginData {
    email:string;
    password:string;
}

export interface LogupData {
    bornDate : string;
    country  : string;
    email    : string;
    lastName : string;
    name     : string;
    password : string;
    phone    : string;
    userName : string;
}

export interface AuthResp {
    data:       Data[]   | null;
    errors:     string[] | null;
    message:    string;
    statusCode: number;
}

export interface Data {
    uid:      string;
    userName: string;
    utk:      string;
    email: string;
}