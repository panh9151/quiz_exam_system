import React from "react";
import { Link } from "react-router-dom";

const NoPage = () => {
    return (
        <div className="nopage">
            <div className="mars"></div>
            <img src="https://assets.codepen.io/1538474/404.svg" className="logo-404" />
            <img src="https://assets.codepen.io/1538474/meteor.svg" className="meteor" />
            <p className="title">Oh no!!</p>
            <p className="subtitle">
                You’re either misspelling the URL <br /> or requesting a page that's no longer here.
            </p>
            <div align="center">
                <Link className="btn-back" to="/">Back to main page</Link>
            </div>
            <img src="https://assets.codepen.io/1538474/astronaut.svg" className="astronaut" />
            <img src="https://assets.codepen.io/1538474/spaceship.svg" className="spaceship" />
        </div>
    )
}

export default NoPage;