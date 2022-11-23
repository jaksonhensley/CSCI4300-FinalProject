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
  const [userHasReviewed, setUserHasReviewed] = useState(false);
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
    if (user && reviews) {
      const hasReviewed = reviews.some((review) => review.userId === user._id);
      setUserHasReviewed(hasReviewed);
    } else {
      setUserHasReviewed(false);
    }
  }, [reviews, user, userHasReviewed]);

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
      <div className="item-div">
        <span className="item-title">{item.itemName}</span>
        <img className="item-img" src={item.imgSrc} alt=""/>         
      </div>
      <h1 className="review-heading">Reviews</h1>
      {
        user &&
        <button
          className="button-primary button-primary-green"
          onClick={() => navigate(`/write-review/${itemId}`)}>
            Write review
        </button>
      }
      <table className="review-table">        
        <tbody>
          {renderedReviews}
        </tbody>
      </table>
    </div>
  );

};

export default Reviews;