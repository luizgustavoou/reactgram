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

function Profile() {
  const { id } = useParams();
  const [previewImage, setPreviewImage] = useState<Blob | null>(null);
  const dispatch = useAppDispatch();

  const { user, status } = useAppSelector((state) => state.user);
  const { user: userAuth } = useAppSelector((state) => state.auth);

  // New form and edit form refs
  const newPhotoForm = useRef<HTMLDivElement | null>(null);
  const editPhotoForm = useRef<HTMLDivElement | null>();

  // photo

  // Load user data
  useEffect(() => {
    dispatch(getProfileById(id as string));
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
    </div>
  );
}

export default Profile;
