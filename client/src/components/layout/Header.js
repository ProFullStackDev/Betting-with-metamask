import React from "react";
import { useMediaQuery } from "react-responsive";
import "../../styles/header.css";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import { Avatar } from "@material-ui/core";

export default function Header() {
  const navigate = useNavigate();
  const { isLoggedIn, logout } = useAuth();

  let isLaptopOrMobile = useMediaQuery({
    minWidth: 430,
  });

  const handleLogOutClick = () => {
    logout();
    navigate("/");
  };

  const handleLogInClick = () => {
    navigate("/signin");
  };

  return (
    <div className={isLaptopOrMobile ? "header" : "header-mobile"}>
      <div className="logo-img" onClick={() => navigate("/")}></div>
      {isLaptopOrMobile ? (
        <div className="menu">
          {isLoggedIn ? (
            <div className="menu-item" onClick={handleLogOutClick}>
              {" "}
              LogOut{" "}
            </div>
          ) : (
            <div className="menu-item" onClick={handleLogInClick}>
              {" "}
              SignIn{" "}
            </div>
          )}
          <div className="menu-item" onClick={() => navigate("/")}>
            home
          </div>
          <div className="menu-item">faq</div>
          <div className="menu-item">contact</div>
        </div>
      ) : (
        <div>
          <Avatar>
            
          </Avatar>
        </div>
      )}
    </div>
  );
}
