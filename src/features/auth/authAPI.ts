import { ILoginPayload, IUser } from "./interface";

export async function fakeLogin({ username, password, remember }: ILoginPayload): Promise<IUser> {
  const fakeUser: IUser = {
    username,
    token: btoa(password),
    fullName: username,
  }
  return new Promise<IUser>((resolve) => {
    setTimeout(() => {
      if (remember) {
        localStorage.setItem("user", JSON.stringify(fakeUser));
      }
      resolve(fakeUser);
    }, 500);
  });
}