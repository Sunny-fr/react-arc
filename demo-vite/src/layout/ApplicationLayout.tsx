import React, {type PropsWithChildren} from 'react'
import './common.css'
import Header from './components/header/Header'
import Link from '../navigation/Link'
//import {Link} from 'react-router'
const ApplicationLayout:React.FC<PropsWithChildren> = ({children}) => {
    return (<div className="app">
        <Header />
        <div className="container" style={{margin: '0 auto'}}>
            {children}
        </div>
        <p className="text-center"><Link to="contact">contact</Link></p>
    </div>)
}
export  default  ApplicationLayout
