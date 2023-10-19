import { Link } from "react-router-dom";
import * as Icons from "../general/Images";
import Overlay from "../components/Overlay"
import Sidebar from "../components/Sidebar";
import { createArray } from "../utils/Arrays";
import React, { useEffect, useState } from "react";
import LoginModal from "../components/LoginModal";
import { convertSecondsToString } from "../utils/converts";

const Greeting = (props) => {
    return (
        <h2 className={props.className}>
            {(props.name) ? `Hi ${props.name}, welcome to` : "Welcome to"}
        </h2>
    )
}

const Banner = (props) => {
    let style;
    if (props.type === "word") {
        style = {
            background: `
                url(${require("../assets/images/word.png")}) center/cover no-repeat
            `
        }
    } else if (props.type === "excel") {
        style = {
            background: `
                url(${require("../assets/images/Excel_1.jpg")}) center/cover no-repeat
            `
        }
    } else if (props.type === "powerpoint") {
        style = {
            background: `
                url(${require("../assets/images/powerpoint.jpg")}) center/cover no-repeat
            `
        }
    }

    return <div className="flex-grow-1 br-4 banner" style={style}></div>
}

const Search = (props) => {
    const searchHandle = (item) => {
        props.setSearchQuiz(item)
    }

    const searchHandleLayout = () => {
        if (document.querySelector('.search input').value) {
            document.querySelector('.search>svg').style.opacity = "0";
            document.querySelector('.search input').style.paddingLeft = "2rem";
            document.querySelector('.search .search-submit-btn').style.opacity = "1";
            document.querySelector('.search .search-submit-btn').style.cursor = "pointer";
            searchHandle("")
        } else {
            document.querySelector('.search>svg').style.opacity = "1";
            document.querySelector('.search input').style.paddingLeft = "4.4rem";
            document.querySelector('.search .search-submit-btn').style.opacity = "0";
            document.querySelector('.search .search-submit-btn').style.cursor = "default";
        }
    }

    return (
        <div className="d-flex position-relative justify-content-between w-100 h-auto search">
            <Icons.SearchSVG />
            <input
                className="col-sm-8"
                id="search-input"
                onKeyUp={() => searchHandleLayout()}
                placeholder="Find quiz name..."
            />
            <button
                onClick={() => {
                    searchHandle(document.getElementById("search-input").value);
                }}
                className="search-submit-btn"
            >
                <Icons.SearchSVG />
            </button>
        </div>
    )
}

const Statistic = (props) => {
    // console.log(props);
    return (
        <div className="d-flex flex-column side-content-table">
            <div className="d-flex justify-content-between align-items-center top-line side-content-table__heading">
                <div className="d-flex align-items-center">
                    <Icons.StatisticSVG />
                    <span className="ml-8 fw-500 fs-13 text-primary">Statistic</span>
                </div>
            </div>
            <div className="side-content-table__table">
                <div className="d-flex justify-content-between align-items-center">
                    <div className="item border-unset">Quizzes Taken:</div>
                    <div className="item border-unset">
                        <b>{(props.statisticData.takenQuiz) ? props.statisticData.takenQuiz : 0}</b>
                    </div>
                </div>

                <div className="d-flex justify-content-between align-items-center">
                    <div className="item border-unset">Failed:</div>
                    <div className="item border-unset">
                        <b>{(props.statisticData.failedQuiz) ? props.statisticData.failedQuiz : 0}</b>
                    </div>
                </div>

                <div className="d-flex justify-content-between align-items-center">
                    <div className="item border-unset">Passed:</div>
                    <div className="item border-unset">
                        <b>{(props.statisticData.passedQuiz) ? props.statisticData.passedQuiz : 0}</b>
                    </div>
                </div>

                <div className="d-flex justify-content-between align-items-center">
                    <div className="item border-unset">Total Time:</div>
                    <div className="item border-unset">
                        <b>{(props.statisticData.totalTime) ? props.statisticData.totalTime : 0}</b>
                    </div>
                </div>

                <div className="d-flex justify-content-between align-items-center">
                    <div className="item border-unset">Average Score:</div>
                    <div className="item border-unset">
                        <b>{(props.statisticData.averageScore) ? props.statisticData.averageScore : 0}</b>
                    </div>
                </div>
            </div>
        </div>
    )
}

