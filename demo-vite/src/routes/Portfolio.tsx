import PortfolioComponent from '../components/portfolio/components/PortfolioComponent.tsx'
import {SiteHeader} from "@/components/site-header.tsx";
import {Card, CardContent, CardFooter, CardHeader, CardTitle} from "@/layout/ui/card.tsx";


export function Portfolio() {
  return (<>


    <SiteHeader title="Portfolio"/>
    <div className="flex flex-1 flex-col">
      <div className="@container/main flex flex-1 flex-col gap-2">

        <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
          <div className="px-4 lg:px-6">
            <Card>
              <CardHeader>
                <CardTitle>React ARC</CardTitle>
              </CardHeader>
              <CardContent>

                <p>React arc is a set of abstract components to help you using react &amp; redux</p>
                <p>ARC stands for React Abstract Redux Component</p>

              </CardContent>
              <CardFooter>
                <p style={{marginTop: '30px'}} className="text-center">
                  <a href="https://github.com/Sunny-fr/react-arc">Github</a> - <a
                  href="https://www.npmjs.com/package/react-arc">npm</a></p>
              </CardFooter>
            </Card>
          </div>
        </div>
        <PortfolioComponent hello={'world'} start={0} limit={9}/>


      </div>
    </div>


  </>)
}

export default Portfolio
