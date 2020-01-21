import React from 'react'
import PortfolioItemComponent from '../components/PorfolioItemComponent'

export function PortfolioItem (props) {
    return (<PortfolioItemComponent id={props.match.params.id} />)
}

export default PortfolioItem
