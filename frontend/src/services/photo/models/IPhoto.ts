export interface IPhoto {
  _id: string;
  image: string;
  title: string;
  likes: any[];
  comments: any[];
  userName: string;
  createdAt: string;
  updateAt: string;
}
