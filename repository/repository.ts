import {User} from "./user_repository";

export interface Id  {
    id: string
}

export interface Entity  {
    id: Id;
}

export type StatusCode = 200 | 201 | 400 | 404 | 500;

export interface HttpResponse {
    statusCode: StatusCode;
    message: string[];
    error: string;
}

export const is400ErrorResponse = (res: HttpResponse): boolean => {
    return 'error' in res && res.statusCode === 400;
}
export interface Repository<T extends Entity> {
    index:() => Promise<T[]>;
    create:(payload: T) => Promise<User>;
    show:(id: Id) => Promise<T>;
    update:(payload: T) => Promise<T>;
    destroy:(id: Id) => Promise<HttpResponse>;
}