export interface LoginData {
    email:string;
    password:string;
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
}