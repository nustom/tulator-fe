
export interface IUser {
  username: string;
  fullName: string;
  token: string;
}
export interface ILoginPayload extends Pick<IUser, "username"> {
  password: string;
  remember: boolean;
}