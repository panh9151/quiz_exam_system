import React from "react";
import { NavLink } from "react-router-dom";
import { QuizIconSVG, UserSVG, TurnOffSVG } from "../general/Images";
import { googleLogout } from '@react-oauth/google';

const SidebarItem = (props) => {
    return (
        (props.to)
            ? <NavLink
                to={props.to}
                className={(props.active) ? props.className + " active" : props.className}
                onClick={props.onClick}
            >
                {props.icon}
            </NavLink>
            : <span
                className={(props.active) ? props.className + " active" : props.className}
                onClick={props.onClick}
                alt=""
            >
                {props.icon}
            </span>
    )
}

const Sidebar = (props) => {
    const setLoginModal = props.setLoginModal;

    return (
        <>
            <div className="bg-primary d-inline-flex flex-column justify-content-between align-items-center position-fixed sidebar__wrapper sidebar__wrapper--dummy">
                <div className="d-inline-flex flex-column justify-content-between w-100 align-items-center">
                    <SidebarItem
                        to="/"
                        icon={<QuizIconSVG />}
                        active={(props.active === "quiz") ? "active" : ""}
                        className="d-flex justify-content-center align-items-center sidebar__item"
                    />
                    {(localStorage.getItem("user"))
                        ? <SidebarItem
                            to="/profile"
                            icon={<UserSVG />}
                            active={(props.active === "profile") ? "active" : ""}
                            className="d-flex justify-content-center align-items-center sidebar__item"
                        />
                        : <SidebarItem
                            icon={<UserSVG />}
                            onClick={() => {
                                props.setLoginModal(false)
                            }}
                            active={(props.active === "profile") ? "active" : ""}
                            className="d-flex justify-content-center align-items-center sidebar__item"
                        />}
                </div>
                {(localStorage.getItem("user"))
                    ? <SidebarItem
                        icon={<TurnOffSVG />}
                        onClick={() => {
                            localStorage.clear();
                            googleLogout();
                            setLoginModal(localStorage.getItem("user"))
                        }}
                        className="d-flex justify-content-center align-items-center sidebar__item"
                    />
                    : <></>}
            </div>
            <div className="d-inline-flex flex-column justify-content-between align-items-center sidebar__wrapper"></div>
        </>
    )
}

export default Sidebar