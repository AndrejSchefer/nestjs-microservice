export interface UserInterface {
  id?: number;
  firstName?: string;
  lastName?: string;
  email?: string;
  password: string;
  password_repeat?: string;
  isActive?: boolean;
  registrationDate?: Date;
}

export type Tocken = { isRegUserId: number, tocken: string | undefined } | string;

export interface LoginUser {
  id: number;
  firstName: string;
  lastName: string;
}

export interface JWTToken {
  id: number;
  firstname: string;
  lastname: string;
  username: string;
  iat: number;
}
