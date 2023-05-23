import React from "react";
import icon from "../../images/icon-boy.png";
function Navigation() {
  return (
    <div>
      <div className="user-container">
        <img src={icon} alt="" />

        <div className="Text">
          <h2>Menna</h2>
          <p>Your money</p>
        </div>
      </div>

      <ul className="menu-items"></ul>
    </div>
  );
}

export default Navigation;
