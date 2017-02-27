import React  from 'react'
import config from '../config.json'
import {connect} from 'react-redux'
import {Link, withRouter} from 'react-router'
import {AbstractFormModelComponent, mixerConnector} from '../../../../lib'
import Loader from '../containers/Loader'


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

    onSave = () =>{
        // successful
        const {id} = this.getModel()
        this.props.router.push('/' + (id || ''))
    }

    render() {

        if (!this.isLoaded()) return (<Loader />)

        const model = this.getModel()

        return ( <div className="paper animated fadeIn" style={{padding:20}}>
            <h3>Edit {model.title}</h3>
            {this.gotError() ? <div className="alert alert-danger" role="alert">...mmm, something wrong happened...</div> : null }
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
                        <Link to={'/' + model.id}><button type="submit" className="btn btn-default">Cancel</button></Link>
                        <button type="button" onClick={this.submit} style={{marginLeft: '10px'}}  className="btn btn-primary">Save</button>
                    </div>
                </FormRow>
            </form>
        </div>)
    }
}

const portfolioEditItemWithRouter = withRouter(PorfolioEditItemComponent)

export default mixerConnector(connect, config)(portfolioEditItemWithRouter)
