import React, { useState, useEffect } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import { useGlobalContext } from "../../shared/context/GlobalContext";
import axios from "axios";

import "./Reviews.css";
import "../../shared/style/common.css";

const Reviews = () => {
  const { user } = useGlobalContext();
  const [item, setItem] = useState({});
  const [reviews, setReviews] = useState([]);
  const [errors, setErrors] = useState([]);
  const [reviewByUser, setReviewByUser] = useState(undefined);
  const { itemId } = useParams();
  const navigate = useNavigate();

  // update reviews state when item id param is loaded (i.e., when component is mounted)
  useEffect(() => {
    setErrors([]);
    let errors = [];
    (async () => {
      const { data } = await axios.get(`/api/reviews/${itemId}`);
      console.log(data);
      setReviews(data);
    })()
    .catch((err) => {
      console.log(err);   
      if (err?.response?.data) {
        errors = errors.concat(err.response.data);
      }
    });
    (async () => {
      const { data } = await axios.get(`/api/items/one/${itemId}`);
      console.log(data);
      setItem(data);
    })()
    .catch((err) => {
      console.log(err);
      errors = errors.concat(err.response.data);
    });
  }, [itemId]);

  // navigate to error page if there are errors
  useEffect(() => {
    if (errors.length > 0) {
      navigate("/error", {
        state: {
          errors: errors
        }
      });
    }
  }, [errors, navigate]);

  // update if user has reviewed this item
  useEffect(() => {
    setReviewByUser(undefined);
    if (user && reviews) {
      const foundReviewByUser = reviews.find((review) => review.userId === user._id);
      if (foundReviewByUser) {
        setReviewByUser(foundReviewByUser._id);
      }
    } 
  }, [reviews, user, setReviewByUser]);

  // rendered reviews
  const renderedReviews = reviews.map((review) => {
    return (
      <React.Fragment key={review._id}>
        <tr>
          <td>
            <hr className="line"/>
          </td>
        </tr>
        <tr>
          <td className="text-cell">
            <p>{review.text}</p>
          </td>          
          <td className="rating-cell circle">
            <p className="rating">{review.rating}</p>
          </td>
        </tr>        
      </React.Fragment>
    );
  });

  return (
    <div className="review-body">      
      <div>
        <button 
          className="button-primary button-primary-green"
          onClick={() => navigate("/menu")}>
            Return to Menu
        </button>
        <hr/>
      </div>
      <div className="item-div">
        <span className="item-title">{item.itemName}</span>
        <img className="item-img" src={item.imgSrc} alt=""/>         
      </div>
      <h1 className="review-heading">Reviews</h1>
      {
        user && !reviewByUser &&
        <button
          className="button-primary button-primary-green"
          onClick={() => navigate(`/write-review/${itemId}`)}>
            Write review
        </button>
      }
      {
        user && reviewByUser &&
        <span className="already-reviewed-notice">
          You've already review this item
        </span>
      }
      <table className="review-table">        
        <tbody>
          {renderedReviews}
        </tbody>
      </table>
      <hr/>
    </div>
  );

};

export default Reviews;