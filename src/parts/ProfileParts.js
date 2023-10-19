import React from "react";
import Sidebar from "../components/Sidebar";
import * as Icons from "../general/Images"

const Main = () => {
    const ProfileField = (props) => {
        if (props.type === "form") {
            return <form className="d-flex flex-column align-items-start justify-content-center ">
                <h3
                    className="profile__h3"
                >
                    {props.heading + ": "}</h3>
                <div className="d-flex w-100">
                    <input
                        id={props.idInput}
                        name={props.nameInput}
                        className="flex-1 profile__input"
                    />
                    {(props.btn)
                        ? <button className="profile__chang-btn">Change</button>
                        : <></>}
                </div>
            </form>
        }
    }

    return <div className="d-flex">
        <Sidebar />
        <div className="flex-1 profile">
            <div className="w-100 row">
                <div className="col-lg-3">
                    <div className="d-flex justify-content-start flex-column profile-sidebar-left">
                        <h1 className="profile__h1">Settings</h1>
                        <span className="profile-sidebar-left__item active">Profile settings</span>
                        <span className="profile-sidebar-left__item">Sign in & Security</span>
                    </div>
                </div>
                <div className="col-lg-6">
                    <div className="profile-sidebar-content">
                        <h2 className="profile__h2">PROFILE</h2>
                        <ProfileField
                            btn
                            type="form"
                            heading="Fullname"
                            idInput="fullname"
                            nameInput="fullname"
                        />
                        <ProfileField
                            type="form"
                            heading="Email"
                            idInput="email"
                            nameInput="email"
                        />
                        <ProfileField
                            btn
                            type="form"
                            heading="Address"
                            idInput="address"
                            nameInput="address"
                        />
                        <ProfileField
                            type="form"
                            heading="Phone"
                            idInput="phone"
                            nameInput="phone"
                        />
                    </div>
                </div>
                <div className="col-lg-3">
                    <div className="profile-sidebar-right">
                        <img alt="" src="https://res.cloudinary.com/dmiaubxsm/image/upload/v1695394299/bg-2_y2sist.png" />
                        <button className="profile__avatar-edit"><Icons.Camera /> Change</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
}

export default Main;