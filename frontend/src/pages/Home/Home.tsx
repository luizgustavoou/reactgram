import "./Home.css";

// Components
import LikeContainer from "../../components/LikeContainer";
import PhotoItem from "../../components/PhotoItem";
import { Link } from "react-router-dom";

// Hooks
import { useEffect } from "react";
import { useAppSelector } from "../../hooks/useAppSelector";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import { useResetComponentMessage } from "../../hooks/useResetComponentMessage";

// Redux
import { getAllPhotos, likePhoto } from "../../slices/photoSlice";
import { IPhoto } from "../../services/photo/models/IPhoto";

const Home = () => {
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

  if (statusPhotos === "loading") {
    return <p>Carrengado...</p>;
  }
  return (
    <div>
      <h1>Home</h1>
    </div>
  );
};

export default Home;
