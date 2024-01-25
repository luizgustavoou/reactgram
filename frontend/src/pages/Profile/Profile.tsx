import "./Profile.css";

// Components
import { Link, Outlet, useNavigate } from "react-router-dom";
import { BsFillEyeFill, BsPencilFill, BsXLg } from "react-icons/bs";

// Hooks
import { useState, useEffect } from "react";
import { useAppSelector } from "../../hooks/useAppSelector";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import { useParams } from "react-router-dom";

// Redux
import { getProfileById } from "../../slices/userSlice";
import { userService } from "../../services";
import {
  deletePhoto,
  getPhotosByUserId,
  resetMessage,
} from "../../slices/photoSlice";
import { uploadsURL } from "../../utils/config";
import { IDeletePhoto } from "../../interfaces/IDeletePhoto";
import { IPhoto } from "../../services/photo/models/IPhoto";

function Profile() {
  const navigate = useNavigate();

  const [photo, setPhoto] = useState<IPhoto | null>(null);

  const { id } = useParams();
  const [previewImage, setPreviewImage] = useState<Blob | null>(null);
  const dispatch = useAppDispatch();

  const { user, status: statusUser } = useAppSelector((state) => state.user);
  const { user: userAuth } = useAppSelector((state) => state.auth);
  const { photos } = useAppSelector((state) => state.photo);

  const handleDeletePhoto = (id: string) => {
    const data: IDeletePhoto = { id };

    dispatch(deletePhoto(data));

    resetComponentMessage();
  };

  const handleUpdatePhoto = (photo: IPhoto) => {
    setPhoto(photo);

    navigate("editphoto");
  };

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

  const resetComponentMessage = () => {
    setTimeout(() => {
      dispatch(resetMessage());
    }, 2000);
  };

  if (statusUser == "loading") {
    return <p>Carregando...</p>;
  }

  const profileImageUrl = previewImage && URL.createObjectURL(previewImage);

  return (
    <div id="profile">
      <div className="profile-header">
        {profileImageUrl && <img src={profileImageUrl} alt={user?.name} />}
        <div className="profile-description">
          <h2>{user?.name}</h2>
          <p>{user?.bio}</p>
        </div>
      </div>

      <Outlet context={[photo]} />
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
                  <div className="actions">
                    <Link to={`/photos/${photo._id}`}>
                      <BsFillEyeFill />
                    </Link>
                    <BsPencilFill onClick={(_) => handleUpdatePhoto(photo)} />
                    <BsXLg onClick={(_) => handleDeletePhoto(photo._id)} />
                  </div>
                ) : (
                  <Link className="btn" to={`/photos/${photo._id}`}>
                    Ver
                  </Link>
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
