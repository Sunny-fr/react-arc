import React, {Component, Children} from 'react'
import PropTypes from 'prop-types'


class ARCProvider extends Component {
    static propTypes = {
        store: PropTypes.object.isRequired,
    }
    static childContextTypes = {
        store: PropTypes.object.isRequired,
    }

    getChildContext() {
        const {store} = this.props
        return {
            store: store,
        }
    }

    render() {
        return Children.only(this.props.children)
    }
}

export default ARCProvider