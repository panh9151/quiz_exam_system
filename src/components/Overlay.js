import GetImage from "./GetImage";
import { Link } from "react-router-dom";
import * as Icons from "../general/Images"
import React, { useState, useEffect } from "react";
import { convertSecondsToString } from "../utils/converts";

const Overlay = (props) => {
    let [quizInfor, setQuizInfor] = useState({});
    useEffect(() => {
        fetch(`http://localhost:8000/quizzes?id=${props.overlay}`)
            .then(
                res => res.json()
            )
            .then(
                data => { setQuizInfor(data[0]); }
            )
            .catch(
                error => console.error('Error fetching data:', error)
            );
    }, [props])
    // console.log(quizInfor);

    return (
        <div
            className="overlay"
            onClick={() => props.setOverlay(null)}
        >
            <div
                className="col-sm-12 modal__box"
                onClick={(even) => even.stopPropagation()}
            >
                <div className="position-relative d-flex align-items-center justify-content-between modal__heading">
                    <span className="fw-500 fs-16 text-fff">Quiz Exam System</span>
                    <button
                        onClick={() => props.setOverlay(null)}
                        className="position-absolute modal__close-btn"
                    ><Icons.CloseSVG /></button>
                </div>
                <div className="d-flex flex-column modal__wrapper">
                    <div className="d-flex mb-3">
                        <div className="col-lg-6">
                            <GetImage
                                className="w-100 br-4"
                                url={quizInfor.image}
                            />
                        </div>

                        <div className="col-lg-6">
                            <div className="h-100 d-flex flex-column align-items-start justify-content-center">
                                <h2 className="fw-500 fs-18 text-333">{quizInfor.name}</h2>
                                <span className="fw-400 fs-12 text-999 mb-2">
                                    Created by: {quizInfor.director}
                                </span>
                                <span className="modal__infor-item">
                                    Taken Quizzes:
                                    <b className="ms-1">
                                        {quizInfor.limit_attempt}/{quizInfor.limit_attempt}
                                    </b>
                                </span>

                                <div className="w-100 d-flex justify-content-between align-items-center">
                                    <span className="modal__infor-item">
                                        Time:
                                        <b className="ms-1">
                                            {convertSecondsToString(quizInfor.time_limit)}
                                        </b>
                                    </span>
                                    <span className="modal__infor-item">
                                        Type:
                                        <b className="ms-1">{quizInfor.quiz_type}
                                        </b>
                                    </span>
                                </div>

                                <div className="w-100 d-flex justify-content-between align-items-center mb-3">
                                    <span className="modal__infor-item">
                                        Questions:
                                        <b className="ms-1">{quizInfor.questions}</b>
                                    </span>
                                    <span className="modal__infor-item">
                                        Passed Score:
                                        <b className="ms-1">{quizInfor.score_to_pass}</b>
                                    </span>
                                </div>

                                {
                                    (!!localStorage.getItem("user")
                                        ? <Link
                                            to={`/quizzes/do/${props.overlay}`}
                                            className="mt-3 w-100 br-10 modal__btn"
                                        >
                                            Do quiz
                                            <Icons.RightArrowModalSVG />
                                        </Link>
                                        : <span
                                            className="mt-3 w-100 br-10 modal__btn"
                                            onClick={() => {
                                                props.setOverlay(null)
                                                props.setLoginModal(false)
                                            }}
                                        >
                                            Do quiz
                                            <Icons.RightArrowModalSVG />
                                        </span>)
                                }
                            </div>
                        </div>
                    </div>

                    <h2 className="fw-500 fs-16 text-333 ps-3 mt-3 mb-3">
                        Description:
                    </h2>

                    <p className="ps-3 pe-3 fs-14 fw-400 text-666 text-justify">
                        {quizInfor.description}
                    </p>

                    {(quizInfor.results)
                        ? (quizInfor.results.map((result, index) => {
                            return <div key={index}>
                                <h2 className="fw-500 fs-16 text-333 ps-3 mt-3">
                                    Your result:
                                </h2>

                                <div className="d-flex justify-content-between align-items-end ps-3 pe-3 modal__result">
                                    <div className="result__wrapper">
                                        <span className="result__item">{result.time}</span>
                                        <span className="point"></span>
                                        <span className="result__item">{result.date}</span>
                                    </div>
                                    <div className="d-flex align-items-end">
                                        <span className="result__item">{result.used_time}</span>
                                        <span className="text-green fs-16 fw-500 result__item">{result.score}</span>
                                        <span className="result__item">
                                            <Link to={"quizzes/result/" + result.id}>Detail</Link>
                                        </span>
                                    </div>
                                </div>
                            </div>
                        }
                        ))
                        : <></>
                    }
                </div>
            </div>
        </div>
    )
}

export default Overlay