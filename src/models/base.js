import config from '../config';
require('expose?$!expose?jQuery!jquery');
const $ = jQuery;

class BaseModel {
    constructor(options) {
        let baseOptions = { model: 'base', relations: [] };
        options = (typeof options !== 'object') ? baseOptions : options;

        for(var k in options) {
            this.set(k, options[k]);
        }

        this.config = config;
        this.url = '//' + config.API.host + ':' + config.API.port + '/' +
                    config.API.version + '/' + this.model;
        this.configured = false;
        this.buildRelations();
        this.configureAjax();
    }

    baseCall(url, method, filter) {
        var promise = new Promise((resolve, reject) => {
            var object = {
                url: url,
                dataType: 'json',
                type: method
            };

            if (method === 'GET' && filter) {
                if(!$.isEmptyObject(filter) && filter && filter.filter) {
                    object.data = "filter="+ JSON.stringify(filter.filter);
                }
            } else if(filter) {
                object.data = filter;
            }

            $.ajax(object).done(resolve).fail(reject);
        });

        return promise;
    }

    set(key, value) {
        this[key] = value;
    }

    get(key) {
        return this[key];
    }

    buildRelations() {
        const self = this;
        this.relations.forEach((relation) => {
            this.buildGetRelation(relation, self);
            this.buildCreateRelation(relation, self);
        });
    }

    buildGetRelation(relation, self) {
        BaseModel.prototype[relation] = function(id, filter) {
            return self.baseCall(self.url + '/' + id + '/' + relation, 'GET',
            filter);
        };
    }

    buildCreateRelation(relation, self) {
        BaseModel.prototype['create_' + relation] = function(id, filter) {
            return self.baseCall(self.url + '/' + id + '/' + relation, 'POST',
            filter);
        }
    }

    configureAjax() {
        if(localStorage.getItem('token')) {
            this.configured = true;
            window.isLogged = true;
            $.ajaxSetup({
                beforeSend: function beforeSend(xhr) {
                    xhr.setRequestHeader('Authorization',
                    window.localStorage.getItem('token'));
                }
            });
        } else {
            window.isLogged = false;
            this.configured = false;
            $.ajaxSetup({
                beforeSend: function() {}
            });
        }
    }

    find(filter) {
        return this.baseCall(this.url, 'GET', filter);
    }

    findOne(filter) {
        return this.baseCall(this.url + '/findOne', 'GET', filter);
    }

    findById(id, filter) {
        return this.baseCall(this.url + '/' + id, 'GET', filter);
    }

    create(filter) {
        return this.baseCall(this.url, 'POST', filter);
    }

    delete(id) {
        return this.baseCall(this.url + '/' + id, 'DELETE', {});
    }

    update(id, filter) {
        return this.baseCall(this.url + '/' + id, 'PUT', filter);
    }
}

export default BaseModel;
