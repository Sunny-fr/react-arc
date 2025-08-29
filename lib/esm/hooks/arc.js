import { getParams, initializeConfig, interpolate } from "../utils";
export class ARC {
    config;
    constructor({ ARCConfig }) {
        this.config = ARC.createConfig(ARCConfig);
    }
    static createConfig(ARCConfig) {
        const config = ARC.extendConfig(ARCConfig);
        config.headers = ARC.extendHeaders(config);
        config.methods = ARC.extendMethods(config);
        return config;
    }
    static extendConfig(ARCConfig) {
        return initializeConfig(ARCConfig);
    }
    static extendHeaders(ARCConfig) {
        const headers = ARCConfig.headers || {};
        return { ...headers };
    }
    static extendMethods(extendedConfig) {
        const { methods } = extendedConfig;
        return {
            // @ts-ignore Default methods are already extended
            create: methods.create.toLowerCase(),
            // @ts-ignore Default methods are already extended
            read: methods.read.toLowerCase(),
            // @ts-ignore Default methods are already extended
            update: methods.update.toLowerCase(),
            // @ts-ignore Default methods are already extended
            delete: methods.delete.toLowerCase(),
        };
    }
    hasRequiredParams(props) {
        return this.config.modelProps.every((prop) => {
            return typeof props[prop] !== "undefined";
        });
    }
    extractParams(props) {
        return getParams(this.config, props);
    }
    applyHeaders(headers = {}, props) {
        // MUST BE PROPS !!!
        // OR PARAMS MUST TAKE THE CHARGE OF HAVING SPECIALS PROPS SUCH AS TOKEN/BEARERS
        return Object.keys(headers).reduce((state, header) => {
            return {
                ...state,
                [header]: interpolate(headers[header], props),
            };
        }, {});
    }
    get({ props, params, options }) {
        const p = params || this.extractParams(props);
        return fetch(interpolate(this.config.paths.read || this.config.paths.item, p), {
            method: this.config.methods.read,
            headers: this.applyHeaders(this.config.headers, props),
            signal: options?.signal
        }).then(ARC.json);
    }
    remove({ props, params, }) {
        const p = params || this.extractParams(props);
        return fetch(interpolate(this.config.paths.delete || this.config.paths.item, p), {
            method: this.config.methods.delete,
            headers: this.applyHeaders(this.config.headers, props),
        }).then(ARC.json);
    }
    create({ props, body, params, }) {
        const p = params || this.extractParams(props);
        // WARNING !!
        return fetch(interpolate(this.config.paths.create || this.config.paths.item, p), {
            method: this.config.methods.create,
            headers: this.applyHeaders(this.config.headers, props),
            body: JSON.stringify(body),
        }).then(ARC.json);
    }
    update({ props, body, params, }) {
        const p = params || this.extractParams(props);
        return fetch(interpolate(this.config.paths.update || this.config.paths.item, p), {
            method: this.config.methods.update,
            headers: this.applyHeaders(this.config.headers, props),
            body: JSON.stringify(body),
        }).then(ARC.json);
    }
    static jsonOrText(content) {
        try {
            return JSON.parse(content);
        }
        catch {
            return content;
        }
    }
    static json(response) {
        if (response.ok) {
            return response.text().then((rawResponseBody) => {
                return Promise.resolve(ARC.jsonOrText(rawResponseBody));
            });
        }
        return response.text().then((rawResponseBody) => {
            return Promise.reject({
                content: ARC.jsonOrText(rawResponseBody),
                response,
            });
        });
    }
}
