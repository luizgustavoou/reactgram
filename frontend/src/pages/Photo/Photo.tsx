import "./Photo.css";

// Components
import Message from "../../components/Message";
import { Link, useParams } from "react-router-dom";

// Hooks
import { useState, useEffect, ChangeEvent, FormEvent } from "react";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import { useAppSelector } from "../../hooks/useAppSelector";

// Redux
import { commentPhoto, getPhotoById, likePhoto } from "../../slices/photoSlice";
import PhotoItem from "../../components/PhotoItem";
import LikeContainer from "../../components/LikeContainer";
import { IPhoto } from "../../services/photo/models/IPhoto";
import { useResetComponentMessage } from "../../hooks/useResetComponentMessage";
import CommentContainer from "../../components/CommentContainer";
import { ICommentPhoto } from "../../interfaces/ICommentPhoto";

function Photo() {
  const { id } = useParams();
  const dispatch = useAppDispatch();

  const resetMessage = useResetComponentMessage(dispatch);

  const { user: userAuth } = useAppSelector((state) => state.auth);
  const {
    photo,
    status: photoStatus,
    messsage: photoMessage,
  } = useAppSelector((state) => state.photo);

  // Comments
  const [comment, setComment] = useState("");

  const handleOnChangeComment = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setComment(e.target.value);
  };

  const submitCommentForm = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const data: ICommentPhoto = {
      photoId: photo?._id as string,
      comment: comment,
    };

    dispatch(commentPhoto(data));

    setComment("");
    resetMessage();
  };

  // Load photo data
  useEffect(() => {
    id && dispatch(getPhotoById({ id }));
  }, [dispatch, id]);

  const handleLike = (photo: IPhoto) => {
    dispatch(likePhoto({ photoId: photo._id }));

    resetMessage();
  };

  if (photoStatus === "loading") {
    return <p>Carregando...</p>;
  }

  return (
    <div id="photo">
      {photo && <PhotoItem photo={photo} />}
      {photo && userAuth && (
        <LikeContainer photo={photo} user={userAuth} handleLike={handleLike} />
      )}
      <div className="message-container">
        {photoStatus === "error" && (
          <Message msg={photoMessage as string} type="error" />
        )}
        {photoStatus === "success" && (
          <Message msg={photoMessage as string} type="success" />
        )}
      </div>
      <div className="comments">
        <h3>Comentários: ({photo?.comments.length})</h3>
        <form onSubmit={submitCommentForm}>
          <input
            type="text"
            placeholder="Insira o seu comentário..."
            value={comment || ""}
            onChange={handleOnChangeComment}
          />
          <input type="submit" value="Enviar" />
        </form>
        {photo?.comments.length === 0 && <p>Não há comentários...</p>}
      </div>
      {photo && <CommentContainer comments={photo?.comments} />}
    </div>
  );
}

export default Photo;
