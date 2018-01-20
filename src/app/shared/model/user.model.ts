export interface User {
  id?: string;
  account?: string;
  username?: string;
  password?: string;
  department?: string;
  img?: string;
  email?: string;
  sex?: string;
  age?: number;
  phone?: string;
}

export enum UserSex {
  MAN = 'MAN', WOMAN = 'WOMAN'
}
