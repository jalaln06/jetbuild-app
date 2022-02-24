import React from "react";

export default function ProjectPreview(props) {
    var name = props.name,
        location = props.location,
        postalCode = props.postalCode,
        last_update_time = props.last_update_time,
        photos_number = props.photos_number,
        users = props.users,
        photos = props.photos;

    return React.createElement(
        "div",
        { className: "project-preview" },
        React.createElement(
            "div",
            { className: "project-preview__description" },
            React.createElement(
                "h3",
                { className: "project-preview__name" },
                name
            ),
            React.createElement(
                "h4",
                { className: "project-preview__location" },
                location,
                " ",
                postalCode
            ),
            React.createElement(
                "p",
                { className: "project-preview__last-update-time" },
                " Last Updated ",
                last_update_time
            )
        ),
        React.createElement(
            "div",
            { className: "project-preview__photo-count" },
            React.createElement(
                "h4",
                { className: "project-preview__title" },
                "Photos"
            ),
            React.createElement(
                "h3",
                null,
                photos_number
            )
        ),
        React.createElement(
            "div",
            { className: "project-preview__recent-users" },
            React.createElement(
                "h4",
                { className: "project-preview__title" },
                "Recent Users"
            ),
            React.createElement(
                "h3",
                null,
                users
            )
        ),
        React.createElement(
            "div",
            { className: "project-preview__photos" },
            React.createElement(
                "p",
                null,
                "No photos has been added to this project yet."
            )
        )
    );
}