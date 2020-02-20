import React, { Component } from "react";
import logo from "../images/logo.svg";
// a single dot means the file is in the current folder. A double dot means you have to go up one level first.
import { FaAlignRight } from "react-icons/fa";
import { Link } from "react-router-dom";

export default class Navbar extends Component {
  state = {
    isOpen: false
  };
  handleToggle = () => {
    this.setState({
      isOpen: this.state.isOpen === false ? true : false
    });
  };
  /* when called, it changes the state of isOpen from true to false
  and visa versa */
  render() {
    return (
      <nav className="navbar">
        <div className="nav-center">
          <div className="nav-header">
            <Link to="/">
              <img src={logo} alt="Beach Resort" />
              {/* upon clicking the logo, the user wll be routed to the home page */}
            </Link>
            <button
              type="button"
              className="nav-btn"
              onClick={this.handleToggle}
            >
              <FaAlignRight className="nav-icon" />
            </button>
          </div>
          <ul
            className={this.state.isOpen === true ? "nav-links" : "hide-links"}
          >
            {/*Based on the isOpen state, the menu will hide or appear */}
            <li>
              <Link to="/">Home</Link>
            </li>
            <Link to="/rooms">Rooms</Link>
          </ul>
        </div>
      </nav>
    );
  }
}
