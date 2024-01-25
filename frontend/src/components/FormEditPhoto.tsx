import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";
import { IPhoto } from "../services/photo/models/IPhoto";
import { MouseEvent } from "react";
import { useAppSelector } from "../hooks/useAppSelector";

function FormEditPhoto() {
  const [currentPhoto] = useOutletContext<[IPhoto]>();
  const navigate = useNavigate();

  const [title, setTitle] = useState("");

  const { status: statusPhoto, messsage: messagePhoto } = useAppSelector(
    (state) => state.photo
  );

  const handleOnChangeTitle = (e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };
  const submitHandle = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    console.log("edit photo submited !");
  };

  const handleCancel = (
    e: MouseEvent<HTMLInputElement, globalThis.MouseEvent>
  ) => {
    e.preventDefault();

    navigate("../");
  };

  useEffect(() => {
    if (!currentPhoto) {
      navigate("../");
      return;
    }

    setTitle(currentPhoto.title);
  }, [currentPhoto]);

  return (
    <div className="edit-photo">
      <h3>Editando:</h3>
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
        {statusPhoto != "loading" && <input type="submit" value="Atualizar" />}
        {statusPhoto != "loading" && (
          <input
            type="button"
            value="Cancelar"
            className="btn cancel-btn"
            onClick={handleCancel}
          />
        )}

        {statusPhoto === "loading" && (
          <input type="submit" disabled value="Aguarde..." />
        )}
      </form>
    </div>
  );
}

export default FormEditPhoto;
