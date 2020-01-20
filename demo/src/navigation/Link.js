import React from 'react'
import {navigateTo} from './navigate'

function Link({to = '/', ...props}) {
    return (
        <a onClick={() => navigateTo(to)} {...props}>

        </a>
    )
}


export default Link
