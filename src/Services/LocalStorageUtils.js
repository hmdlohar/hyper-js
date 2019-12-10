const addMinutes = (date, minutes) => {
  return new Date(date.getTime() + (1000 * 60 * minutes))
}

class LocalstorageutilsService {


  lsGetObject(key) {
    try {
      return JSON.parse(localStorage.getItem(key));
    }
    catch (ex) {
      return new LocalStorageObject(localStorage.getItem(key));
    }
  }

  lsGet(key) {
    try {
      var lsValue = JSON.parse(localStorage.getItem(key));
      if (!lsValue)
        return null;

      var lso = new LocalStorageObject(lsValue.value, lsValue.expireDateTime);
      if (lso.isExpired()) {
        localStorage.removeItem(key);
        return null;
      }

      try {
        return JSON.parse(lso.value);
      }
      catch (ex) {
        return lso.value;
      }
    }
    catch (ex) {
      console.log(ex);
      return localStorage.getItem(key);
    }
  }

  lsSet(key, item, expireDateOrExpireAfterInMinutes = null) {
    var expiryDate = new Date(2100, 0, 1, 0, 0, 0);// By Default It will expire on Year 2100
    if (typeof expireDateOrExpireAfterInMinutes === 'number')
      expiryDate = addMinutes(new Date(), expireDateOrExpireAfterInMinutes);
    else if (typeof expireDateOrExpireAfterInMinutes === 'object')
      expiryDate = expireDateOrExpireAfterInMinutes;
    else if (typeof expireDateOrExpireAfterInMinutes === 'string') {
      try {
        expiryDate = new Date(expireDateOrExpireAfterInMinutes);
      } catch (ex) { }
    }
    var lso = new LocalStorageObject(item, expiryDate);

    localStorage.setItem(key, lso.toObject());
  }

}

class LocalStorageObject {
  // constructor() {
  //   this.value = "";
  //   this.expireDateTime = "";
  // }

  constructor(value, expireDateTime = null) {
    this.setValue(value);
    this.setExpiryDateTime(expireDateTime);
  }

  setValue(value) {
    try {
      this.value = JSON.parse(value);
    }
    catch (ex) {
      this.value = value;
    }
  }

  setExpiryDateTime(expireDateTime) {
    this.expireDateTime = expireDateTime || LocalstorageutilsService.maxExpiryDate;
  }

  isExpired() {
    if (new Date() > new Date(this.expireDateTime))
      return true;
    return false;
  }

  toObject() {
    try {
      return JSON.stringify(this);
    }
    catch (ex) {
      return '';
    }

  }
}
LocalstorageutilsService.maxExpiryDate = new Date(2100, 0, 1, 0, 0, 0);// By Default It will expire on Year 2100

const lsu = new LocalstorageutilsService()
module.exports = lsu;
