import React  from 'react'
import config from '../config.json'
import {connect} from 'react-redux'
import {Link, hashHistory} from 'react-router'
import {AbstractFormModelComponent, mixerConnector} from '../../../../lib'
import {Loader} from '../../layout/components/loader'
import {Toolbar} from '../../layout/components/toolbar'
import {Toast} from '../../layout/components/toast'
import {Error} from '../../layout/components/error'


function FormRow(props) {
    const {name, children} = props
    return (<div className="form-group">
        <label htmlFor={'input-' + name} className="col-sm-2 control-label">{name}</label>
        <div className="col-sm-10">{children}</div>
    </div>)
}

class PorfolioEditItemComponent extends AbstractFormModelComponent {
    static defaultProps = {
        ARCConfig: config
    }

    onSave = () => {
        // successful
        const {id} = this.getModel()
        hashHistory.push('/view/' + (id || ''))
    }

    render() {

        if (!this.isLoaded()) return (<Loader />)

        const model = this.getModel()
        const isNew = this.isNew()

        return (
            <div>
                <Toolbar>
                    <div className="row">
                        <div className="col-sm-6 col-md-6">
                            <Link to={isNew ? '/' : '/view/' + model.id}>
                                <button className="btn btn-default">back</button>
                            </Link>
                        </div>
                    </div>
                </Toolbar>
                {this.isSyncing() ? <Toast>syncing...</Toast> : null}
                <div className="polaroid detailed sizing animated fadeIn">
                    <div className="card-title">
                        <h3>Edit {model.title}</h3>
                    </div>
                    {this.getError() ? <Error>...mmm, something wrong happened...</Error> : null }
                    <form className="form-horizontal">
                        <FormRow name="title">
                            <input className="form-control" name="title" value={model.title}
                                   onChange={(e) => this.changeProp('title', e.target.value)}/>
                        </FormRow>
                        <FormRow name="description">
                        <textarea rows="10" className="form-control" name="description" value={model.description}
                              onChange={(e) => this.changeProp('description', e.target.value)}/>
                        </FormRow>
                        <FormRow>
                            <div className="text-right">
                                <Link to={'/view/' + model.id}>
                                    <button type="submit" className="btn btn-default">Cancel</button>
                                </Link>
                                <button type="button" onClick={this.save} style={{marginLeft: '10px'}}
                                        className="btn btn-primary">Save
                                </button>
                            </div>
                        </FormRow>
                    </form>
                </div>
            </div>)
    }
}

export default mixerConnector(connect, config)(PorfolioEditItemComponent)
