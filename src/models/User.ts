interface User {
  id?: string;
  fullName?: string;
  email: string;
  isLoggedIn: boolean;
  lastActiveTimestamp: number;
  userName: string;
  password: string;
}
export default User;
