/**
 * Config
 */

/**
 * Methods
 * @typedef {object} HttpRestMethodMap
 * @property {string} create="POST"
 * @property {string} update="PUT"
 * @property {string} delete="DELETE"
 * @property {string} read="GET"
 */
/**
 * ARCConfig V1
 * @typedef {object} ARCConfig
 * @property {string} name - Reducer Name
 * @property {string} uppercaseName - Actions Namespace
 * @property {array<string>} modelProps - Required props component for a model type
 * @property {array<string>} collectionProps - Required props component for a collection type
 * @property {{item: string, collection: string}} paths - URL to resources item for a model, collection for collection
 * @property {HttpRestMethodMap} [methods] - Http methods/verbs
 * @property {ArcModel} [defaultModel={}] - default model
 * @property {object} [defaultProps={}] - defaults props passed to a component
 * @property {boolean} [fetchOnce=false] - will fetch the data only one time
 * @property {boolean} [refetchOnError=false] - if fetching data fails when the component is remounted, it will try to fetch again the data
 * @property {object} [headers] - headers added to the fetch request (supports also templating using component's props and {syntax}
 * @property {number} [maxPendingRequestsPerReducer=-1] - max simultaneous requests
 * @property {number} [requestFetchDelay=100] - delay between to request
 * @property {number} [maxTries=1] - number of tries in case of failure
 * @export
 */

exports.unused = {}
