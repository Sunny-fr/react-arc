import React  from 'react'
import config from '../config.json'
import {connect} from 'react-redux'
import {Link} from 'react-router'
import {AbstractModelComponent, mixerConnector} from '../../../../lib'
import {Loader} from '../../layout/components/loader'
import {Toolbar} from '../../layout/components/toolbar'
import {Toast} from '../../layout/components/toast'
import {LargeError} from '../../layout/components/error'

class PorfolioItemComponent extends AbstractModelComponent {
    static defaultProps = {
        ARCConfig: config
    }

    render() {
        const error = this.getError()
        if (error) {
            return (<LargeError title={error.response.status} children={'...mmm, something wrong happened...'}/>)
        }
        if (!this.isLoaded()) return (<Loader />)

        const model = this.getModel()

        return ( <div>
            {this.isSyncing() ? <Toast>syncing...</Toast> : null}
            <Toolbar>
                <div className="row">
                    <div className="col-sm-6 col-md-6">
                        <Link to={'/'}>
                            <button className="btn btn-default">back</button>
                        </Link>
                    </div>
                    <div className="col-sm-6 col-md-6 text-right">
                        <Link to={'/edit/' + model.id + ''}>
                            <button className="btn btn-primary pull-right">edit</button>
                        </Link>
                    </div>
                </div>
            </Toolbar>
            <div className="polaroid detailed sizing animated fadeIn">
                <Link to={'/edit/' + model.id}>
                    <img src={/*item.thumbnailUrl*/ 'images/image-' + model.id + '.jpg'}
                         alt={model.title}/>
                </Link>
                <div className="caption">
                    <h3>{model.title}</h3>
                    <p>{model.description}</p>
                </div>
            </div>
        </div>)
    }
}

export default mixerConnector(connect, config)(PorfolioItemComponent)
