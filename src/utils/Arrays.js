import React from "react";

const createArray = (length, start = 1) => {
    let arr = [];
    for (let i = start; i <= length; i++) {
        arr.push(i);
    }
    return arr;
}

export { createArray }