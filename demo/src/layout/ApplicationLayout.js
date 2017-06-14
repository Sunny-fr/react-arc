import React from 'react'
import './common.css'
import {Header} from './components/header'
import {Link} from 'react-router'
export default class ApplicationLayout extends React.Component {
    render() {
        return (<div className="core">
            <Header />
            <div className="container">
                {this.props.children}
            </div>
            <p className="text-center"><Link to="contact">contact</Link></p>
        </div>)
    }
}
