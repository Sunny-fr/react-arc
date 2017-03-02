import React from 'react'
import './common.css'
import {Header} from './components/header'
export default class ApplicationLayout extends React.Component {
    render() {
        return (<div className="core">
            <Header />
            <div className="container">
                {this.props.children}
            </div>
        </div>)
    }
}
