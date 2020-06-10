import React from 'react'
import PropTypes from 'prop-types'
import defaultConfig from '../defaultConfig'
const connector = function (connect, config) {
    const extendedConfig = {...defaultConfig, ...config}
    const namespace = extendedConfig.name
    return connect((store) => {
        // Required Props
        const mapStateToProps = (store) => {
            return {
                tempModel: store[namespace].temp,
                loaded: store[namespace].loaded,
                fetching: store[namespace].fetching,
                error: store[namespace].error,
                collection: store[namespace].collection,
            }
        }
        return Object.assign({}, mapStateToProps(store))
    }, null, null, {
        forwardRef: true
    })
}

const ARCLoader = ({ARCWrappedComponent, ARCConnect, ...props}) => {
    const Component = connector(ARCConnect, props.ARCConfig)(ARCWrappedComponent)
    return <Component {...props} />
}

export function withARC(ARCConfig) {
    return function HOC(Wrapped) {
        return class ConnectLoader extends React.PureComponent {
            static contextTypes = {
                connect: PropTypes.func.isRequired,
            }
            render() {
                return <ARCLoader
                    ARCConfig={ARCConfig}
                    ARCConnect={this.context.connect}
                    ARCWrappedComponent={Wrapped}
                    {...this.props}
                />
            }
        }
    }
}

