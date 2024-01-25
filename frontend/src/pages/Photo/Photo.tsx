import "./Photo.css";

// Components
import Message from "../../components/Message";
import { Link, useParams } from "react-router-dom";

// Hooks
import { useState, useEffect } from "react";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import { useAppSelector } from "../../hooks/useAppSelector";

// Redux

function Photo() {
  return (
    <div>
      <h3>Photo</h3>
    </div>
  );
}

export default Photo;
