import "./Photo.css";

// Components
import Message from "../../components/Message";
import { Link, useParams } from "react-router-dom";

// Hooks
import { useState, useEffect } from "react";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import { useAppSelector } from "../../hooks/useAppSelector";

// Redux
import { getPhotoById } from "../../slices/photoSlice";
import PhotoItem from "../../components/PhotoItem";

function Photo() {
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.auth);
  const { photo, status: photoStatus } = useAppSelector((state) => state.photo);

  // Comments

  // Load photo data
  useEffect(() => {
    id && dispatch(getPhotoById({ id }));
  }, [dispatch, id]);

  if (photoStatus === "loading") {
    return <p>Carregando...</p>;
  }

  return (
    <div id="photo">
      {photo && <PhotoItem photo={photo}/>}
    </div>
  );
}

export default Photo;
