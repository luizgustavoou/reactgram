import "./Profile.css";

// Components
import Message from "../../components/Message";
import { Link } from "react-router-dom";
import { BsFillEyeFill, BsPencilFill, BsXLg } from "react-icons/bs";

// Hooks
import { useState, useEffect, useRef, FormEvent } from "react";
import { useAppSelector } from "../../hooks/useAppSelector";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import { useParams } from "react-router-dom";

// Redux
import { getProfileById } from "../../slices/userSlice";
import { userService } from "../../services";
import { getPhotosByUserId } from "../../slices/photoSlice";
import { uploadsURL } from "../../utils/config";

function Profile() {
  const { id } = useParams();
  const [previewImage, setPreviewImage] = useState<Blob | null>(null);
  const dispatch = useAppDispatch();

  const { user, status } = useAppSelector((state) => state.user);
  const { user: userAuth } = useAppSelector((state) => state.auth);
  const {
    photos,
    status: statusPhoto,
    messsage,
  } = useAppSelector((state) => state.photo);

  // New form and edit form refs
  const newPhotoForm = useRef<HTMLDivElement | null>(null);
  const editPhotoForm = useRef<HTMLDivElement | null>();

  // photo

  // Load user data
  useEffect(() => {
    dispatch(getProfileById(id as string));
    dispatch(getPhotosByUserId({ id: id as string }));
  }, [dispatch, id]);

  useEffect(() => {
    const loadImageOfUser = async () => {
      if (!user || !user.profileImage) return;

      const blob = await userService.getProfileImage(user.profileImage);

      setPreviewImage(blob);
    };

    loadImageOfUser();
  }, [user]);

  const submitHandle = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  if (status == "loading") {
    return <p>Carregando...</p>;
  }

  const profileImageUrl = previewImage && URL.createObjectURL(previewImage);

  return (
    <div id="profile">
      <div className="profile-header">
        {/* {user?.profileImage && (
          <img
            src={`${uploadsURL}/users/${user.profileImage}`}
            alt={user.name}
          />
        )} */}
        {profileImageUrl && <img src={profileImageUrl} alt={user?.name} />}
        <div className="profile-description">
          <h2>{user?.name}</h2>
          <p>{user?.bio}</p>
        </div>
      </div>
      {id === userAuth?._id && (
        <>
          <div className="new-photo" ref={newPhotoForm}>
            <h3>Compartilhe algum momento seu:</h3>
            <form onSubmit={submitHandle}>
              <label>
                <span>Título para a foto:</span>
                <input type="text" placeholder="Insira um título" />
              </label>
              <label>
                <span>Imagem:</span>
                <input type="file" />
              </label>
              <input type="submit" value="Postar" />
            </form>
          </div>
        </>
      )}
      <div className="user-photos">
        <h2>Fotos publicadas:</h2>
        <div className="photos-container">
          {photos &&
            photos.map((photo) => (
              <div className="photo" key={photo._id}>
                {photo.image && (
                  <img
                    src={`${uploadsURL}/photos/${photo.image}`}
                    alt={photo.title}
                  />
                )}
                {id === userAuth?._id ? (
                  <p>Actions</p>
                ) : (
                  <Link className="btn" to={`/photos/${photo._id}`} />
                )}
              </div>
            ))}
          {photos.length === 0 && <p>Ainda não há fotos publicadas.</p>}
        </div>
      </div>
    </div>
  );
}

export default Profile;
