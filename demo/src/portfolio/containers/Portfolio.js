import React from 'react'
import PorfolioComponent from '../components/PorfolioComponent'
import {Info} from '../../layout/components/info'

export function Portfolio(props) {
    return (<div>
        <Info>
            <h1>React ARC</h1>
            <p>React arc is a set of abstract components to help you using react &amp; redux</p>
            <p>ARC stands for React Abstract Redux Component</p>

            <h4 style={{marginTop: '20px'}}>TL;DR</h4>
            <p>Less code, more efficiency</p>

            <p style={{marginTop: '30px'}} className="text-center">
                <a href="https://github.com/Sunny-fr/react-arc">Github</a> -  <a href="https://www.npmjs.com/package/react-arc">npm</a></p>
        </Info>
        <PorfolioComponent start={0} limit={20}/>
    </div>)
}

export default Portfolio
