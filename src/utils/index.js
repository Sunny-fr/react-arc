export function flatten(node) {
    return Object.keys(node).map(nodeName => node[nodeName].model)
}

export function extractParams( props = [], source = {}) {
    return props.reduce((params, prop) => ({
        ...params,
        [prop]: source[prop]
    }), {})
}

export function interpolate(str, params) {
    const keys = Object.keys(params);
    return keys.reduce((prev, current) => {
        return prev.replace(new RegExp('{' + current + '}', 'g'), params[current])
    }, str || keys.map(v => '{' + v + '}').join(':'))
}