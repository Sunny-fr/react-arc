import React from 'react'
import PorfolioItemComponent from '../components/PorfolioItemComponent'

export function PortfolioItem (props) {
    return (<PorfolioItemComponent id={props.params.id} />)
}

export default PortfolioItem
