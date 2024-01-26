import "./Home.css";

// Components
import LikeContainer from "../../components/LikeContainer";
import PhotoItem from "../../components/PhotoItem";
import { Link, useNavigate } from "react-router-dom";

// Hooks
import { useEffect, MouseEvent } from "react";
import { useAppSelector } from "../../hooks/useAppSelector";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import { useResetComponentMessage } from "../../hooks/useResetComponentMessage";

// Redux
import { getAllPhotos, likePhoto } from "../../slices/photoSlice";
import { IPhoto } from "../../services/photo/models/IPhoto";
import { uploadsURL } from "../../utils/config";

const Home = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const resetMessage = useResetComponentMessage(dispatch);

  const { user } = useAppSelector((state) => state.auth);
  const { photos, status: statusPhotos } = useAppSelector(
    (state) => state.photo
  );

  // Load all photos
  useEffect(() => {
    dispatch(getAllPhotos());
  }, [dispatch]);

  // Like a photo
  const handleLike = (photo: IPhoto) => {
    dispatch(likePhoto({ photoId: photo._id }));

    resetMessage();
  };

  const handleSeeMore = (photo: IPhoto) => {
    navigate(`/photos/${photo._id}`);
  };

  if (statusPhotos === "loading") {
    return <p>Carrengado...</p>;
  }
  return (
    <div id="home">
      {photos.map((photo) => (
        <div key={photo._id}>
          <PhotoItem photo={photo} />
          {user && (
            <LikeContainer photo={photo} user={user} handleLike={handleLike} />
          )}
          <Link className="btn" to={`/photos/${photo._id}`}>
            Ver mais
          </Link>
        </div>
      ))}

      {photos.length === 0 && (
        <h2 className="no-photos">
          Ainda não há fotos publicadas.{" "}
          <Link to={`/users/${user?._id}`}>
            Clique aqui para postar a primeira foto!
          </Link>
        </h2>
      )}
    </div>
  );
};

export default Home;
