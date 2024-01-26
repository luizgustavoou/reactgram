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

function Photo() {
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const { user: userAuth } = useAppSelector((state) => state.auth);
  const { photo, status: photoStatus } = useAppSelector((state) => state.photo);

  // Comments

  // Load photo data
  useEffect(() => {
    id && dispatch(getPhotoById({ id }));
  }, [dispatch, id]);

  const handleLike = (photo: IPhoto) => {
    dispatch(likePhoto({ photoId: photo._id }));
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
    </div>
  );
}

export default Photo;
