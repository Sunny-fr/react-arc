import {Loader} from "@/layout/components/loader/Loader.tsx"
import {Toolbar} from "@/layout/components/toolbar/Toolbar.tsx"
import {Toast} from "@/layout/components/toast/Toast.tsx"
import {LargeError} from "@/layout/components/error/LargeError.tsx"
import {type PortfolioProps, withPortfolio} from "../arc/portfolio.arc.ts";
import {Link} from "react-router-dom";
import {Button} from "@/layout/ui/button.tsx";
import {Card, CardContent, CardFooter, CardHeader, CardTitle} from "@/layout/ui/card.tsx";
import {SiteHeader} from "@/components/site-header.tsx";

const PortfolioItemComponent: React.FC<PortfolioProps> = withPortfolio(({model, error, loaded, loading}) => {
  if (error) {
    return (
      <LargeError
        title={error?.response?.status || "Error"}
        children={"...mmm, something wrong happened..."}
      />
    )
  }
  if (!loaded) return <Loader className="min-h-screen" />

  if(!model) {
    return <LargeError title="Not found" children="...mmm, this item does not exist..." />
  }

  const url = `/images/image-${model.id}.jpg`

  return (
    <>
      <SiteHeader title={model.title} />
      {loading ? <Toast>syncing...</Toast> : null}

      <div className="flex flex-1 flex-col">
        <div className="@container/main flex flex-1 flex-col gap-2">
          <Toolbar className="flex justify-between px-4 lg:px-6">
            <div>
              <Link to={"/"}>
                <Button variant="outline">Back</Button>
              </Link>
            </div>
            <div>
              <Link to={"/edit/" + model.id}>
                <Button>Edit</Button>
              </Link>
            </div>
          </Toolbar>

          <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
            <div className="px-4 lg:px-6">
              <Card className="overflow-hidden animate-fadeIn">
                <CardHeader>
                  <CardTitle>{model.title}</CardTitle>
                </CardHeader>
                <div className="relative aspect-video w-full overflow-hidden">
                  <img
                    src={url}
                    alt={model.title}
                    className="object-cover w-full h-full"
                  />
                </div>
                <CardContent className="pt-6">
                  <p className="whitespace-pre-wrap">{model.description}</p>
                </CardContent>
                <CardFooter className="flex justify-end">
                  <Link to={"/edit/" + model.id}>
                    <Button>Edit Item</Button>
                  </Link>
                </CardFooter>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </>
  )
})

export default PortfolioItemComponent