const Recent = (props) => {
    // console.log(props);
    if (props.data.length === 0) {
        return (
            <div className="d-flex flex-column side-content-table">
                <div className="d-flex justify-content-between align-items-center top-line side-content-table__heading">
                    <div className="d-flex align-items-center">
                        <Icons.HistorySVG />
                        <span className="ml-8 fw-500 fs-13 text-primary">Recently</span>
                    </div>
                </div>
                <div className="d-flex justify-content-center fs-13 fw-400 text-666 pt-2 side-content-table__table">
                    You haven't taken any quizzes yet
                </div>
            </div>
        )
    } else {
        return (
            <div className="d-flex flex-column side-content-table">
                <div className="d-flex justify-content-between align-items-center top-line side-content-table__heading">
                    <div className="d-flex align-items-center">
                        <Icons.HistorySVG />
                        <span className="ml-8 fw-500 fs-13 text-primary">Recently</span>
                    </div>
                    <Link className="fw-500 fs-13 text-primary recent__all-btn">...</Link>
                </div>
                <div className="side-content-table__table">
                    {props.data.map((item) => {
                        return (
                            <div key={item.quizId} className="d-flex justify-content-between align-items-center">
                                <div className="item col name">{item.idQuiz}</div>
                                <div className="item col point">{item.score}</div>
                                <div className="item col detail" to="/"><Link>Detail</Link></div>
                            </div>
                        )
                    })}
                </div>
            </div>
        )
    }
}

const PaneItem = (props) => {
    return (
        <div className="d-inline-flex col-sm-4 pane-content__wrapper-item">
            <button
                onClick={() => props.setOverlay(props.id)}
                className="w-100 pane-content__item"
            >
                <div className="d-flex justify-content-between align-items-center">
                    <div className="d-flex flex-column align-items-start">
                        <div className="title">{props.title}</div>
                        <div>
                            <span className="text-nowrap">{props.questions + " questions"}</span>
                            <span className="text-nowrap">{props.time}</span>
                        </div>
                    </div>
                    <div className="icon">
                        <Icons.RightArrowPaneSVG />
                    </div>
                </div>
            </button>
        </div>
    )
}

const PaginationBtn = (props) => {
    return (
        <button
            onClick={props.onClick}
            className={(props.active)
                ? ("active " + ((props.type) ? (props.type) : ""))
                : ("" + ((props.type) ? (props.type) : ""))
            }
        >{props.label}</button>
    )
}

const PaginationList = (props) => {
    const arr = []
    const page = props.page;
    const currentPage = props.currentPage;
    let add = null;

    if (page > 5) {
        if (currentPage - 2 >= 1) {
            arr.push(currentPage - 2);
            arr.push(currentPage - 1);
            arr.push(currentPage);
        } else if (currentPage - 1 >= 1) {
            arr.push(currentPage - 1);
            arr.push(currentPage);
            add = 0;
        } else if (currentPage >= 1) {
            arr.push(currentPage);
            add = 0;
        }

        if (currentPage + 2 <= page) {
            arr.push(currentPage + 1);
            arr.push(currentPage + 2);
        } else if (currentPage + 1 <= page) {
            arr.push(currentPage + 1);
            add = 1
        } else if (currentPage <= page) {
            add = 1
        }

        if (arr.length < 5) {
            if (add === 0) {
                if (currentPage - 1 >= 1) {
                    arr.push(currentPage + 3);
                } else if (currentPage >= 1) {
                    arr.push(currentPage + 3);
                    arr.push(currentPage + 4);
                }
            }

            if (add === 1) {
                if (currentPage + 1 <= page) {
                    arr.splice(arr, 0, currentPage - 3);
                } else if (currentPage <= page) {
                    arr.splice(arr, 0, currentPage - 3);
                    arr.splice(arr, 0, currentPage - 4);
                }
            }
        }
    } else {
        createArray(page).map((item) => arr.push(item))
    }

    return arr.map((item) => {
        if (item === currentPage) return (<PaginationBtn
            key={item}
            active="true"
            label={item}
        />)
        else return (<PaginationBtn
            onClick={() => { props.setCurrentPage(item) }}
            key={item}
            label={item}
        />)
    })
}

const Pagination = (props) => {
    // console.log(props);
    const page = Number(props.page)
    const currentPage = Number(props.currentPage)
    // console.log(currentPage);

    return (
        <span className={"h-100 pane__pagination "}>
            <span className="h-100 pane__pagination-item">
                {(currentPage - 2 > 1 && (page > 5))
                    ? <PaginationBtn
                        label={<Icons.FirstIcon />}
                        onClick={() => { props.setCurrentPage(1) }}
                    />
                    :
                    <PaginationBtn
                        type="hide"
                        label={<Icons.FirstIcon />}
                    />
                }

                <PaginationList setCurrentPage={props.setCurrentPage} currentPage={currentPage} page={page} />

                {(currentPage + 2 < page && (page > 5))
                    ? <PaginationBtn
                        label={<Icons.LastIcon />}
                        onClick={() => { props.setCurrentPage(page) }}
                    />
                    :
                    <PaginationBtn
                        type="hide"
                        label={<Icons.LastIcon />}
                    />
                }
            </span>
        </span>
    )
}

