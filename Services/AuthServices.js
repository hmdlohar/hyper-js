const lsu = require("./LocalStorageUtils")
const utils = require("./Utils");
const $ = 'jquery';

class AuthServices {
    isLogged() {
        let token = lsu.lsGet('token');
        if (!token)
            return false;
        return true;
    }

    logout() {
        this.setToken(null);
    }

    getToken() {
        return lsu.lsGet("token")
    }

    setToken(token) {
        lsu.lsSet("token", token, 300);
    }

    getUserData() {
        let userData = lsu.lsGet("userData");
        if (!userData)
            return null;
        return userData;
    }

    getUserType() {
        let userData = lsu.lsGet("userData");
        if (!userData)
            return null;
        return userData.userType;
    }

    appendToken(url) {
        let token = this.getToken();
        if (token) {
            if (url.includes("?")) {
                url += "&token=" + token;
            }
            else {
                url += "?token=" + token;
            }
        }
    }

    successCallback(data, successCB) {
        utils.hideLoading();
        if (typeof successCB === 'function')
            successCB(data);
        else
            console.log(data);
    }

    errorCallback(err, errCB) {
        utils.hideLoading();
        try {
            var jErr = JSON.parse(err.responseText);
            if (typeof errCB === 'function')
                errCB(jErr);
            else
                console.log(jErr);
        }
        catch (ex) {
            utils.hideLoading();
            console.log(ex);
            alert('Server Encountered Upexpected Problem. ');
        }
    }

    ajaxPost(url, params, success, error, loadingType) {
        let token = lsu.lsGet("token");
        if (token) {
            if (url.includes("?")) {
                url += "&token=" + token;
            }
            else {
                url += "?token=" + token;
            }
        }
        var settings = {
            "async": true,
            "crossDomain": true,
            "url": url,
            "method": "POST",
            "headers": {
                "Content-Type": "application/json"
            },
            "processData": false,
            "data": JSON.stringify(params),
            success: data => {
                this.successCallback(data, success);
            },
            error: err => {
                this.errorCallback(err, error);
            }
        }
        utils.showLoading(loadingType);

        $.ajax(settings);
    }
}
const auth = new AuthServices();
module.export = auth;
