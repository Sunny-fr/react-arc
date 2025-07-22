import React from 'react'
import PortfolioItemComponent from '../components/PortfolioItemComponent'

export function PortfolioItem (props) {
    return (<PortfolioItemComponent id={props.match.params.id} />)
}

export default PortfolioItem
