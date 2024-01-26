import { Link } from "react-router-dom";
import { IComment } from "../services/photo/models/IComment";
import { uploadsURL } from "../utils/config";
import "./CommentContainer.css";

export interface CommentContainerProps {
  comments: IComment[];
}

function CommentContainer({ comments }: CommentContainerProps) {
  return comments.map((comment) => (
    <div className="comment" key={comment.comment}>
      <div className="author">
        {comment.userImage && (
          <img src={`${uploadsURL}/users/${comment.userImage}`} />
        )}
        <Link to={`/users/${comment.userId}`}>{comment.userName}</Link>
      </div>
      <p>{comment.comment}</p>
    </div>
  ));
}

export default CommentContainer;
