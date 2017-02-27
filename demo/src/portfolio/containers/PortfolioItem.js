import React from 'react'
import PorfolioItemComponent from '../components/PorfolioItemComponent'

class Portfolio extends React.Component {
    render() {
        return (<div style={{padding:'20px'}}>
            <PorfolioItemComponent id={this.props.params.id} />
        </div>)
    }
}

export default Portfolio
