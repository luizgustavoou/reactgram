import { ChangeEvent, FormEvent, useState } from "react";

// Components
import Message from "./Message";

// Redux
import { publishPhoto, resetMessage } from "../slices/photoSlice";
import { useAppDispatch } from "../hooks/useAppDispatch";
import { useAppSelector } from "../hooks/useAppSelector";

import "./FormNewPhoto.css";

function FormNewPhoto() {
  const dispatch = useAppDispatch();

  const { status: statusPhoto, messsage: messagePhoto } = useAppSelector(
    (state) => state.photo
  );

  const [title, setTitle] = useState("");
  const [image, setImage] = useState<Blob | null>(null);

  const handleOnChangeTitle = (e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const handleOnChangeFile = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;

    const file = e.target.files[0];

    setImage(file);
  };

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

  return (
    <>
      <div className="new-photo">
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
          {statusPhoto != "loading" && <input type="submit" value="Postar" />}
          {statusPhoto === "loading" && (
            <input type="submit" disabled value="Aguarde..." />
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

export default FormNewPhoto;
