import "./EditProfile.css";

// Ler: https://www.filestack.com/fileschool/react/react-file-upload/

// Hooks
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import { useAppSelector } from "../../hooks/useAppSelector";

// Redux
import { getProfile, resetMessage } from "../../slices/userSlice";

// Components
import Message from "../../components/Message";
import { uploads } from "../../utils/config";
import { userApi } from "../../apis";

function EditProfile() {
  const { error, message, status, user } = useAppSelector(
    (state) => state.user
  );

  const dispatch = useAppDispatch();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [profileImage, setProfileImage] = useState<Blob | null>(null);
  const [bio, setBio] = useState("");
  const [password, setPassword] = useState("");
  const [previewImage, setPreviewImage] = useState<Blob | null>(null);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  const handleOnChangeName = (e: ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  const handleOnChangeEmail = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handleOnChangeFile = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;

    const file: File = e.target.files[0];

    setPreviewImage(file);

    setProfileImage(file);
  };

  const handleOnChangeBio = (e: ChangeEvent<HTMLInputElement>) => {
    setBio(e.target.value);
  };

  const handleOnChangePassword = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  // Load user data
  useEffect(() => {
    dispatch(getProfile());
  }, [dispatch]);

  // Fill form with user data
  useEffect(() => {
    if (!user) return;

    setName(user.name);
    setEmail(user.email);
    setBio(user.bio);
  }, [user]);

  const profileImageUrl = previewImage
    ? URL.createObjectURL(previewImage)
    : `${uploads}/users/${user?.profileImage}`;

  return (
    <div id="edit-profile">
      <h2>Edite seus dados</h2>
      <p className="subtitle">
        Adicione uma imagem de perfil e conte mais sobre você...
      </p>
      {(user?.profileImage || previewImage) && (
        <img
          className="profile-image"
          src={profileImageUrl}
          alt="Foto de perfil do usuário."
        />
      )}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Nome"
          onChange={handleOnChangeName}
          value={name || ""}
        />
        <input
          type="email"
          placeholder="E-mail"
          onChange={handleOnChangeEmail}
          value={email || ""}
        />
        <label>
          <span>Imagem do Perfil:</span>
          <input type="file" onChange={handleOnChangeFile} />
        </label>
        <label>
          <span>Bio:</span>
          <input
            type="text"
            placeholder="Descrição do perfil"
            onChange={handleOnChangeBio}
            value={bio || ""}
          />
        </label>
        <label>
          <span>Quer alterar sua senha?</span>
          <input
            type="password"
            placeholder="Digite sua nova senha"
            onChange={handleOnChangePassword}
            value={password || ""}
          />
        </label>
        <input type="submit" value="Atualizar" />
      </form>
    </div>
  );
}

export default EditProfile;
