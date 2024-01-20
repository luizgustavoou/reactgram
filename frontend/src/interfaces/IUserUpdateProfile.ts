export interface IUserUpdateProfile {
  id: string;
  name?: string;
  email?: string;
  password?: string;
  bio?: string;
  profileImage: Blob;
}
