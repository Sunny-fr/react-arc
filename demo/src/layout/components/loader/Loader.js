import React from 'react'
export function Loader (props){
    return (<div className="loader">{props.children || 'loading'}</div> )
}
export default Loader