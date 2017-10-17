export function flatten(node, withMetas = false) {
    return Object.keys(node).map(nodeName => withMetas ? node[nodeName] : node[nodeName].model)
}

export function extractParams( props = [], source = {}) {
    return props.reduce((params, prop) => ({
        ...params,
        [prop]: source[prop]
    }), {})
}

export function changedProps (prevProps, nextProps){
    return Object.keys(nextProps).reduce((state, item)=>{
        if (Object.is(prevProps[item], nextProps[item])) return state.concat()
        return state.concat(item)
    },[])
}

export function cleanParams (str) {
    return str.replace(/({[A-z0-9_\-]+})/g, '')
}

export function interpolate(str, params) {
    const keys = Object.keys(params);
    // if no string is given we generate one ( params = {foo:'bar', baz:'wth'} will generate {foo}:{baz})
    // it will provide a unique id for models
    const stringToDecorate = str || keys.map(v => '{' + v + '}').join(':')
    // it will turn path/to/{id} to path/to/123
    const result = keys.reduce((prev, current) => {
        const elm_val = params[current]
        if (Array.isArray(elm_val)) {
            return prev.replace(
                new RegExp('{' + current + '}', 'g'),
                '[' + elm_val.map(item => typeof item === 'object' ?  interpolate(null, item) : item).join('|') + ']'
            )
        }
        return prev.replace(new RegExp('{' + current + '}', 'g'), elm_val)
    }, stringToDecorate )
    // if params are missing we remove them
    // path/to/123/{anotherId} => path/to/123/
    return cleanParams(result)
}