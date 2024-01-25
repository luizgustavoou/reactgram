import { Link } from "react-router-dom";
import { IPhoto } from "../services/photo/models/IPhoto";
import { BsFillEyeFill, BsPencilFill, BsXLg } from "react-icons/bs";
import { uploadsURL } from "../utils/config";

import "./PhotosList.css";


export interface PhotosListProps {
  photos: IPhoto[];
  isPhotosOfUserAuth: boolean;
  handleDeletePhoto: (id: string) => void;
  handleUpdatePhoto: (photo: IPhoto) => void;
}

function PhotosList({
  photos,
  isPhotosOfUserAuth,
  handleDeletePhoto,
  handleUpdatePhoto,
}: PhotosListProps) {
  return (
    <>
      {photos &&
        photos.map((photo) => (
          <div className="photo" key={photo._id}>
            {photo.image && (
              <img
                src={`${uploadsURL}/photos/${photo.image}`}
                alt={photo.title}
              />
            )}
            {isPhotosOfUserAuth ? (
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
    </>
  );
}

export default PhotosList;
