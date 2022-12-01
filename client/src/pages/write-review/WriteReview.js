import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useGlobalContext } from "../../shared/context/GlobalContext";
import axios from "axios";

import "./WriteReview.css";
import "../../shared/style/common.css";
import { Table } from "react-bootstrap";

// if prop updating is true, then id is id of review to update, 
// otherwise id is id of item for which to create a new review
const WriteReview = ({
  updating
}) => {
  const [text, setText] = useState("");
  const [rating, setRating] = useState(5);
  const [item, setItem] = useState({});
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});  

  // id === review id if updating, else id === item id
  const { id } = useParams();
  const { user } = useGlobalContext();
  const navigate = useNavigate();

  // if user is not logged in, then navigate to error page
  useEffect(() => {
    console.log("Check if user is logged in");
    if (!user) {
      console.log("User not logged in, cannot write review, redirect to error page");
      navigate("/error", {
        state: {
          errors: [
            "Must be logged in to write or edit a review!"
          ]
        }
      });
    }
  }, [user, navigate]);

  // if updating, then fetch review and item, otherwise just fetch item
  useEffect(() => {      
    setLoading(true);
    console.log("Id: " + id);
    try {    
      if (updating) {
        console.log("Fetch existing review by id param and item by review itemId field");
        (async () => {
          // get review
          const getReviewResp = await axios.get(`/api/reviews/get-by-id/${id}`);
          console.log(getReviewResp.data);
          setText(getReviewResp.data.text);
          setRating(getReviewResp.data.rating); 

          // get item
          const { data } = await axios.get(`/api/items/one/${getReviewResp.data.itemId}`);
          console.log(data);
          setItem(data);    
        })();
      } else {
        console.log("Fetch item by id param");
        (async () => {
          // get item
          const { data } = await axios.get(`/api/items/one/${id}`);
          console.log(data);
          setItem(data);
        })();
      }
    } catch (err) {
      console.log(err);
      if (err?.response?.data) {
        setErrors(err.response.data);
      }  
    }
    setLoading(false);
  }, [updating, id]);  

  // submit review form
  // if updating, then put (update) existing review, otherwise post (create) new review
  const handleSubmit = async (e) => {
    e.preventDefault();   
    setLoading(true);                 
    try {
      if (updating) {
        await axios.put(`/api/reviews/${id}`, {
          text: text,
          rating: rating
        });
      } else {
        await axios.post("/api/reviews/new", {
          itemId: item._id,
          text: text,
          rating: rating
        });        
      }   
      navigate(`/reviews/${item._id}`, {
        state: {
          success: "Your review has successfully been updated!"
        }
      });
    } catch (err) {
      console.log(err);
      setLoading(false);            
      if (err?.response?.data) {
        setErrors(err.response.data);
      }  
    }
  };

  return (
    <div className="review-form-container">
      <div className="item-div">
        <span className="item-title white-text">{item.itemName}</span>
        <img className="item-img" src={item.imgSrc} alt=""/>         
      </div>
      <form onSubmit={(e) => handleSubmit(e)}>
        <Table striped bordered>
          <tbody>
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
                    autoFocus
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
                  <span className="review-form-label white-text"> /5</span>  
                  {
                    errors.rating &&
                    <p className="red-text">
                      {errors.rating}
                    </p>              
                  }
                </div>
              </td>
            </tr>
          </tbody>
        </Table>
        <input 
          type="submit" 
          value="Submit" 
          disabled={loading}
          className="button-primary button-primary-green submit"
        />         
      </form>
    </div>
  );
};

WriteReview.defaultProps = {
  updating: false
};

export default WriteReview;