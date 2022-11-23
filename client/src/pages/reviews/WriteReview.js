import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useGlobalContext } from "../../shared/context/GlobalContext";
import axios from "axios";

import "./Reviews.css";
import "../../shared/style/common.css";

const WriteReview = () => {
  const [text, setText] = useState("");
  const [rating, setRating] = useState(5);

  const { user } = useGlobalContext();
  const { itemId } = useParams();

  const handleSubmit = (e) => {
    e.preventDefault();    
  };

  return (
    <div>
      <form handleSubmit={handleSubmit}>
        <label>Review
          <input
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}      
          />
        </label>
        <input type="submit"/>
      </form>
    </div>
  );
};

export default WriteReview;