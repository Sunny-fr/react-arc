import {Loader} from "@/layout/components/loader/Loader.tsx"
import {Toast} from "@/layout/components/toast/Toast.tsx"
import {Error} from "@/layout/components/error/Error.tsx"
import {useARC} from "../../../../../src";
import {type Portfolio, portfolio} from "../arc/portfolio.arc.ts";
import {useEffect, useState} from "react";
import {Link, useHistory} from "react-router-dom";
import {SiteHeader} from "@/components/site-header.tsx";
import {Button} from "@/layout/ui/button.tsx";
import {Card, CardContent, CardFooter, CardHeader, CardTitle} from "@/layout/ui/card.tsx";
import {Input} from "@/layout/ui/input.tsx";
import {Textarea} from "@/layout/ui/textarea.tsx";
import {Label} from "@/layout/ui/label.tsx";

interface FormRowProps {
  name: string;
  label: string;
  children: React.ReactNode;
}

function FormRow({name, label, children}: FormRowProps) {
  return (
    <div className="grid gap-2 py-2">
      <Label htmlFor={"input-" + name} className="text-sm font-medium">
        {label}
      </Label>
      <div>{children}</div>
    </div>
  )
}

interface PortfolioEditItemComponentProps {
  id?: string
}

const PortfolioEditItemComponent:React.FC<PortfolioEditItemComponentProps> = ((props) => {
  const history = useHistory()
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

  const [formModel, setFormModel] = useState<Partial<Portfolio>>(model||{})

  useEffect(() => {
    if (loaded && model) {
      setFormModel({
        id: model.id,
        title: model.title || '',
        description: model.description || ''
      })
    }
  }, [loaded]);


  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormModel((prev) => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSave = () => {
    const method = isNew ? "create" : "update"
    arc[method]({
      props,
      params: arc.extractParams(props),
      body: formModel,
    }).then((response) => {
      if (response) {
        history.push("/view/" + response.id)
      } else {
        console.error("Error saving portfolio item")
      }
    })
  }

  if (!loaded) return <Loader className="min-h-screen" />

  return (
    <>
      <SiteHeader title={isNew ? "Create Portfolio Item" : `Edit ${formModel?.title}`} />

      <div className="flex flex-1 flex-col">
        <div className="@container/main flex flex-1 flex-col gap-2">
          <div className="flex justify-between px-4 py-2 lg:px-6">
            <div>
              <Link to={isNew ? "/" : "/view/" + model?.id}>
                <Button variant="outline">Back</Button>
              </Link>
            </div>
          </div>

          {loading ? <Toast>Syncing...</Toast> : null}

          <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
            <div className="px-4 lg:px-6">
              <Card>
                <CardHeader>
                  <CardTitle>
                    {isNew ? "Create Portfolio Item" : `Edit ${formModel?.title}`}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {error && (
                    <Error className="mb-4">
                      Something went wrong. Please try again.
                    </Error>
                  )}

                  <form className="space-y-4">
                    <FormRow name="title" label="Title">
                      <Input
                        id="input-title"
                        className="w-full"
                        name="title"
                        value={formModel?.title || ''}
                        onChange={handleChange}
                      />
                    </FormRow>

                    <FormRow name="description" label="Description">
                      <Textarea
                        id="input-description"
                        rows={8}
                        className="w-full resize-y"
                        name="description"
                        value={formModel?.description || ""}
                        onChange={handleChange}
                      />
                    </FormRow>
                  </form>
                </CardContent>

                <CardFooter className="flex justify-end space-x-2">
                  <Link to={isNew ? "/" : "/view/" + model?.id}>
                    <Button variant="outline">
                      Cancel
                    </Button>
                  </Link>
                  <Button
                    onClick={handleSave}
                  >
                    Save
                  </Button>
                </CardFooter>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </>
  )
})

export default PortfolioEditItemComponent
