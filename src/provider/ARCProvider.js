import React, {Component, Children} from 'react'
import PropTypes from 'prop-types'


class ARCProvider extends Component {
    static propTypes = {
        store: PropTypes.object.isRequired,
        connect: PropTypes.func.isRequired
    }
    static childContextTypes = {
        store: PropTypes.object.isRequired,
        connect: PropTypes.func.isRequired
    }

    getChildContext() {
        const {store, connect} = this.props
        return {
            store: store,
            connect: connect
        }
    }

    render() {
        return Children.only(this.props.children)
    }
}

export default ARCProvider