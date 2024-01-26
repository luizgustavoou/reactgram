import "./Search.css";

// hooks
import { useEffect, useState } from "react";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import { useAppSelector } from "../../hooks/useAppSelector";
import { useQuery } from "../../hooks/useQuery";

// Components
import LikeContainer from "../../components/LikeContainer";
import PhotoItem from "../../components/PhotoItem";
import { Link } from "react-router-dom";

// Redux
import { getPhotosBySearch, likePhoto } from "../../slices/photoSlice";
import { useResetComponentMessage } from "../../hooks/useResetComponentMessage";

function Search() {
  const [name, setName] = useState("");

  const query = useQuery();
  const search = query.get("q");

  const dispatch = useAppDispatch();

  const resetMessage = useResetComponentMessage(dispatch);

  const { user } = useAppSelector((state) => state.auth);
  const { photos, status: statusPhotos } = useAppSelector(
    (state) => state.photo
  );

  // Load photos
  useEffect(() => {
    search && dispatch(getPhotosBySearch({ text: search }));
  }, [dispatch, search]);

  // Like a photo
  const handleLike = (photo: IPhoto) => {
    dispatch(likePhoto({ photoId: photo._id }));

    resetMessage();
  };

  if (statusPhotos === "loading") {
    return <p>Carregando...</p>;
  }

  return (
    <div id="search">
      <h2>Você está buscando por: {search}</h2>
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
          Não foram encontradas resultados para sua busca...
        </h2>
      )}
    </div>
  );
}

export default Search;
