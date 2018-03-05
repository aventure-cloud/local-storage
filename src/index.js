"use strict";

class LocalStorage {

    constructor(config) {
        this.config(config);
    }

    /**
     * Merge user config with default config
     *
     * @param config
     */
    config(config){
        this.config =  Object.assign({
            prefix: 'app_',
        }, config);
    }

    prefix(){
        return this.config.prefix;
    }

    /**
     * Build a complete storage key using prefix
     *
     * @param key
     * @returns {*}
     * @private
     */
    _composeKey(key) {
        return this.prefix() + key;
    }

    /**
     * Check if exists a key in the storage
     *
     * @param key
     * @returns {string | null}
     */
    has(key) {
        return window.localStorage.getItem(this._composeKey(key));
    }

    /**
     * Retrieve a value from storage
     *
     * @param key
     * @returns {*}
     */
    get(key) {
        try {
            //Verifico se sia un oggetto
            let value = JSON.parse(window.localStorage.getItem(this._composeKey(key)));
            if (value === null)
                return false;

            return value;

        } catch (e) { // Otherwise simple string
            if (window.localStorage.getItem(this._composeKey(key)))
                return window.localStorage.getItem(this._composeKey(key));
            return false;
        }
    }

    /**
     * Retrieve all storage content under prefix
     *
     * @returns {Array}
     */
    all() {
        let result = [];
        for (let key in window.localStorage) {
            if (key.indexOf(this.prefix()) !== -1) {
                result[key] = window.localStorage[key];
            }
        }
        return result;
    }

    /**
     * Get all storage's keys
     *
     * @returns {Array}
     */
    getAllKeys() {
        let result = [];
        for (let key in window.localStorage) {
            if (this.prefix() === '') {
                result.push(key);
            } else if (key.indexOf(this.prefix()) !== -1) {
                result.push(key);
            }
        }
        return result;
    }

    /**
     * Add a new value or update if key just exists
     *
     * @param key
     * @param value
     * @returns {WebStorage}
     */
    set(key, value) {
        if (typeof value === "object" || Array.isArray(value))
            window.localStorage.setItem(this._composeKey(key), JSON.stringify(value));
        else
            window.localStorage.setItem(this._composeKey(key), value);
        return this;
    }

    /**
     * Remove an item from storage
     *
     * @param key
     * @returns {LocalStorage}
     */
    remove(key) {
        let keys = Array.isArray(key) ? key : [key];

        for (let i = 0; i < keys.length; i++) {
            window.localStorage.removeItem(this._composeKey(keys[i]));
        }

        return this;
    }

    /**
     * Remove all storage content under prefix
     */
    clean() {
        this.remove(this.getAllKeys());
    }
}

export default LocalStorage;