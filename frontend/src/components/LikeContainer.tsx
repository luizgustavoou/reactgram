import { MouseEvent } from "react";
import { IPhoto } from "../services/photo/models/IPhoto";
import { IUser } from "../services/user/models/IUser";
import "./LikeContainer.css";

import { BsHeart, BsHeartFill } from "react-icons/bs";
import { IAuth } from "../services/auth/models/IAuth";

export interface LikeContainerProps {
  photo: IPhoto;
  user: IAuth;
  handleLike: (photo: IPhoto) => void;
}

function LikeContainer({ photo, user, handleLike }: LikeContainerProps) {
  const handleOnClickLike = (
    e: MouseEvent<SVGElement, globalThis.MouseEvent>
  ) => {
    e.preventDefault();

    handleLike(photo);
  };
  return (
    <div className="like">
      {photo.likes && user && (
        <>
          {photo.likes.includes(user._id) ? (
            <BsHeartFill />
          ) : (
            <BsHeart onClick={handleOnClickLike} />
          )}
        </>
      )}
      <p>{photo.likes.length} like(s)</p>
    </div>
  );
}

export default LikeContainer;
