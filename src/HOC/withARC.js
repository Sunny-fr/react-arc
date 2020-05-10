import React from 'react'
import {useARC} from '../hooks/useARC'


export const withARC = (ARCConfig) => {
    return function Hoc(Wrapped) {
        return function Loader(props) {
            const arc = useARC({ARCConfig, props})
            return <Wrapped {...props} {...arc} />
        }
    }
}

withARC.propTypes = {}
withARC.defaultProps = {}

export default withARC
