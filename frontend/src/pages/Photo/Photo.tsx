import "./Photo.css";

// Components
import Message from "../../components/Message";
import { Link, useParams } from "react-router-dom";

// Hooks
import { useState, useEffect } from "react";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import { useAppSelector } from "../../hooks/useAppSelector";

// Redux
import { getPhotoById, likePhoto } from "../../slices/photoSlice";
import PhotoItem from "../../components/PhotoItem";
import LikeContainer from "../../components/LikeContainer";
import { IPhoto } from "../../services/photo/models/IPhoto";
import { useResetComponentMessage } from "../../hooks/useResetComponentMessage";

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
    </div>
  );
}

export default Photo;
