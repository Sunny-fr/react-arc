import React, {useEffect} from "react"
import {type PortfolioListProps, withPortfolioList} from "../arc/portfolio-list.arc.ts"

import loadImage from "@/layout/components/image/loadImage.ts"

import {AlbumName} from "../../album/components/AlbumName.tsx"

/** UI ASSETS **/
import {Loader} from "@/layout/components/loader/Loader.tsx"
import {LargeError} from "@/layout/components/error/LargeError.tsx"
import {Link} from "react-router-dom";
import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle} from "@/layout/ui/card.tsx";
import {Button} from "@/layout/ui/button.tsx";
import Toast from "@/layout/components/toast/Toast.tsx";
import type {Portfolio} from "@/components/portfolio/arc/portfolio.arc.ts";


const PortfolioItem = ({model}:{model:Portfolio}) => {

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


  const url = `/images/image-${model.id}.jpg`
  const imageStyle = {
    backgroundImage: `url(${url})`,
  }

  return (
    <Card className="@container/card w-full bg-cover bg-center  animated fadeIn"
          style={imageLoaded ? imageStyle : {}}
    >
      <CardHeader>
        {/*<CardDescription>Total Revenue</CardDescription>*/}
        <CardTitle className="text-shadow-md text-white line-clamp-1">
          {model.title}
        </CardTitle>
        <CardDescription>
          <AlbumName id={model.albumId} />
        </CardDescription>

      </CardHeader>
      <CardContent>
        <div
          className="h-64 w-full bg-cover bg-center "
        >
          {imageLoaded ? null : <Loader className="min-h-[200px]"/>}
        </div>
      </CardContent>
      <CardFooter>
        <Link to={"/view/" + model.id}>
          <Button className="w-full">
          View Details
          </Button>
        </Link>
      </CardFooter>
    </Card>
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
//       {loading ? <Toast>Loading...</Toast> : null}
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
    <div
      className="*:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card dark:*:data-[slot=card]:bg-card grid grid-cols-1 gap-4 px-4 *:data-[slot=card]:bg-gradient-to-t *:data-[slot=card]:shadow-xs lg:px-6 @xl/main:grid-cols-2 @5xl/main:grid-cols-4">



      {loading ? <Toast>Syncing...</Toast> : null}
      {items}
      <Card className="@container/card w-full bg-cover bg-center bg-sky-600 animated fadeIn">
        <CardHeader>
          <CardTitle className=" text-sky-700 line-clamp-1">
            Add New Portfolio Item
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-64 w-full bg-cover bg-center "/>
        </CardContent>
        <CardFooter>
          <Link to={"/create"}>
            <Button className="w-full">
              Create New
            </Button>
          </Link>
        </CardFooter>
      </Card>
    </div>
  )

})


export default PortfolioComponent
