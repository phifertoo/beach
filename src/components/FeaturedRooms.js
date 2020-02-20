import React, { Component } from "react";
import { RoomContext } from "../context";
//importing the data from context.js
import Loading from "./Loading";
import Room from "./Room";
import Title from "./Title";

export default class FeaturedRooms extends Component {
  static contextType = RoomContext;
  render() {
    let { loading: loading, featuredRooms: rooms } = this.context;
    {
      /* this.context retrieves the values that were passed in
      to all the children. This destructuring will retrieve
      the loading property and featuredRooms property. This 
      expression will create a variable called 'loading' and
      set it to the this.context.loading. It will also create 
      a variable called rooms and set it to this.context.loading*/
    }
    let renderedRooms = rooms.map(element => {
      return <Room key={element.id} room={element} />;
    });
    /* rendering individual rooms. Passing in a key and room data*/
    return (
      <section className="featured-rooms">
        <Title title="featured rooms" />
        <div className="featured-rooms-center">
          {loading === true ? <Loading /> : renderedRooms}
          {/*rooms renders all of the <Room/>'s */}
        </div>
      </section>
    );
  }
}
/* static contextType is a variable not accessible by the
 future instances.  */
