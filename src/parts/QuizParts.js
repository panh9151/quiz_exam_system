import React, { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar"
import * as Icons from "../general/Images"
import { useParams } from "react-router-dom";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";

const QuestionList = (props) => {
    const [currentPage, setCurrentPage] = useState(localStorage.getItem("currentPage"))
    return (
        <div className="d-flex flex-column flex-1">
            {(props.showHeading)
                ? (<div className="d-flex">
                    <h2 className="fs-14 fw-500 d-inline-flex justify-content-center align-items-center text-primary bg-fff m-unset br-4 head-line col-lg-6 question-list__heading">Theory</h2>
                    {/* <h2 className="d-inline-flex justify-content-center align-items-center m-unset col-lg-6 question-list__heading"></h2> */}
                </div>)
                : <></>}
            <div className="w-100 d-flex justify-content-center question-list__wrapper">
                <ul className="d-flex flex-wrap question-list">
                    {/* <li className="question-list__item question-list__item--checked">
                        <span className="dummy"></span>
                        <button className="d-inline-flex justify-content-center align-items-center element">
                            1
                        </button>
                    </li>
                    <li className="question-list__item question-list__item--active">
                        <span className="dummy"></span>
                        <button className="d-inline-flex justify-content-center align-items-center element">
                            3
                        </button>
                    </li>
                    <li className="question-list__item">
                        <span className="dummy"></span>
                        <button className="d-inline-flex justify-content-center align-items-center element">
                            4
                        </button>
                    </li> */}
                    {props.questionList.map((item, index) => {
                        // console.log(index);
                        if (Number(localStorage.getItem("currentPage")) === index)
                            return <li key={index} className="question-list__item question-list__item--active">
                                <span className="dummy"></span>
                                <button
                                    className="d-inline-flex justify-content-center align-items-center element"
                                    onClick={() => {
                                        localStorage.setItem("currentPage", index);
                                        setCurrentPage(localStorage.getItem("currentPage"))
                                    }}
                                >
                                    {index + 1}
                                </button>
                            </li>
                        else return <li key={index} className="question-list__item">
                            <span className="dummy"></span>
                            <button
                                className="d-inline-flex justify-content-center align-items-center element"
                                onClick={() => {
                                    localStorage.setItem("currentPage", index);
                                    setCurrentPage(localStorage.getItem("currentPage"))
                                }}
                            >
                                {index + 1}
                            </button>
                        </li>
                    })}
                </ul>
            </div>
            <div className="flex-1 bg-fff"></div>
        </div>
    )
}

const SubmitSection = () => {
    return <>
        <div className="mb-3 mt-3 d-flex justify-content-center align-items-center">
            <input
                type="checkbox"
                id="submit-checkbox"
                className="submit-checkbox me-2"
            />
            <label
                htmlFor="submit-checkbox"
                className="fs-13 fw-400 text-999 cursor-pointer"
            >I want to submit this exam</label>
        </div>
        <button className="fw-600 fs-16 me-4 ms-4 br-4 text-fff submit-btn submit-btn--disable">Submit</button>
    </>
}

const ZoomImg = (props) => {
    const closeOverlay = () => {
        props.setImgZoom("");
    }

    return <div
        className="overlay"
        onClick={closeOverlay}
    >
        <div className="zoom-img">
            <img
                onClick={(event) => event.stopPropagation()}
                src={props.url} alt=""
            />
        </div>
    </div >
}

const QuestionInfor = (props) => {
    const [showGuide, setShowGuide] = useState(false);

    return <div className="h-100 question-infor">
        <div className="d-flex flex-column align-items-center justify-content-between h-100 question-infor__wrapper">
            <div>
                <p className="fs-16 fw-500 text-justify question-infor__topic">{props.title}</p>
                <img
                    onClick={() => props.setImgZoom(props.img)} className="question-infor__img" src={props.img} alt="" />
            </div>
            <div>
                <div className="d-flex flex-column justify-content-center align-items-center">
                    {(showGuide)
                        ? <>
                            <button
                                onClick={() =>
                                    setShowGuide(!showGuide)}
                                className="question-infor__btn question-infor__btn--show"
                            >
                                <Icons.BulbSVG />
                            </button>
                            <div className="text-justify fs-14 fw-400 br-4 mb-4 guide">
                                <h3 className="guide__heading ps-4 pt-3 pb-3 pe-4">Guide: </h3>
                                <span className="w-100 pb-4 ps-4 pe-4 text-666 d-block">
                                    {props.help}
                                </span>
                            </div>
                        </>
                        : <button
                            onClick={() => setShowGuide(!showGuide)}
                            className="question-infor__btn"
                        >
                            <Icons.BulbSVG />
                        </button>}
                </div>
            </div>
        </div>
    </div>
}

const ProgressBar = (props) => {
    const [progressBarPercent, setProgressBarPercent] = useState(100);
    const [currentPage, setCurrentPage] = useState(1)

    useEffect(() => {
        let timeBar = props.timeBar;
        props.setTimeBar(timeBar)
        setProgressBarPercent(100 * (1 - ((timeBar) / localStorage.getItem("totalTime"))))
        const interval = setInterval(() => {
            if (timeBar < localStorage.getItem("totalTime")) {
                setProgressBarPercent(100 * (1 - ((timeBar + 1) / localStorage.getItem("totalTime"))))

                props.setTimeBar((prevCount) => {
                    timeBar = prevCount + 1;
                    return timeBar;
                });
            } else clearInterval(interval)
        }, 1000);

        return () => {
            clearInterval(interval);
        };
    }, [props])

    const convertTime = (time) => {
        const hour = Math.floor(time / 3600);
        const minute = Math.floor((time % 3600) / 60);
        const second = time % 60;

        const hourStr = hour < 10 ? "0" + hour : hour;
        const minuteStr = minute < 10 ? "0" + minute : minute;
        const secondStr = second < 10 ? "0" + second : second;

        return hourStr + ":" + minuteStr + ":" + secondStr;
    }

    const progressStyle = {
        "--percent": progressBarPercent + "%"
    }
    console.log(currentPage);

    return <div className="d-flex progress-bar__wrapper align-items-center">
        {/* <button
            onClick={() => {
                localStorage.setItem("currentPage", Number(localStorage.getItem("currentPage")) + 1);
                setCurrentPage(localStorage.getItem("currentPage"))
            }}
            className="progress-bar__btn"><Icons.LongLeftArrow />
        </button> */}
        <div className="flex-1 progress-bar__content">
            <div className="d-flex flex-nowrap">
                <div className="col-sm-6 pe-3">
                    <div className="d-flex flex-column">
                        <div className="d-flex align-item-center justify-content-between pt-3 mt-3">
                            <h4 className="progress-bar__heading"><Icons.TimeIcon />Time Left: </h4>
                            <span className="progress-bar__time-left">{convertTime(localStorage.getItem("totalTime") - props.timeBar)}</span>
                        </div>
                        <div className="progress-bar__time-bar" style={progressStyle}></div>
                    </div>
                </div>
                <div className="col-sm-6 ps-3">
                    <div className="d-flex flex-column">
                        <div className="d-flex align-item-center justify-content-between">
                            <h4 className="progress-bar__heading pt-3 mt-3"><Icons.QuestionIcon />In Progress: </h4>
                            <span className="progress-bar__in-progress"><b>{props.currentQuestion + 1}</b>/{props.questionList.length}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        {/* {
            (currentPage < 1)
                ? <button
                    onClick={() => {
                        localStorage.setItem("currentPage", Number(localStorage.getItem("currentPage")) + 1);
                        setCurrentPage(localStorage.getItem("currentPage"))
                    }}
                    className="progress-bar__btn"
                ><Icons.LongRightArrow /></button>
                : <button
                    className="progress-bar__btn hide"
                ><Icons.LongRightArrow /></button>
        } */}
    </div>
}

const AnswerDetail = (props) => {
    const [labelsState, setLabelsState] = useState(null);
    let i = localStorage.getItem("currentPage");
    let quesId;
    if (props.questionList.length > 0)
        quesId = props.questionList[i].id;
    else quesId = ""
    // console.log(quesId);
    const labelsList = [];

    useEffect(() => {
        props.questionList.map((item) => {
            // console.log(labelsList);
            fetch(`http://localhost:8000/labels?idQuestions=${item.id}`)
                .then(res => res.json())
                .then(data => {
                    // console.log(labelsList);
                    labelsList.push({
                        "initials": {
                            "list": data.map((item) => {
                                return {
                                    "id": item.id,
                                    "label": item.title
                                }
                            })
                        },
                        "user": {
                            "list": []
                        }
                    })
                    setLabelsState(labelsList[i])

                })
                .catch(error => console.error('Error fetching data:', error));
        })
    }, [quesId])
    // console.log(props);

    const onDragEnd = (result) => {
        const { destination, source } = result;

        if (!destination) {
            return;
        }

        if (
            destination.droppableId === source.droppableId &&
            destination.index === source.index
        ) {
            return;
        }

        let add;
        let initial = [...labelsState.initials.list];
        let user = [...labelsState.user.list];
        // Source Logic
        if (source.droppableId === "initial-labels") {
            add = initial[source.index];
            initial.splice(source.index, 1);
        } else {
            add = user[source.index];
            user.splice(source.index, 1);
        }

        // Destination Logic
        if (destination.droppableId === "initial-labels") {
            initial.splice(destination.index, 0, add);
        } else {
            user.splice(destination.index, 0, add);
        }

        const labelsList = {
            "initials": {
                "list": initial
            },
            "user": {
                "list": user
            }
        }

        setLabelsState(labelsList);
    };

    return <DragDropContext
        onDragEnd={onDragEnd}
    >
        <div className="d-flex h-100 justify-content-between">
            <div id="initial-labels" className="labels">
                <h2 className="fs-16 fw-500 text-666">Initial list of labels</h2>
                <div className="flex-1 labels__wrapper">
                    <Droppable droppableId="initial-labels">
                        {(provided) => (
                            <ul {...provided.droppableProps} ref={provided.innerRef} className="w-100">
                                {(labelsState) ? labelsState.initials.list.map((label, index) => (
                                    <Draggable key={label.id} draggableId={label.id} index={index}>
                                        {(provided) => (
                                            <li
                                                ref={provided.innerRef}
                                                {...provided.draggableProps}
                                                {...provided.dragHandleProps}
                                                className="text-666 label"
                                                alt="Logo"
                                            >
                                                {label.label}
                                                <Icons.DragSVG />
                                            </li>
                                        )}
                                    </Draggable>
                                )) : <></>}
                                {provided.placeholder}
                            </ul>
                        )}
                    </Droppable>
                </div>
            </div>
            <div id="user-labels" className="labels">
                <h2 className="fs-16 fw-500 text-666">Your Answer</h2>
                <div className="flex-1 labels__wrapper">
                    <Droppable droppableId="user-labels">
                        {(provided) => (
                            <ul {...provided.droppableProps} ref={provided.innerRef} className="h-100 w-100">
                                {(labelsState) ? labelsState.user.list.map((label, index) => (
                                    <Draggable key={label.id} draggableId={label.id} index={index}>
                                        {(provided) => (
                                            <li
                                                ref={provided.innerRef}
                                                {...provided.draggableProps}
                                                {...provided.dragHandleProps}
                                                className="text-666 label"
                                                alt="Logo"
                                            >
                                                {label.label}
                                                <Icons.DragSVG />
                                            </li>
                                        )}
                                    </Draggable>
                                )) : <></>}
                                {provided.placeholder}
                            </ul>
                        )}
                    </Droppable>
                </div>
            </div>
        </div>
    </DragDropContext >
}

const QuestionAnswer = (props) => {
    localStorage.setItem("timeBar", props.timeBar)
    // console.log(props);

    return <div className="h-100 question-answer">
        <ProgressBar
            timeBar={props.timeBar}
            setTimeBar={props.setTimeBar}
            type={props.type}
            currentQuestion={props.currentQuestion}
            setCurrenQuestion={props.setCurrenQuestion}
            questionList={props.questionList}
        />
        <AnswerDetail
            questionList={props.questionList}
        />
    </div>
}

const SubSidebar = (props) => {
    return <>{(props.show === "hide")
        ? (<div className="position-relative question-subside__shadow question-subside__shadow--hide">
            <div className="col-lg-12 d-flex flex-column question-subside">
                <QuestionList
                    currentQuestion={props.currentQuestion}
                    setCurrenQuestion={props.setCurrenQuestion}
                    questionList={props.questionList}
                />
                {/* <SubmitSection /> */}
            </div>
            <button
                onClick={() => props.setShowSidebar(null)}
                className="collapse-btn"
            >
                <Icons.CollapseIcon />
            </button>
        </div>)
        : (<div className="position-relative question-subside__shadow">
            <div className="col-lg-12 d-flex flex-column question-subside">
                <h1 className="fs-16 fw-500 text-333 question-subside__heading">{props.quizTitle}</h1>
                <QuestionList
                    showHeading="true"
                    currentQuestion={props.currentQuestion}
                    setCurrenQuestion={props.setCurrenQuestion}
                    questionList={props.questionList}
                />
                <SubmitSection />
            </div>
            <button
                onClick={() => props.setShowSidebar("hide")}
                className="collapse-btn"
            >
                <Icons.CollapseIcon />
            </button>
        </div>)
    }</>
}

const QuestionDetail = (props) => {
    return <div className="flex-1 d-flex">
        <QuestionInfor
            setImgZoom={props.setImgZoom}
            img={props.img}
            title={props.title}
            help={props.help}
        />
        <QuestionAnswer
            type={props.type}
            timeBar={props.timeBar}
            setTimeBar={props.setTimeBar}
            currentQuestion={props.currentQuestion}
            setCurrenQuestion={props.setCurrenQuestion}
            questionList={props.questionList}
        />
    </div>
}

const Main = () => {
    const idQuiz = useParams("").id;
    const [timeBar, setTimeBar] = useState(0);
    const [imgZoom, setImgZoom] = useState("");
    const [showSidebar, setShowSidebar] = useState("");
    let arr = [];
    const [questionList, setQuestionList] = useState(arr);
    const [quizTitle, setQuizTitle] = useState("");
    const [currentQuestion, setCurrenQuestion] = useState(0);
    const [questionImg, setQuestionImg] = useState("")
    const [questionTitle, setQuestionTitle] = useState("")
    const [questionHelp, setQuestionHelp] = useState("")

    useEffect(() => {
        localStorage.setItem("currentPage", 0)
        fetch(`http://localhost:8000/questions?idQuiz=${idQuiz}`)
            .then(res => res.json())
            .then(data => {
                setQuestionList(data);
            })
            .catch(error => console.error('Error fetching data:', error));

        fetch(`http://localhost:8000/quizzes?id=${idQuiz}`)
            .then(res => res.json())
            .then(data => {
                localStorage.setItem("totalTime", data[0].time_limit)
                setQuizTitle(data[0].name)
            })
            .catch(error => console.error('Error fetching data:', error));

        // 
    }, [idQuiz])
    fetch(`http://localhost:8000/questions?idQuiz=${idQuiz}`)
        .then(res => res.json())
        .then(data => {
            setQuestionHelp(data[Number(localStorage.getItem("currentPage"))].help)
            setQuestionImg(data[Number(localStorage.getItem("currentPage"))].image)
            setQuestionTitle(data[Number(localStorage.getItem("currentPage"))].title)
        })
        .catch(error => console.error('Error fetching data:', error));

    // console.log(questionList);

    return (
        <div className="position-relative w-100vw h-100vh d-flex">
            <Sidebar active="quiz" />
            <div className="d-flex flex-1">
                <SubSidebar
                    show={showSidebar}
                    setShowSidebar={setShowSidebar}
                    quizTitle={quizTitle}
                    currentQuestion={currentQuestion}
                    setCurrenQuestion={setCurrenQuestion}
                    questionList={(questionList) ? questionList : ""}
                />
                {questionList
                    ? <QuestionDetail
                        timeBar={timeBar}
                        type={showSidebar}
                        setTimeBar={setTimeBar}
                        setImgZoom={setImgZoom}
                        img={questionImg}
                        title={questionTitle}
                        help={questionHelp}
                        currentQuestion={currentQuestion}
                        setCurrenQuestion={setCurrenQuestion}
                        questionList={(questionList) ? questionList : ""}
                    />
                    : <></>}
            </div>
            {(imgZoom)
                ? <ZoomImg
                    setImgZoom={setImgZoom}
                    url={imgZoom}
                />
                : <></>}
        </div>
    )
}

export default Main;