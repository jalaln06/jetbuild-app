import React from "react";
import searchIcon from "../images/icons/search-icon.svg";

export default function Header() {
    return React.createElement(
        "div",
        { className: "header" },
        React.createElement(
            "h1",
            { className: "header__location-name" },
            "Project feed"
        ),
        React.createElement("input", { className: "header__input", type: "text", placeholder: "Find a project..." }),
        React.createElement(
            "button",
            { className: "header__button" },
            "Build New Project"
        )
    );
}