import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { routes } from "./RouteDom";

const Router = () => {
    let index = -1;
    const createRoutes = (routes) => {
        return routes.map((route) => {
            index++;
            return (
                <Route
                    key={index}
                    path={route.path}
                    element={(!route.route) && (route.element)}
                    exact={(route.exact === true) ? "true" : " false"}
                >
                    {(route.route) && createRoutes(route.route)}
                </Route >
            )
        }
        )
    }

    const RouterConfig = (
        <>
            <BrowserRouter>
                <Routes>
                    {createRoutes(routes)}
                </Routes>
            </BrowserRouter>
        </>
    );

    return RouterConfig;
}

export default Router