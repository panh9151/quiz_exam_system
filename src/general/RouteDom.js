import Home from "../pages/Home";
import Register from "../pages/Register";
import Profile from "../pages/Profile";
import Quiz from "../pages/Quiz";
import Result from "../pages/Result";
import NoPage from "../pages/NoPage";

const routes = [
    {
        path: "/",
        route: [
            {
                path: "",
                element: <Home />,
            },
            {
                path: "register",
                element: <Register />,
            },
            {
                path: "profile",
                element: <Profile />,
            },
            {
                path: "quizzes",
                route: [
                    {
                        path: "do",
                        route: [
                            {
                                path: ":id",
                                element: <Quiz />
                            },
                        ]
                    },
                    {
                        path: "result",
                        route: [
                            {
                                path: ":id",
                                element: <Result />
                            },
                        ]
                    },
                ]
            },
            {
                path: "*",
                element: <NoPage />,
            },
        ]
    }
];

export { routes }