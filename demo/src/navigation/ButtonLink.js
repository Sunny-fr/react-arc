import React from 'react'
import {navigateTo} from './navigate'

function ButtonLink({to = '/', className = 'btn-float create animated fadeIn', iconClassName = 'glyphicon glyphicon-remove'}) {
    return (
        <button onClick={() => navigateTo(to)}
                type="button"
                className={className}>
            <i className={iconClassName}/>
        </button>
    )
}


export default ButtonLink
