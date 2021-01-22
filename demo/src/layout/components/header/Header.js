import React from "react"
export function Header() {
  return (
    <nav className="header navbar navbar-default navbar-fixed-top">
      <div className="container-fluid">
        <div className="navbar-header">
          <a className="navbar-brand" href={process.env.PUBLIC_URL}>
            React ARC
          </a>
        </div>
      </div>
    </nav>
  )
}

export default Header
