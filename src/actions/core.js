

import {extractParams, interpolate} from '../utils'

const core = {
    hasRequiredParams(ARCConfig, props) {
        const result = ARCConfig.modelProps.reduce((valid, prop) => (valid === true && typeof props[prop] !== 'undefined' ? valid : false)
            , true)
        //if (!result) console.log('missing required params', ARCConfig.modelProps, props)
        return result
    },
    isNew (ARCConfig, props)  {
        return !this.getKey(ARCConfig, props)
    },
    getKey (ARCConfig, props) {
        const params = this.getParams(ARCConfig, props)
        return !params ? null : interpolate(null, params)
    },
    getParams(ARCConfig, props) {
        if (!this.hasRequiredParams(ARCConfig, props)) return null
        return extractParams(ARCConfig.modelProps, props)
    },
    getMetas(ARCConfig, prop, props){
        if (!this._getModel(ARCConfig, props)) return null
        return prop ? this._getModel(ARCConfig, props).metas[prop] : this._getModel(ARCConfig, props).metas
    },
    _getMetaModel(ARCConfig, props){
       return this.isNew(ARCConfig, props) ? props.tempModel : props.collection[this.getKey(ARCConfig, props)]
    },
    _getModel(ARCConfig, props){
        //TO BE RENAMED
       return this.isNew(ARCConfig, props) ? props.tempModel : props.collection[this.getKey(ARCConfig, props)]
    },
    getModel(ARCConfig, props){
        const metaModel = this._getModel(ARCConfig, props)
        if (!metaModel) {
            return null
        }
        return metaModel.model
    },
    getError(ARCConfig, props) {
        return this.getMetas(ARCConfig, 'error', props)
    },
    isSyncing(ARCConfig, props) {
        return this.getMetas(ARCConfig, 'fetching', props)
    },
    isLoaded(ARCConfig, props) {
        if (this.isNew(ARCConfig, props)) return true
        return !(!this._getModel(ARCConfig, props) || !this.getMetas(ARCConfig, 'loaded', props))
    },
    allowReFetch(ARCConfig, props) {
        return !(ARCConfig.fetchOnce && this.isLoaded(ARCConfig, props))
    },
    errorReFetch(ARCConfig, props) {
        //canReFetchOnerror
        if (ARCConfig.refetchOnError === true && !this.isSyncing(ARCConfig, props) && !this.isLoaded(ARCConfig, props) && !!this.getError(ARCConfig, props)) return true
        return !this.getError(ARCConfig, props)
    },

    /** COLLECTIONS **/
    getCollectionError(ARCConfig, props) {
        const {error} = props
        return error
    },
    isCollectionLoaded(ARCConfig, props) {
        const {loaded} = props
        return loaded
    },
    isCollectionSyncing(ARCConfig, props) {
        const {fetching} = props
        return fetching
    },
    allowCollectionReFetch(ARCConfig, props) {
        return !(ARCConfig.fetchOnce && this.isCollectionLoaded(ARCConfig, props))
    }
}

export default core