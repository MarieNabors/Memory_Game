import React from "react";
import './header.css';

const Header = props => (
    <nav className="navbar navbar-default navbar-fixed-top">
        <h1 className="scores">Score: {props.userScore}</h1>
        <h1 className="scores">High Score: {props.highScore}</h1>
    </nav>
  );
  
  export default Header;