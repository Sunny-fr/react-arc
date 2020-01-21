import React from 'react'
import PorfolioEditItemComponent from '../components/PorfolioEditItemComponent'

export function PortfolioEditItem (props) {
    return (<PorfolioEditItemComponent id={props.match.params.id} />)
}

export default PortfolioEditItem
