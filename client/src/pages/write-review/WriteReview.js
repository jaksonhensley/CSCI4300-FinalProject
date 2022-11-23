import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useGlobalContext } from "../../shared/context/GlobalContext";
import axios from "axios";

import "./WriteReview.css";
import "../../shared/style/common.css";
import { Table } from "react-bootstrap";

const WriteReview = () => {
  const [text, setText] = useState("");
  const [rating, setRating] = useState(5);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const { user } = useGlobalContext();
  const { itemId } = useParams();
  const navigate = useNavigate();

  // navigate to error page if not logged in
  useEffect(() => {
    if (!user) {
      console.log("User not logged in, cannot write review, redirect to error page");
      navigate("/error", {
        state: {
          errors: [
            "Must be logged in to write a review!"
          ]
        }
      });
    }
  }, [user, navigate]);

  // submit review form
  const handleSubmit = async (e) => {
    e.preventDefault();   
    setLoading(true);         
    console.log("Submitting review");
    console.log("Item id: " + itemId);
    console.log("Text: " + text);
    console.log("Rating: " + rating);

    await axios.post("/api/reviews/new", {
      itemId: itemId,
      text: text,
      rating: rating
    })
    .then(() => {
      navigate(`/reviews/${itemId}`, {
        state: {
          success: "Your review has successfully been posted!"
        }
      });
    })
    .catch((err) => {
      console.log(err);
      setLoading(false);            
      if (err?.response?.data) {
        setErrors(err.response.data);
      }      
    });        
  };

  return (
    <div className="review-form-container">
      <form onSubmit={(e) => handleSubmit(e)}>
        <Table striped bordered>
          <tr>
            <td>
              <span className="review-form-label white-text">Review</span>
            </td>
            <td>
              <div>
                <textarea
                  rows="4"
                  cols="50"            
                  maxLength="300"
                  value={text}
                  autofocus
                  required
                  onChange={(e) => setText(e.target.value)}      
                />
                <div>
                  <p className={"text-length " + (text.length < 25 || text.length >= 300 ? "red-text" : "white-text")}>
                    {text.replace(/\s+/g, "").length}
                  </p>
                  {
                    (text.replace(/\s+/g, "").length) < 25 &&
                    <p className="red-text">
                      Review must be at least 25 characters long!
                    </p>
                  }
                  {
                    (text.replace(/\s+/g, "").length) >= 25 &&
                    <p className="white-text">
                      Review cannot exceed 300 characters
                    </p>
                  }
                  {
                    errors.text &&
                    <p className="red-text">
                      {errors.text}
                    </p>              
                  }
                </div>
              </div>
            </td>
          </tr>        
          <tr>
            <td>
              <span className="review-form-label white-text">Rating</span>              
            </td>
            <td>
              <div>
                <input 
                  type="number"
                  min="0"
                  max="5"
                  value={rating}
                  onChange={(e) => setRating(e.target.value)}
                />  
                {
                  errors.rating &&
                  <p className="red-text">
                    {errors.rating}
                  </p>              
                }
              </div>
            </td>
          </tr>
        </Table>
        <input 
          type="submit" 
          value="Submit" 
          disabled={loading}
          className="button-primary button-primary-green"
        />         
      </form>
    </div>
  );
};

export default WriteReview;