import "./Profile.css";

// Components
import Message from "../../components/Message";
import { Link } from "react-router-dom";
import { BsFillEyeFill, BsPencilFill, BsXLg } from "react-icons/bs";

// Hooks
import {
  useState,
  useEffect,
  useRef,
  FormEvent,
  ChangeEvent,
  MouseEvent,
} from "react";
import { useAppSelector } from "../../hooks/useAppSelector";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import { useParams } from "react-router-dom";

// Redux
import { getProfileById } from "../../slices/userSlice";
import { userService } from "../../services";
import {
  deletePhoto,
  getPhotosByUserId,
  publishPhoto,
  resetMessage,
  updatePhoto,
} from "../../slices/photoSlice";
import { uploadsURL } from "../../utils/config";
import { IDeletePhoto } from "../../interfaces/IDeletePhoto";
import { IPhoto } from "../../services/photo/models/IPhoto";
import { IUpdatePhoto } from "../../interfaces/IUpdatePhoto";

function Profile() {
  const { id } = useParams();
  const [previewImage, setPreviewImage] = useState<Blob | null>(null);
  const dispatch = useAppDispatch();

  const { user, status: statusUser } = useAppSelector((state) => state.user);
  const { user: userAuth } = useAppSelector((state) => state.auth);
  const {
    photos,
    status: statusPhoto,
    messsage: messagePhoto,
  } = useAppSelector((state) => state.photo);

  // New form and edit form refs
  const newPhotoForm = useRef<HTMLDivElement | null>(null);
  const editPhotoForm = useRef<HTMLDivElement | null>(null);

  // photo
  const [title, setTitle] = useState("");
  const [image, setImage] = useState<Blob | null>(null);

  const [editId, setEditId] = useState<string>("");
  const [editImage, setEditImage] = useState<string>("");
  const [editTitle, setEditTitle] = useState<string>("");

  const handleOnChangeTitle = (e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const handleOnChangeFile = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;

    const file = e.target.files[0];

    setImage(file);
  };

  const handleOnChangeEditTitle = (e: ChangeEvent<HTMLInputElement>) => {
    setEditTitle(e.target.value);
  };

  const handleDeletePhoto = (id: string) => {
    const data: IDeletePhoto = { id };

    dispatch(deletePhoto(data));

    resetComponentMessage();
  };

  // Show or hide forms
  const hideOrShowForms = () => {
    newPhotoForm.current?.classList.toggle("hide");
    editPhotoForm.current?.classList.toggle("hide");
  };

  // update a photo
  const handleUpdate = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const data: IUpdatePhoto = {
      title: editTitle,
      id: editId,
    };

    dispatch(updatePhoto(data));

    resetComponentMessage();
  };

  // Open edit form
  const handleEdit = (photo: IPhoto) => {
    if (editPhotoForm.current?.classList.contains("hide")) {
      hideOrShowForms();
    }

    setEditId(photo._id);
    setEditTitle(photo.title);
    setEditImage(photo.image);
  };

  const handleCancelEdit = (
    e: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>
  ) => {
    e.preventDefault();
    hideOrShowForms();
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

  const submitHandle = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    dispatch(publishPhoto({ image: image as Blob, title }));

    setTitle("");
    setImage(null);

    resetComponentMessage();
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
                <input
                  type="text"
                  placeholder="Insira um título"
                  value={title || ""}
                  onChange={handleOnChangeTitle}
                />
              </label>
              <label>
                <span>Imagem:</span>
                <input type="file" onChange={handleOnChangeFile} />
              </label>
              {statusPhoto != "loading" && (
                <input type="submit" value="Postar" />
              )}
              {statusPhoto === "loading" && (
                <input type="submit" disabled value="Aguarde..." />
              )}
            </form>
          </div>
          <div className="edit-photo hide" ref={editPhotoForm}>
            <p>Editando:</p>
            {editImage && (
              <img src={`${uploadsURL}/photos/${editImage}`} alt={editTitle} />
            )}
            <form onSubmit={handleUpdate}>
              <input
                type="text"
                placeholder="Insira o novo título"
                value={editTitle || ""}
                onChange={handleOnChangeEditTitle}
              />

              <input type="submit" value="Atualizar" />
              <button className="cancel-btn" onClick={handleCancelEdit}>
                Cancelar edição
              </button>
            </form>
          </div>
          {statusPhoto === "error" && (
            <Message msg={messagePhoto as string} type="error" />
          )}
          {statusPhoto === "success" && (
            <Message msg={messagePhoto as string} type="success" />
          )}
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
                  <div className="actions">
                    <Link to={`/photos/${photo._id}`}>
                      <BsFillEyeFill />
                    </Link>
                    <BsPencilFill onClick={() => handleEdit(photo)} />
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
