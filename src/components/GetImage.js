import React from "react";

const GetImage = (props) => {
    const style = {
        "background": `url('${props.url}') center/${(props.contain) ? "contain" : "cover"} no-repeat`,
        "paddingTop": "70%"
    }
    return <div onClick={props.onClick} className={props.className} style={style}>
    </div>
}

export default GetImage