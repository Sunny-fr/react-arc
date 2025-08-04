import {Loader} from "../../layout/components/loader/Loader"
import {Toolbar} from "../../layout/components/toolbar/Toolbar"
import {Toast} from "../../layout/components/toast/Toast"
import {Error} from "../../layout/components/error/Error"
import Link from "../../navigation/Link"
import {navigateTo} from "../../navigation/navigate"
import {useARC} from "../../../../src";
import {type Portfolio, portfolio} from "../arc/portfolio.arc";
import {useState} from "react";

function FormRow(props:any) {
  const { name, children } = props
  return (
    <div className="form-group">
      <label htmlFor={"input-" + name} className="col-sm-2 control-label">
        {name}
      </label>
      <div className="col-sm-10">{children}</div>
    </div>
  )
}

interface PortfolioEditItemComponentProps {
  id?: string
}

const PortfolioEditItemComponent:React.FC<PortfolioEditItemComponentProps> = (props) => {

  const isNew = !props.id || props.id === "new"
  const {
    loaded,
    response: model,
    error,
    loading,
    arc
  } = useARC({
    ARCConfig: portfolio,
    props
  })

  const [formModel, setFormModel] = useState<Partial<Portfolio>>(model || {})

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormModel((prev) => ({
      ...prev,
      [name]: value
    }))
  }
  const handleSave = () => {
    // successful
    const method = isNew ? "create" : "update"
    arc[method]({
      props,
      params:  arc.extractParams(props),
      body: formModel,
    }).then((response) => {
      if (response) {
        navigateTo("/view/" + response.id)
      } else {
        console.error("Error saving portfolio item")
      }
    })

  }



  if (!loaded) return <Loader />



  //const url = `/images/image-${model.id}.jpg`

  return (
    <div>
      <Toolbar>
        <div className="row">
          <div className="col-sm-6 col-md-6">
            <Link to={isNew ? "/" : "/view/" + model?.id}>
              <button className="btn btn-default">back</button>
            </Link>
          </div>
        </div>
      </Toolbar>
      {loading ? <Toast>syncing...</Toast> : null}
      <div className="polaroid detailed sizing animated fadeIn">
        <div className="card-title">
          <h3>Edit {formModel?.title}</h3>
        </div>
        {error ? (
          <Error>...mmm, something wrong happened...</Error>
        ) : null}
        <form className="form-horizontal">
          <FormRow name="title">
            <input
              className="form-control"
              name="title"
              value={formModel?.title || ''}
              onChange={(e) => handleChange(e)}
            />
          </FormRow>
          <FormRow name="description">
              <textarea
                rows={10}
                className="form-control"
                name="description"
                value={formModel?.description || ""}
                onChange={(e) => handleChange(e)}
              />
          </FormRow>
          <FormRow>
            <div className="text-right">
              <Link to={"/view/" + model?.id}>
                <button type="submit" className="btn btn-default">
                  Cancel
                </button>
              </Link>
              <button
                type="button"
                onClick={handleSave}
                style={{ marginLeft: "10px" }}
                className="btn btn-primary"
              >
                Save
              </button>
            </div>
          </FormRow>
        </form>
      </div>
    </div>
  )
}

export default PortfolioEditItemComponent
