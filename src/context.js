import React, { Component } from "react";
import items from "./data";

/* You can name the data file anything because the data
file was exported as 'default */

const RoomContext = React.createContext();
/* Creates a context that will be available to all children
elements */

export default class RoomProvider extends Component {
  state = {
    rooms: [],
    sortedRooms: [],
    featuredRooms: [],
    loading: true,
    type: "all",
    capacity: 1,
    price: 0,
    minPrice: 0,
    maxPrice: 0,
    minSize: 0,
    maxSize: 0,
    breakfast: false,
    pets: false
    /* the defeault values for each room */
  };

  //getData
  componentDidMount() {
    let rooms = this.formatData(items);
    /*rooms is an array containing all the rooms and the 
    formatted data for each room */
    let featuredRooms = rooms.filter(element => element.featured === true);
    let maxPrice = Math.max(...rooms.map(element => element.price));
    let maxSize = Math.max(...rooms.map(element => element.size));

    this.setState({
      rooms: rooms,
      featuredRooms: featuredRooms,
      sortedRooms: rooms,
      loading: false,
      price: maxPrice,
      maxPrice: maxPrice,
      maxSize: maxSize
    });
  }
  /* if the rendering is based on data that needs to load,
  you should render those components in the componentDidMount()
  which only executes after the component has been mounted. 
  Upon loading, compontDidMount will execute*/

  formatData(array) {
    let tempItems = array.map(element => {
      let identity = element.sys.id;
      let images = element.fields.images.map(image => {
        return image.fields.file.url;
      });
      let room = { ...element.fields, images: images, id: identity };
      return room;
    });
    return tempItems;
  }

  getRoom = slug => {
    let tempRooms = [...this.state.rooms];
    return tempRooms.find(element => element.slug === slug);
  };
  /* getRoom is passed into the context provider*/

  handleChange = event => {
    const target = event.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const changedProperty = event.target.name;
    this.setState(
      {
        [changedProperty]: value
      },
      this.filterRooms
    );
  };
  /* The handleChange function is reseting the state for
  the property that was altered. The property that was
  altered is the [name] and the value will be
  value that was clicked. In addition to reseting the
  state, this.filterRooms is called*/
  filterRooms = () => {
    let {
      rooms,
      type,
      capacity,
      price,
      minSize,
      maxSize,
      breakfast,
      pets
    } = this.state;
    // all the rooms
    let tempRooms = [...rooms];
    // transfrom values from string a string to a number
    capacity = parseInt(capacity);
    /* filter by type: if the user selects any option except 'all', 
  the rooms will be filtered*/
    if (type !== "all") {
      tempRooms = tempRooms.filter(element => element.type === type);
    }
    /* filter by capacity. Since all the rooms can hold at
    least one guest, you're only filtering if the capacity
    has changed to something other than 1*/
    if (capacity !== 1) {
      tempRooms = tempRooms.filter(element => element.capacity >= capacity);
    }
    // filter by price
    tempRooms = tempRooms.filter(element => element.price < price);
    tempRooms = tempRooms.filter(
      element => element.size >= minSize && element.size <= maxSize
    );
    if (breakfast === true) {
      tempRooms = tempRooms.filter(element => element.breakfast === true);
    }
    if (pets === true) {
      tempRooms = tempRooms.filter(element => element.pets === true);
    }
    // change state
    this.setState({
      sortedRooms: tempRooms
    });
  };
  render() {
    return (
      <RoomContext.Provider
        value={{
          ...this.state,
          getRoom: this.getRoom,
          handleChange: this.handleChange
        }}
      >
        {/* passed all the values in the state to the children */}
        {this.props.children}
      </RoomContext.Provider>
    );
    {
      /*You need to render the Provider and encapsulate the 
      children inside the Provider and pass a "value" into 
    the children */
    }
  }
}

const RoomConsumer = RoomContext.Consumer;
/* Creates a consumer component so that functional components
can access the value*/

function withRoomConsumer(Component) {
  return function ConsumerWrapper(props) {
    return (
      <RoomConsumer>
        {value => <Component {...props} context={value} />}
      </RoomConsumer>
    );
  };
}

/* withRoomConsumer is a function that returns a function.
The returned function renders the RoomConsumer using the value
as a function. In addition, the returned function
passes in the context via a variable called 'context.'*/

export { RoomProvider, RoomConsumer, RoomContext, withRoomConsumer };
