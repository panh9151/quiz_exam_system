import React from "react";

const convertSecondsToString = (seconds) => {
    if (seconds === 0) {
        return "0s";
    }

    let hours = Math.floor(seconds / 3600);
    let minutes = Math.floor((seconds % 3600) / 60);
    seconds = seconds % 60;

    let timeString = "";

    if (hours > 0) {
        timeString += hours + "h";
    }

    if (minutes > 0) {
        timeString += minutes + "m";
    } else {
        timeString += "00m";
    }

    if (seconds > 0) {
        timeString += seconds + "s";
    }

    return timeString;
}

export { convertSecondsToString }