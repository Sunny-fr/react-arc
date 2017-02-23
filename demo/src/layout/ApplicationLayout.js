import React from 'react'
import Header from './Header'
import './styles.css'
export default class ApplicationLayout extends React.Component {
    render() {
        return (<div className="core">
            <Header />
            <div>{this.props.children}</div>
        </div>)
    }
}
