import "./Profile.css";

import { uploadsURL } from "../../utils/config";

// Components
import Message from "../../components/Message";
import { Link } from "react-router-dom";
import { BsFillEyeFill, BsPencilFill, BsXLg } from "react-icons/bs";

// Hooks
import { useState, useEffect, useRef } from "react";
import { useAppSelector } from "../../hooks/useAppSelector";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import { useParams } from "react-router-dom";

// Redux
import { getProfileById } from "../../slices/userSlice";

function Profile() {
  const { id } = useParams();

  const dispatch = useAppDispatch();

  const { user, status } = useAppSelector((state) => state.user);
  const { user: userAuth } = useAppSelector((state) => state.auth);

  // photo

  // Load user data
  useEffect(() => {
    dispatch(getProfileById(id as string));
  }, [dispatch, id]);

  if (status == "loading") {
    return <p>Carregando...</p>;
  }
  return (
    <div id="profile">
      <div className="profile-header">
        {user?.profileImage && (
          <img
            src={`${uploadsURL}/users/${user.profileImage}`}
            alt={user.name}
          />
        )}
        <div className="profile-description">
          <h2>{user?.name}</h2>
          <p>{user?.bio}</p>
        </div>
      </div>
    </div>
  );
}

export default Profile;
