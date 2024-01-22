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

function Profile() {
  return (
    <div>
      <h1>Profile</h1>
    </div>
  );
}

export default Profile;
