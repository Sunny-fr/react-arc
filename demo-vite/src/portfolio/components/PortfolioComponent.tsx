import React, {Component, useEffect} from "react"
import config from "../portfolio-list.json"
import { ModelContainer, withARC, withUseARC}  from 'react-arc'
import loadImage from "../../layout/components/image/loadImage.js"

import { AlbumItem } from "../../album/components/AlbumItemComponent"

/** UI ASSETS **/
import { Loader } from "../../layout/components/loader"
import { Toast } from "../../layout/components/toast"
import { LargeError } from "../../layout/components/error"
import Link from "../../navigation/Link.js"

const PortfolioItem = ({model, remove}:any) => {

  const [imageLoaded, setImageLoaded] = React.useState(false)

  useEffect(()=> {
    loadImage(`images/image-${model.id}.jpg`)
      .then(() => {
        setImageLoaded(true)
      })
      .catch((e) => {
        console.error(e)
      })
  })

  const className = "polaroid animated fadeIn"

  // Alternative
  // if we want to provide any visual feedback while we're deleting
  // const className = "polaroid animated fadeIn" +  (this.props.fetching ? ' disabled': '')

  const url = `/images/image-${model.id}.jpg`
  const imageStyle = {
    backgroundImage: `url(${url})`,
  }

  return (
    <div className={className}>
      <Link to={"/view/" + model.id}>
        <div
          className="image-canvas"
          style={imageLoaded ? imageStyle : {}}
        >
          {imageLoaded ? null : <Loader />}
        </div>
      </Link>
      <div className="caption">
        <h3>{model.title}</h3>
        <button
          onClick={() => {
            remove(model)
          }}
          type="button"
          className="btn btn-remove animated fadeIn"
        >
          <i className="bi bi-x-square" style={{fontSize: '40px'}} />

        </button>
        <AlbumItem id={model.albumId} />
      </div>
    </div>
  )

}



class PorfolioComponent extends ModelContainer {
  static defaultProps = {
    ARCConfig: config,
    start: 0,
    limit: 20,
  }

  render() {
    const error = this.getError()
    if (error) return <LargeError title={"!"} children={error.message} />
    if (!this.isLoaded()) return <Loader />

    const items = (this.getModel() || []).map((model) => {
      return (
        <PortfolioItem remove={this.removeModel} key={model.id} model={model} />
      )
    })

    return (
      <div className="portfolio">
        <Link to={"/create"} className="btn-float create" />
        {this.isSyncing() ? <Toast>syncing...</Toast> : null}
        {items}
      </div>
    )
  }
}

export default withARC(config)(PorfolioComponent)
