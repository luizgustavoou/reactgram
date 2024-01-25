import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";
import { IPhoto } from "../services/photo/models/IPhoto";
import { MouseEvent } from "react";
import { useAppSelector } from "../hooks/useAppSelector";
import { uploadsURL } from "../utils/config";
import Message from "./Message";
import { IUpdatePhoto } from "../interfaces/IUpdatePhoto";
import { useAppDispatch } from "../hooks/useAppDispatch";
import { updatePhoto } from "../slices/photoSlice";
import { resetMessage } from "../slices/userSlice";

import "./FormEditPhoto.css";

function FormEditPhoto() {
  const [currentPhoto] = useOutletContext<[IPhoto]>();
  const navigate = useNavigate();

  const dispatch = useAppDispatch();
  const { status: statusPhoto, messsage: messagePhoto } = useAppSelector(
    (state) => state.photo
  );

  const [title, setTitle] = useState("");
  const handleOnChangeTitle = (e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };
  const submitHandle = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const data: IUpdatePhoto = {
      id: currentPhoto._id,
      title: title,
    };

    dispatch(updatePhoto(data));

    resetComponentMessage();
  };

  const handleCancel = (
    e: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>
  ) => {
    e.preventDefault();

    navigate("../");
  };

  const resetComponentMessage = () => {
    setTimeout(() => {
      dispatch(resetMessage());
    }, 2000);
  };

  useEffect(() => {
    if (!currentPhoto) {
      navigate("../");
      return;
    }

    setTitle(currentPhoto.title);
  }, [currentPhoto]);

  return (
    <>
      <div className="edit-photo">
        <h3>Editando:</h3>
        {currentPhoto?.image && (
          <img
            src={`${uploadsURL}/photos/${currentPhoto.image}`}
            title={title}
          />
        )}
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
          {statusPhoto != "loading" && (
            <input type="submit" value="Atualizar" />
          )}
          {statusPhoto === "loading" && (
            <input type="submit" disabled value="Aguarde..." />
          )}
          {statusPhoto != "loading" && (
            <button
              type="button"
              value="Cancelar"
              className="btn cancel-btn"
              onClick={handleCancel}
            >
              Cancelar edição
            </button>
          )}
        </form>
      </div>
      {statusPhoto === "error" && (
        <Message msg={messagePhoto as string} type="error" />
      )}
      {statusPhoto === "success" && (
        <Message msg={messagePhoto as string} type="success" />
      )}
    </>
  );
}

export default FormEditPhoto;
