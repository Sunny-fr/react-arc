import React from 'react'
import PortfolioEditItemComponent from '../components/PortfolioEditItemComponent'

export function PortfolioEditItem (props) {
    return (<PortfolioEditItemComponent id={props.match.params.id} />)
}

export default PortfolioEditItem
