import React, { useState } from "react";
import * as Icons from "../general/Images";
import { GoogleLogin } from '@react-oauth/google';
import jwt_decode from "jwt-decode";


const LoginModal = (props) => {
    const [modalType, setModalType] = useState("options");
    const [msg, setMsg] = useState(null);

    const generateAutoId = () => {
        let currentDate = new Date();
        let day = "" + currentDate.getDate();
        let month = "" + currentDate.getMonth() + 1;
        let year = "" + currentDate.getFullYear();
        let hours = "" + currentDate.getHours();
        let minutes = "" + currentDate.getMinutes();
        let seconds = "" + currentDate.getSeconds();

        const dateTime = day + month + year + hours + minutes + seconds
        let randomNumber = Math.floor(Math.random() * (9999 - 1000 + 1) + 1000); // Số ngẫu nhiên từ 1000 đến 9999
        let autoId = dateTime + randomNumber;
        return autoId;
    }

    const getCurrentDateTime = () => {
        let currentDate = new Date();
        let day = currentDate.getDate();
        let month = currentDate.getMonth() + 1;
        let year = currentDate.getFullYear();
        let hours = currentDate.getHours();
        let minutes = currentDate.getMinutes();
        let seconds = currentDate.getSeconds();

        // Pad single digit minutes and seconds with leading zeros
        minutes = minutes < 10 ? '0' + minutes : minutes;
        seconds = seconds < 10 ? '0' + seconds : seconds;

        // Return the formatted date and time
        return month + '/' + day + '/' + year + ' ' + hours + ':' + minutes + ':' + seconds;
    }

    const checkEmailOrPhone = (inputData) => {
        const validateEmail = (email) => { //Validates the email address
            let emailRegex = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
            return emailRegex.test(email);
        }

        const validatePhone = (phone) => { //Validates the phone number
            let phoneRegex = /^(\+91-|\+91|0)?\d{10}$/; // Change this regex based on requirement
            return phoneRegex.test(phone);
        }

        if (validateEmail(inputData)) return true
        else if (validatePhone(inputData)) return true;
        return false;
    }

    const handleEnterPress = (event) => {
        if (event.keyCode === 13) {
            if (modalType === "login") loginHandleSubmit(event)
            else if (modalType === "signup") signupHandleSubmit(event)
        } else if (event.keyCode === 27) {
            props.setLoginModal(!props.loginModal)
        }
    }

    const loginHandleSubmit = (event) => {
        event.preventDefault();
        const emailPhone = document.getElementById("email-phone").value;
        const password = document.getElementById("password").value;
        if (checkEmailOrPhone(emailPhone)) {
            // let user;

            fetch(`http://localhost:8000/users?email=${emailPhone}&password=${password}`)
                .then(res => res.json())
                .then(data => {
                    if (data.length === 1) {
                        localStorage.setItem("user", data[0].id)
                        props.setLoginModal(!props.loginModal)
                    } else {
                        fetch(`http://localhost:8000/users?phone=${emailPhone}&password=${password}`)
                            .then(res => res.json())
                            .then(data => {
                                if (data.length === 1) {
                                    localStorage.setItem("user", data[0].id)
                                    props.setLoginModal(!props.loginModal)
                                    Location.reload()
                                } else {
                                    setMsg("Login Failed")
                                }
                            })
                            .catch(error => console.err)
                    }
                })
                .catch(error => console.err)
        } else {
            setMsg("Please enter the valid form")
        }
    }

    const signupHandleSubmit = (event) => {
        // const padNumber = (number) => {
        //     if (number < 10) {
        //         return '0' + number;
        //     }
        //     return number;
        // }

        event.preventDefault();
        const phone = document.getElementById("phone").value;
        const email = document.getElementById("email").value;
        const pass = document.getElementById("password").value;
        const fullname = document.getElementById("fullname").value;
        // const rePass = document.getElementById("re-password").value;
        const createdDate = getCurrentDateTime();
        const role = 0;

        // let check = true;
        // let failedMsg = "";
        const apiUrl = 'http://localhost:8000/users';
        const postData = {
            "id": generateAutoId(),
            "phone": phone,
            "email": email,
            "password": pass,
            "fullname": fullname,
            "createdDate": createdDate,
            "role": role,
            "address": null
        };

        fetch(apiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(postData)
        })
            .then(response => response.json())
            .then(data => {
                setModalType("signin")
            })
            .catch(error => {
                console.error('Error:', error);
            });
    }

    return (
        <div
            className={(modalType !== "options") ? "overlay overlay--no-effect" : "overlay"}
            onClick={() => { props.setLoginModal(!props.loginModal) }}
        >
            {(modalType === "options")
                ? <div
                    className="col-lg-3 col-md-6 col-sm-12 position-relative login-modal"
                    onClick={(event) => { event.stopPropagation() }}
                >
                    <button type="button"
                        className="login-modal__close"
                        onClick={() => { props.setLoginModal(!props.loginModal) }}
                    >
                        <Icons.CloseSVG />
                    </button>
                    <div className="d-flex flex-column align-items-center">
                        <Icons.Logo className="login-modal__logo" />
                        <span className="login-modal__brand">Quiz Exam System</span>
                    </div>
                    <div className="login-modal__choices">
                        <button type="button"
                            className="login-modal__choice"
                            onClick={() => { setModalType("signin") }}
                        >
                            <Icons.UserSVG />
                            <div className="flex-1 h-100 d-flex justify-content-center align-items-center fs-13 fw-400">
                                Email / Phone number
                            </div>
                        </button>
                        {/* <button
                            type="button"
                            className="login-modal__choice"
                        > */}
                        <GoogleLogin
                            onSuccess={credentialResponse => {
                                let deCode = jwt_decode(credentialResponse.credential)
                                fetch(`http://localhost:8000/users?email=${deCode.email}`)
                                    .then(res => res.json())
                                    .then(data => {
                                        console.log(`http://localhost:8000/users?email=${deCode.email}`);
                                        if (data.length >= 1) {
                                            localStorage.setItem("user", data[0].id)
                                            props.setLoginModal(!props.loginModal)
                                            Location.reload()
                                        }
                                        else {
                                            const apiUrl = 'http://localhost:8000/users';
                                            const id = generateAutoId();
                                            const postData = {
                                                "id": id,
                                                "phone": "",
                                                "email": "",
                                                "password": "",
                                                "fullname": "",
                                                "createdDate": getCurrentDateTime(),
                                                "role": 1,
                                                "address": null
                                            };

                                            fetch(apiUrl, {
                                                method: 'POST',
                                                headers: {
                                                    'Content-Type': 'application/json'
                                                },
                                                body: JSON.stringify(postData)
                                            })
                                                .then(response => response.json())
                                                .then(data => {
                                                    localStorage.setItem("user", id)
                                                    props.setLoginModal(!props.loginModal)
                                                })
                                                .catch(error => {
                                                    console.error('Error:', error);
                                                });
                                        }
                                    })
                                    .catch(error => console.err)
                            }}
                            onError={() => {
                                console.log('Login Failed');
                            }}
                        />;
                        {/* </button> */}
                    </div>
                    <span className="text-999 fw-400 fs-13 d-flex align-items-center justify-content-center text-nowrap">
                        Doesn't have an account?
                        <button type="button"
                            onClick={() => setModalType("signup")}
                            className="login-modal__signup-btn"
                        >
                            Sign up
                        </button>
                    </span>
                    <span className="text-999 fw-400 fs-11 text-center">
                        Continues to use this website means you agree to our
                        <a href="."> terms and services</a>
                    </span>
                </div>
                : (modalType === "signin")
                    ? <form
                        className="col-lg-3 col-md-6 col-sm-12 position-relative login-modal"
                        onClick={(event) => { event.stopPropagation() }}
                        onSubmit={(event) => loginHandleSubmit(event)}
                    >
                        <button type="button"
                            className="login-modal__close"
                            onClick={() => { props.setLoginModal(!props.loginModal) }}
                        >
                            <Icons.CloseSVG />
                        </button>
                        <button type="button"
                            className="login-modal__back"
                            onClick={() => { setModalType("options") }}
                        >
                            <Icons.CollapseIcon />
                        </button>
                        <div className="d-flex flex-column align-items-center">
                            <Icons.Logo className="login-modal__logo" />
                            <span className="login-modal__brand">Quiz Exam System</span>
                        </div>
                        <div className="login-modal__choices">
                            {(msg)
                                ? <div id="login__msg" className="d-flex w-100 justify-content-center">
                                    {msg}
                                </div>
                                : <></>}
                            <div className="d-flex w-100 justify-content-between flex-column">
                                <input
                                    required
                                    id="email-phone"
                                    placeholder="Email / Phone number"
                                    onKeyDown={(event) => handleEnterPress(event)}
                                    className="fs-13 fw-400 text-666 border pe-4 ps-4 pt-3 pb-3 login-modal__input"
                                />
                            </div>
                            <div className="d-flex w-100 justify-content-between flex-column">
                                <input
                                    required
                                    id="password"
                                    type="password"
                                    placeholder="Password"
                                    onKeyDown={(event) => handleEnterPress(event)}
                                    className="fs-13 fw-400 text-666 border pe-4 ps-4 pt-3 pb-3 login-modal__input"
                                />
                            </div>
                            <div className="d-flex w-100 justify-content-start mt-3">
                                <button type="button" className="fs-13 fw-400 text-999 mb-1 border-unset bg-transparent">Forgot password?</button>
                            </div>
                            <button className="fs-14 fw-500 text-fff border pe-4 ps-4 pt-3 pb-3 bg-primary login-modal__input">Sign in</button>
                        </div>
                        <span className="text-999 fw-400 fs-13 d-flex align-items-center justify-content-center text-nowrap">
                            Doesn't have an account?
                            <button type="button"
                                onClick={() => setModalType("signup")}
                                className="login-modal__signup-btn">Sign up</button>
                        </span>
                        <span className="text-999 fw-400 fs-11 text-center">
                            Continues to use this website means you agree to our
                            <a href="."> terms and services</a>
                        </span>
                    </form>
                    : (modalType === "signup")
                        ? <form
                            className="col-lg-3 col-md-6 col-sm-12 position-relative login-modal"
                            onClick={(event) => { event.stopPropagation() }}
                            onSubmit={(event) => signupHandleSubmit(event)}
                        >
                            <button type="button"
                                className="login-modal__close"
                                onClick={() => { props.setLoginModal(!props.loginModal) }}
                            >
                                <Icons.CloseSVG />
                            </button>
                            <button type="button"
                                className="login-modal__back"
                                onClick={() => { setModalType("options") }}
                            >
                                <Icons.CollapseIcon />
                            </button>
                            <div className="d-flex flex-column align-items-center">
                                <Icons.Logo className="login-modal__logo" />
                                <span className="login-modal__brand">Quiz Exam System</span>
                            </div>
                            <div className="login-modal__choices">
                                {(msg)
                                    ? <div id="login__msg" className="d-flex w-100 justify-content-center">
                                        {msg}
                                    </div>
                                    : <></>}
                                <div className="d-flex w-100 justify-content-between flex-column">
                                    <input
                                        required
                                        id="fullname"
                                        placeholder="Fullname"
                                        onKeyDown={(event) => handleEnterPress(event)}
                                        className="fs-13 fw-400 text-666 border pe-4 ps-4 pt-3 pb-3 login-modal__input"
                                    />
                                </div>
                                <div className="d-flex w-100 justify-content-between flex-column">
                                    <input
                                        required
                                        id="email"
                                        type="email"
                                        placeholder="Email"
                                        onKeyDown={(event) => handleEnterPress(event)}
                                        className="fs-13 fw-400 text-666 border pe-4 ps-4 pt-3 pb-3 login-modal__input"
                                    />
                                </div>
                                <div className="d-flex w-100 justify-content-between flex-column">
                                    <input
                                        required
                                        id="phone"
                                        type="number"
                                        placeholder="Phone number"
                                        onKeyDown={(event) => handleEnterPress(event)}
                                        className="fs-13 fw-400 text-666 border pe-4 ps-4 pt-3 pb-3 login-modal__input"
                                    />
                                </div>
                                <div className="d-flex w-100 justify-content-between flex-column">
                                    <input
                                        required
                                        id="password"
                                        type="password"
                                        placeholder="Password"
                                        onKeyDown={(event) => handleEnterPress(event)}
                                        className="fs-13 fw-400 text-666 border pe-4 ps-4 pt-3 pb-3 login-modal__input"
                                    />
                                </div>
                                <div className="d-flex w-100 justify-content-between flex-column">
                                    <input
                                        required
                                        type="password"
                                        id="re-password"
                                        placeholder="Confirm password"
                                        onKeyDown={(event) => handleEnterPress(event)}
                                        className="fs-13 fw-400 text-666 border pe-4 ps-4 pt-3 pb-3 login-modal__input"
                                    />
                                </div>
                                <div className="d-flex w-100 justify-content-start mt-3">
                                    <button
                                        type="button"
                                        onClick={() => setModalType("forgot-password")}
                                        className="fs-13 fw-400 text-999 mb-1 border-unset bg-transparent"
                                    >Forgot password?</button>
                                </div>
                                <button className="fs-14 fw-500 text-fff border pe-4 ps-4 pt-3 pb-3 bg-primary login-modal__input">Sign up</button>
                            </div>
                            <span className="text-999 fw-400 fs-13 d-flex align-items-center justify-content-center text-nowrap">
                                Already have an account?
                                <button type="button"
                                    onClick={() => setModalType("signin")}
                                    className="login-modal__signup-btn">Sign in</button>
                            </span>
                            <span className="text-999 fw-400 fs-11 text-center">
                                Continues to use this website means you agree to our
                                <a href="."> terms and services</a>
                            </span>
                        </form>
                        : <></>
            }

        </div >
    )
}

export default LoginModal