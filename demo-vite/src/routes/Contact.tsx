import React from 'react';
import {SiteHeader} from "@/components/site-header.tsx";
import {Card, CardContent, CardFooter, CardHeader, CardTitle} from "@/components/ui/card.tsx";

interface ContactProps {}

const Contact: React.FC<ContactProps> = () => {
    return (
      <>
        <SiteHeader title="Contact" />
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
          </div>
        </div>
      </>
    );
};

export {Contact};
