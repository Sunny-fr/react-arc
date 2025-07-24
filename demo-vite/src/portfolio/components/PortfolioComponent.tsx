import React, {useEffect} from "react"
import {type PortfolioListProps, withPortfolioList} from "../arc/portfolio-list.arc"

import loadImage from "../../layout/components/image/loadImage"

import {AlbumItem} from "../../album/components/AlbumItemComponent"

/** UI ASSETS **/
import {Loader} from "../../layout/components/loader/Loader"
import {Toast} from "../../layout/components/toast/Toast"
import {LargeError} from "../../layout/components/error/LargeError"
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


//
// const PortfolioComponentUsingUseARC = (props:any) => {
//   const {
//     response,
//     error,
//     loaded,
//     loading
//   } = useARC({
//     ARCConfig: portfolioList,
//     props
//   })
//   if (error) return <LargeError title={"!"} children={error} />
//   if (!loaded) return <Loader />
//
//   const items = (response || []).map((model) => {
//     return (
//       <PortfolioItem
//         //remove={this.removeModel}
//         key={model.id} model={model} />
//     )
//   })
//
//   return (
//     <div className="portfolio">
//       <Link to={"/create"} className="btn-float create" />
//       {loading ? <Toast>syncing...</Toast> : null}
//       {items}
//     </div>
//   )
//
// }


interface PortfolioComponentProps extends PortfolioListProps{
  hello?: string
}

const PortfolioComponent:React.FC<PortfolioComponentProps> = withPortfolioList((props) => {

  const {model, error, loaded, loading} = props

  if (error) return <LargeError title={"!"} children={error?.message} />
  if (!loaded) return <Loader />

  const items = (model || []).map((item) => {
    return (
      <PortfolioItem
        //remove={this.removeModel}
        key={item.id} model={item} />
    )
  })

  return (
    <div className="portfolio">
      <Link to={"/create"} className="btn-float create" />
      {loading ? <Toast>syncing...</Toast> : null}
      {items}
    </div>
  )

})



export default PortfolioComponent
