import React from 'react'
import PorfolioEditItemComponent from '../components/PorfolioEditItemComponent'

class Portfolio extends React.Component {
    render() {
        return (<div style={{padding:'20px'}}>
            <PorfolioEditItemComponent id={this.props.params.id} />
        </div>)
    }
}

export default Portfolio
