import React from "react"
import config from "../portfolio.json"
import { withARC } from 'react-arc'

import { ModelContainer, mixerConnector } from 'react-arc'
import { Loader } from "../../layout/components/loader"
import { Toolbar } from "../../layout/components/toolbar"
import { Toast } from "../../layout/components/toast"
import { LargeError } from "../../layout/components/error"
import Link from "../../navigation/Link.js"

class PortfolioItemComponent extends ModelContainer {
  static defaultProps = {
    ARCConfig: config,
  }

  render() {
    const error = this.getError()

    if (error) {
      return (
        <LargeError
          title={error?.response?.status || "Error"}
          children={"...mmm, something wrong happened..."}
        />
      )
    }
    if (!this.isLoaded()) return <Loader />

    const model = this.getModel()

    const url = `/images/image-${model.id}.jpg`



    return (
      <div>
        {this.isSyncing() ? <Toast>syncing...</Toast> : null}
        <Toolbar>
          <div className="row">
            <div className="col-sm-6 col-md-6">
              <Link to={"/"}>
                <button className="btn btn-default">back</button>
              </Link>
            </div>
            <div className="col-sm-6 col-md-6 text-right">
              <Link to={"/edit/" + model.id + ""}>
                <button className="btn btn-primary pull-right">edit</button>
              </Link>
            </div>
          </div>
        </Toolbar>
        <div className="polaroid detailed sizing animated fadeIn">
          <Link to={"/edit/" + model.id}>
            <img src={url} alt={model.title} />
          </Link>
          <div className="caption">
            <h3>{model.title}</h3>
            <p>{model.description}</p>
          </div>
        </div>
      </div>
    )
  }
}

export default withARC(config)(PortfolioItemComponent)
