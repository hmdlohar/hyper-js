const auth = require("./AuthServices");

// utility services
class ApiService {
    getParts() {
        return new Promise(function (resolve, reject) {
            auth.ajaxPost("", {}, data => {
                resolve(data);
            }, err => {
                reject(err);
            });
        });
    }
    addPart() {
        return new Promise(function (resolve, reject) {
            auth.ajaxPost("", {}, data => {
                resolve(data);
            }, err => {
                reject(err);
            });
        });
    }
}

const api = new ApiService();
module.export = api;
