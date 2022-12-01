import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
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
  const [loading, setLoading] = useState(false);
  const { itemId } = useParams();
  const navigate = useNavigate();

  // update reviews state when item id param is loaded (i.e., when component is mounted)
  useEffect(() => {
    let errs = [];

    // get reviews
    (async () => {
      const { data } = await axios.get(`/api/reviews/get-all-by-itemId/${itemId}`);
      console.log(data);
      setReviews(data);
    })()
    .catch((err) => {
      console.log(err);   
      if (err?.response?.data) {
        errs = errs.concat(err.response.data);
      }
    });

    // get item
    (async () => {
      const { data } = await axios.get(`/api/items/one/${itemId}`);
      console.log(data);
      setItem(data);
    })()
    .catch((err) => {
      console.log(err);
      if (err?.response?.data) {
        errs = errs.concat(err.response.data);
      }
    });

    setErrors(errs);
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
  }, [user, reviews]);

  // return true if review is written by logged-in user, else false
  const reviewIsByUser = (review) => {
    if (!user) {
      return false;
    }
    return review.userId === user._id;
  };

  // delete the review
  const deleteReview = async (review) => {
    setLoading(true);
    try {
      await axios.delete(`/api/reviews/${review._id}`);
      navigate("/success", {
        state: {
          message: "Successfully deleted review"
        }
      });
    } catch (err) {    
      console.log(err);   
      if (err?.response?.data) {
        setErrors(err.response.data);
      }
      setLoading(false);
    }
  }

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
            <p className="rating">{review.rating}/5</p>
          </td>
          {
            reviewIsByUser(review) &&
            <td>
              <button
                className="button-primary button-primary-orange button-padding"
                onClick={() => navigate(`/edit-review/${review._id}`)}
                disabled={loading}>
                  Edit review
              </button>
              <button 
                className="button-primary button-primary-red button-padding"
                onClick={() => deleteReview(review)}
                disabled={loading}>
                  Delete review
              </button>
            </td>
          }          
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
          You've already reviewed this item
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