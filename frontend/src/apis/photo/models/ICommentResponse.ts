export interface ICommentResponse {
  comment: {
    userId: string;
    comment: string;
    userImage?: string | null;
    userName: string;
  };
  message: string;
}
