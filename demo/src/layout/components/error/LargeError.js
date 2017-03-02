import React from 'react'
export function LargeError(props) {
    return (<div className="error large">
        <div className="title">{props.title}</div>
        <div className="description">{props.children}</div>
    </div>)
}
export default LargeError