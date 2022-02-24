import React from "react";
import home_icon from "../images/icons/house-solid.svg";
import project_icon from "../images/icons/list-check-solid.svg";

export default function Sidebar() {
    return React.createElement(
        "nav",
        { className: "nav" },
        React.createElement(
            "h2",
            { className: "nav__title" },
            "CompanyProject"
        ),
        React.createElement(
            "a",
            { className: "nav__item" },
            React.createElement("img", { className: "nav__item__icon", src: home_icon, alt: "home-icon" }),
            "Home"
        ),
        React.createElement(
            "a",
            { className: "nav__item" },
            React.createElement("img", { className: "nav__item__icon", src: project_icon, alt: "project-icon" }),
            "Projects"
        )
    );
}