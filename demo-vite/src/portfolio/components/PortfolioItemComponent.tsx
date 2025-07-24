import {Loader} from "../../layout/components/loader/Loader.tsx"
import {Toolbar} from "../../layout/components/toolbar/Toolbar"
import {Toast} from "../../layout/components/toast/Toast"
import {LargeError} from "../../layout/components/error/LargeError"
import Link from "../../navigation/Link"
import {useARC} from "../../../../src";
import {portfolio} from "../arc/portfolio.arc.ts";

const PortfolioItemComponent: React.FC<{ id: string }> = (props) => {
  const {
    loaded,
    response: model,
    error,
    loading,

  } = useARC({
    ARCConfig: portfolio,
    props
  })

  if (error) {
    return (
      <LargeError
        title={error?.response?.status || "Error"}
        children={"...mmm, something wrong happened..."}
      />
    )
  }
  if (!loaded) return <Loader />

  if(!model) {
    return <LargeError title="Not found" children="...mmm, this item does not exist..." />
  }



  const url = `/images/image-${model.id}.jpg`



  return (
    <div>
      {loading ? <Toast>syncing...</Toast> : null}
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

export default PortfolioItemComponent
