import React from 'react'
import './common.css'
import {Header} from './components/header'
import Link from '../navigation/Link'
//import {Link} from 'react-router'
export default class ApplicationLayout extends React.PureComponent {
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