const PaneFooter = (props) => {
    return (
        <div className="pane__footer">
            {/* <Pagination currentPage={"5"} setCurrentPage={props.setCurrentPage} page={"12"} /> */}
            <Pagination
                page={props.page}
                currentPage={props.currentPage}
                setCurrentPage={props.setCurrentPage}
            />
            <span className="pane__copyright"><Icons.CopyrightIcon /></span>
        </div>
    )
}

const SideContent = (props) => {
    const [nameUser, setNameUser] = useState("");
    useEffect(() => {
        fetch(`http://localhost:8000/users?id=${localStorage.getItem("user")}`)
            .then(res => res.json())
            .then(data => {
                if (localStorage.getItem("user"))
                    setNameUser(data[0].fullname)
                else setNameUser(null)
            })
            .catch(error => console.error('Error fetching data:', error));
    }, [nameUser, props])

    return (
        <div className="col-lg-3 d-flex flex-column h-100vh side-content" >
            <div className="d-flex flex-column side-content__wrapper" >
                <div className="d-flex align-items-center justify-content-between" >
                    <Greeting
                        name={nameUser}
                        className="fs-16 fw-500 text-666 m-unset side-content__greeting"
                    />
                    <Icons.Logo className="side-content__logo" />
                </div>
                <span className="side-content__project-name">Quiz Exam System!</span>
                <span className="fs-14 fw-500 text-999">Prepare for your Exam</span>
            </div>
            <Banner type={props.banner} />
            <Search
                setSearchQuiz={props.setSearchQuiz}
            />
            {localStorage.getItem("user")
                ? <>
                    <Statistic statisticData={props.statisticData} />
                    <Recent data={props.recentData} />
                </>
                : <></>}
        </div>
    )
}


const ContentPane = (props) => {
    const [quizList, setQuizList] = useState([]);
    const [totalQuiz, setTotalQuiz] = useState(1);
    const [currentPage, setCurrentPage] = useState(1);

    useEffect(() => {
        if (localStorage.getItem("quizType")) changeLabelHandle(localStorage.getItem("quizType"))
    }, [])

    useEffect(() => {
        fetch(`http://localhost:8000/quizzes?quiz_type=${props.quizType}`)
            .then(res => res.json())
            .then(data => {
                if (!props.searchQuiz) {
                    setTotalQuiz(data.length);
                    setQuizList(
                        // (n−1)*x+1 => (n−1)*x+x
                        data.slice((currentPage - 1) * 24, (currentPage - 1) * 24 + 24)
                    );
                }
                else {
                    setTotalQuiz(data.filter((item) => item.name.includes(props.searchQuiz)).length);
                    setQuizList(
                        // (n−1)*x+1 => (n−1)*x+x
                        data
                            .filter((item) => item.name.includes(props.searchQuiz))
                            .slice((currentPage - 1) * 24, (currentPage - 1) * 24 + 24)
                    );
                }
            })
            .catch(error => console.error('Error fetching data:', error));
    }, [props.quizType, currentPage, props.searchQuiz])

    const changeLabelContent = (type) => {
        const wordButton = document.querySelector('.pane__tabbed-label--word');
        const excelButton = document.querySelector('.pane__tabbed-label--excel');
        const powerpointButton = document.querySelector('.pane__tabbed-label--powerpoint');

        wordButton.classList.remove('active');
        excelButton.classList.remove('active');
        powerpointButton.classList.remove('active');

        if (type === 'word') {
            wordButton.classList.add('active');
        } else if (type === 'excel') {
            excelButton.classList.add('active');
        } else if (type === 'powerpoint') {
            powerpointButton.classList.add('active');
        } else {
        }
    }

    const changePrimaryColor = (type) => {
        switch (type) {
            case "word":
                document.documentElement.style.setProperty('--primary-color', 'rgba(65, 100, 160)');
                break;
            case "excel":
                document.documentElement.style.setProperty('--primary-color', 'rgba(28, 108, 64)');
                break;
            case "powerpoint":
                document.documentElement.style.setProperty('--primary-color', 'rgba(201, 66, 34)');
                break;
            default:
        }
    }

    const changeLabelHandle = (type) => {
        setCurrentPage(1);
        props.setBanner(type);
        props.setQuizType(type);
        changePrimaryColor(type);
        changeLabelContent(type);
        localStorage.setItem("quizType", type)
    }

    return (
        <div className="col-lg-9">
            <div className="position-relative flex-column h-100vh pane d-flex">
                <div className="d-flex w-100 justify-content-center align-items-end pane__heading">
                    <button onClick={() => changeLabelHandle("word")} className="d-inline-flex justify-content-center align-items-center text-uppercase pane__tabbed-label pane__tabbed-label--word active">
                        <Icons.WordSVG /> <span>Word</span>
                    </button>

                    <button onClick={() => changeLabelHandle("excel")} className="d-inline-flex justify-content-center align-items-center text-uppercase pane__tabbed-label pane__tabbed-label--excel">
                        <Icons.ExcelSVG /> <span>Excel</span>
                    </button>

                    <button onClick={() => changeLabelHandle("powerpoint")} className="d-inline-flex justify-content-center align-items-center text-uppercase pane__tabbed-label pane__tabbed-label--powerpoint">
                        <Icons.PowerpointSVG /> <span>Powerpoint</span>
                    </button>
                </div>

                <div className="flex-1">
                    <div className="d-block col-sm-12 pane-content">
                        {quizList.map((quiz) => {
                            return <PaneItem setOverlay={props.setOverlay} key={quiz.id} title={quiz.name} questions={quiz.questions} time={convertSecondsToString(quiz.time_limit)} id={quiz.id} />
                        })}
                        <PaneFooter currentPage={currentPage} setCurrentPage={setCurrentPage} page={Math.ceil(totalQuiz / 24)} />
                    </div>
                </div>
            </div >
        </div>
    )
}

