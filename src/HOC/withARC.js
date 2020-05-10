import React from 'react'
import {useARC} from '../hooks/useARC'

export function withARC(ARCConfig) {
    return function Hoc(Wrapped) {
        return function Loader(props) {
            const arc = useARC({ARCConfig, props})
            return <Wrapped {...props} {...arc} />
        }
    }
}

