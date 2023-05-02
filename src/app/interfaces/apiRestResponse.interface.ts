export interface RestResp {
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