const Main = () => {
    const [banner, setBanner] = useState("word");
    const [overlay, setOverlay] = useState(null);
    const [recentData, setRecentData] = useState([]);
    const [quizType, setQuizType] = useState("word");
    const [statisticData, setStatisticData] = useState({});
    const [loginModal, setLoginModal] = useState(!!(localStorage.getItem("user")));
    const [searchQuiz, setSearchQuiz] = useState("");
    // localStorage.setItem("user", true)

    useEffect(() => {
        setStatisticData({
            "takenQuiz": null,
            "failedQuiz": null,
            "passedQuiz": null,
            "totalTime": null,
            "averageScore": null
        })

        fetch(`http://localhost:8000/attempt?idUser=${localStorage.getItem("user")}`)
            .then(res => res.json())
            .then(data => {
                setStatisticData({
                    "takenQuiz": data.length,
                    "failedQuiz": data.filter((item) => { return item.isFailed === "true" }).length,
                    "passedQuiz": data.filter((item) => { return item.isFailed === "false" }).length,
                    "totalTime": convertSecondsToString(data.reduce((total, curr) => { return total + Number(curr.usedTime) }, 0)),
                    "averageScore":
                        (isNaN(Number.parseFloat(((data.reduce((total, curr) => { return total + Number(curr.score) }, 0)) / data.length)).toFixed(2)))
                            ? "-"
                            : Number.parseFloat(((data.reduce((total, curr) => { return total + Number(curr.score) }, 0)) / data.length)).toFixed(2)
                })

                if (data.length >= 3) setRecentData(data.slice(-3))
                else setRecentData(data)
            })
            .catch(error => console.error('Error fetching data:', error));
    }, [loginModal])

    return (
        <div className="position-relative w-100vw h-100vh d-flex">
            <Sidebar
                loginModal={loginModal}
                setLoginModal={setLoginModal}
            />
            <div className="w-100 container">
                <div className="row">
                    <SideContent
                        banner={banner}
                        setBanner={setBanner}
                        recentData={recentData}
                        loginModal={loginModal}
                        setRecentData={setRecentData}
                        statisticData={statisticData}
                        setStatisticData={setStatisticData}
                        setSearchQuiz={setSearchQuiz}
                    />
                    <ContentPane
                        setOverlay={setOverlay}
                        quizType={quizType}
                        setQuizType={setQuizType}
                        banner={banner}
                        setBanner={setBanner}
                        searchQuiz={searchQuiz}
                    />
                </div>
            </div>
            {(overlay)
                ? <Overlay
                    overlay={overlay}
                    setOverlay={setOverlay}
                    setLoginModal={setLoginModal}
                />
                : <></>
            }
            {!(loginModal)
                ? <LoginModal
                    loginModal={loginModal}
                    setLoginModal={setLoginModal}
                />
                : <></>
            }
        </div>
    )
}

export default Main;