import React, { Component } from "react";
import defaultBcg from "../images/room-1.jpeg";
import Hero from "../components/Hero";
import Banner from "../components/Banner";
import { RoomContext } from "../context";
import { Link } from "react-router-dom";
import StyledHero from "../components/StyledHero";

export default class SingleRoom extends Component {
  constructor(props) {
    super(props);
    this.state = {
      slug: this.props.match.params.slug,
      /* each time the user clicks on a room, the slug gets a value. 
      The slug will be set at this  value in the state*/
      defaultBcg: defaultBcg
    };
  }
  static contextType = RoomContext;
  componentDidMount() {}
  render() {
    const { getRoom } = this.context;
    const room = getRoom(this.state.slug);
    /* getRoom is a function passed in through
    the context.js. Using the slug to identify the necessary
    room, the getRoom function creates an object that contains
    the properties, images, and id of that slug*/
    console.log(room);
    if (room === undefined) {
      return (
        <div className="error">
          <h3>no such room could be found</h3>
          <Link to="/rooms" className="btn-primary">
            back to rooms
          </Link>
        </div>
      );
    }
    const {
      name,
      description,
      capacity,
      size,
      price,
      extras,
      breakfast,
      pets,
      images
    } = room;
    /* destructure the room object defined above.*/
    const [mainImg, ...defaultImg] = images;
    /* destructuring the array of images
    in the images variable. The first image in the 
    images array will be set the variable mainImg
    The remaining images in the images variable
    will be set the the variable defaultImg. Note,
    the spread operator captures, "the rest" of the
    images in the array*/

    return (
      <>
        <StyledHero img={images[0] || this.state.defaultBcg}>
          {/* We need the Hero component to be styled
        Passing in the image as a prop */}
          <Banner title={`${name} room`}>
            <Link to="/rooms" className="btn-primary">
              back to rooms
            </Link>
          </Banner>
        </StyledHero>
        <section className="single-room">
          <div className="single-room-images">
            {defaultImg.map((element, index) => {
              return <img key={index} src={element} alt={name} />;
            })}
            {/*renders all the images related to
            that slug. This excludes the main image
            defined above */}
          </div>
          <div className="single-room-info">
            <article className="desc">
              <h3>details</h3>
              <p>{description}</p>
            </article>
            <article className="info">
              <h3>info</h3>
              <h6>price : ${price}</h6>
              <h6>size : {size} square feet</h6>
              <h6>
                max capacity :
                {capacity > 1 ? `${capacity} people` : `${capacity} person `}
              </h6>
              <h6>{pets === true ? "pets allowed" : "no pets allowed"}</h6>
              <h6>{breakfast && "free breakfast included"}</h6>
              {/*if breakfast === true, render 'free breakfast
              included. Otherwise, nothing is rendered */}
            </article>
          </div>
        </section>
        <section className="room-extras">
          <h3>Extras</h3>
          <ul className="extras">
            {extras.map((element, index) => {
              return <li key={index}>- {element}</li>;
            })}
          </ul>{" "}
        </section>
      </>
    );
  }
}
