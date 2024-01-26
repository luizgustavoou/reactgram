import { IComment } from "../services/photo/models/IComment";
import { uploadsURL } from "../utils/config";
import "./CommentContainer.css";

export interface CommentContainerProps {
  comments: IComment[];
}

function CommentContainer({ comments }: CommentContainerProps) {
  return comments.map((comment) => (
    <div className="comment-container">
      <div className="comment-header">
        {comment.userImage && (
          <img src={`${uploadsURL}/users/${comment.userImage}`} />
        )}
        <span>{comment.userName}</span>
      </div>
      <div className="comment-main">{comment.comment}</div>
    </div>
  ));
}

export default CommentContainer;
