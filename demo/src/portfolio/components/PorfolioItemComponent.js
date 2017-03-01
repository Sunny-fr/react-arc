import React  from 'react'
import config from '../config.json'
import {connect} from 'react-redux'
import {Link} from 'react-router'
import {AbstractModelComponent, mixerConnector} from '../../../../lib'
import Loader from '../containers/Loader'
import Toolbar from '../containers/Toolbar'

const shorten = (str) => str.length > 12 ? str.substr(0,12) + '...' : str

class PorfolioItemComponent extends AbstractModelComponent {
    static defaultProps = {
        ARCConfig: config
    }

    render() {
        if (this.gotError()) {
            console.log(this.getMetas('error'))
            return (<div className="alert alert-danger" role="alert">...mmm, something wrong happened...</div>)
        }
        if (!this.isLoaded()) return (<Loader />)

        const model = this.getModel()

        return ( <div>
                <Toolbar>
                    <div className="row">
                        <div className="col-sm-6 col-md-6">
                            <Link to={'/'}><button className="btn btn-default">back</button></Link>
                        </div>
                        <div className="col-sm-6 col-md-6 text-right">
                            <Link to={'/edit/' + model.id + ''}><button className="btn btn-primary pull-right">edit</button></Link>
                        </div>
                    </div>
                </Toolbar>
                <div className="thumbnail sizing paper animated fadeIn">
                    <Link to={'/edit/' + model.id}><img src={model.images[0].path} alt={model.title}/></Link>
                    <div className="caption">
                        <h3>{shorten(model.title)}</h3>
                        <div dangerouslySetInnerHTML={{__html: model.description}} />
                        <p>
                            {model.tags.map(tag=>(<span style={{marginRight:3}} key={tag} className="label label-primary">{tag}</span>))}
                        </p>
                    </div>
                </div>
            </div>)
    }
}

export default mixerConnector(connect, config)(PorfolioItemComponent)
