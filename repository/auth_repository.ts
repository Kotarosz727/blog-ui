import {User} from "./user_repository";

const url = 'http://localhost:3000/auth';

export interface UserCredentials {
    username: string;
    password: string;
}
export interface LoginResponse {
    token: string;
}

interface AuthUser extends User {
    password: string;
}

export const useAuthRepository = () => {
    const signup = async (payload: AuthUser): Promise<User> => {
        const signupUrl = `${url}/signup`;
        const response = await fetch((signupUrl), {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(payload)
        });
        if (response.status >= 500) {
            throw new Error(response.statusText);
        }
        const createdUser = await response.json();
        return createdUser as User;
    }

    const login = async (payload: UserCredentials): Promise<LoginResponse> => {
        const loginUrl = `${url}/login`;
        const response = await fetch((loginUrl), {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(payload)
        });
        if (response.status >= 500) {
            throw new Error(response.statusText);
        }
        const data = await response.json();
        return data as LoginResponse;
    }

    return {
        signup,
        login
    }
}