import React from "react";
import { Link, withRouter } from "react-router-dom";
import defaultImg from "../images/room-1.jpeg";
import propTypes from "prop-types";

export default function Room({ room: roomProp }) {
  const { name, slug, images, price } = roomProp;
  /* destructuring the roomProp object to create a variable 
  called 'name' set to a value of roomProp.name*/
  return (
    <article className="room">
      <div className="img-container">
        {/*When user hovers, opacity become 0.3 in div
          container*/}
        <img src={images[0] || defaultImg} alt="single room" />
        {/*If there is no image to load at images[0],
        it will load the defaultImg */}
        <>
          <div className="price-top">
            <h6>${price}</h6>
            <p>per night</p>
          </div>
          <Link to={`/rooms/${slug}`} className="btn-primary room-link">
            {/* A string literal. When it is clicked,
          the specific ${slug} is appended to the end so 
          that the path is defined by which link the 
          user picks*/}
            Features
          </Link>
        </>
      </div>
      <p className="room-info">{name}</p>
    </article>
  );
}

Room.propTypes = {
  room: propTypes.shape({
    name: propTypes.string.isRequired,
    slug: propTypes.string.isRequired,
    images: propTypes.arrayOf(propTypes.string).isRequired,
    price: propTypes.number.isRequired
  })
};

/*a function that checks the types of the props
that are passed in. Note, you have to import propTypes
from prop-types */
