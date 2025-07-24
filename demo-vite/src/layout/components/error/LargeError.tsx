import React from 'react'

interface LargeErrorProps {
    title: string
    children: React.ReactNode
}

export function LargeError({title, children}: LargeErrorProps): React.ReactElement {
    return (<div className="error large">
        <div className="title">{title}</div>
        <div className="description">{children}</div>
    </div>)
}
export default LargeError