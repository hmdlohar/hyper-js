const swal = require("sweetalert");

// utility services
class UtilsService {

  // this method read uploaded file as base64 image URI.
  // It takes uploaded file object as input and return base64URI as promise response.
  readFileAsDataURI(objFile) {
    return new Promise((resolve, reject) => {
      let fr = new FileReader();
      fr.readAsDataURL(objFile);
      fr.onloadend = function (data) {
        resolve(data.target.result);
        return;
      }
      fr.onerror = reject;
    });
  }

  // this method creates HTML image object from base64 URI. and waits for image to be fully loaded
  // It takes uploaded base64 URI as input and return HTML image object as promise response.
  createImageWithDataURI(dataURI) {
    return new Promise((resolve, reject) => {
      let img = new Image();
      img.src = dataURI;
      img.onload = function () {
        resolve(img);
        return;
      }
      img.onerror = reject;
    });
  }

  // this method takes array of object and return random items from that array.
  getRandomElements(aryItems, count) {
    let newAryItems = aryItems.map(item => item);
    if (count >= aryItems.length)
      return newAryItems;

    let aryResult = [];
    for (let index = 0; index < count; index++) {
      let intRand = Math.round(Math.floor(Math.random() * newAryItems.length));
      let item = newAryItems.splice(intRand, 1)[0];
      if (item !== undefined)
        aryResult.push(item);
    }
    return aryResult;
  }

  // change extension of file name with .png
  replaceFileNameWithPNG(fileName) {
    let fileNameParts = fileName.split('.');
    fileNameParts[fileNameParts.length - 1] = 'png';
    return fileNameParts.join('.');
  }

  showLoading(type) {
    if (type === "none")
      return;
    let divId = type === "small" ? "divLoadingSmall" : "divLoading";
    if (document.getElementById(divId)) {
      document.getElementById(divId).style.display = "block";
    }
  }

  hideLoading() {
    if (document.getElementById("divLoading")) {
      document.getElementById("divLoading").style.display = "none";
    }
    if (document.getElementById("divLoadingSmall")) {
      document.getElementById("divLoadingSmall").style.display = "none";
    }
  }
  getDummyArray(number) {
    var dummyAry = [];
    for (let i = 0; i < number; i++) {
      dummyAry.push(i);
    }
    return dummyAry;
  }

  getImageURIFromImageData(imageData, height, width, resultHeight, resultWidth) {
    // console.log("height, width, resultHeight, resultWidth", height, width, resultHeight, resultWidth)
    let canvas = document.createElement("canvas");
    let canvas2 = document.createElement("canvas");
    canvas.setAttribute("height", height);
    canvas.setAttribute("width", width);
    canvas2.setAttribute("height", resultHeight);
    canvas2.setAttribute("width", resultWidth);
    let ctx = canvas.getContext("2d");
    ctx.putImageData(imageData, 0, 0);
    canvas2.getContext("2d").drawImage(canvas, 0, 0, resultWidth, resultHeight);
    let imageURI = canvas2.toDataURL();
    return imageURI;
  }

  lastItem(ary) {
    if (ary.length > 0)
      return ary[ary.length - 1];
    return ary[0];
  }

  showPrompt(bodyText, titleText, buttonText, backcolor, color) {
    swal(bodyText);
  }

  isNumber(text) {
    if (!isNaN(parseInt(text)))
      return true;
    return false;
  }

  deleteFromArrayByValue(array, value) {
    // console.log(array, value)
    if (!array || !array.length)
      return false
    var index = array.indexOf(value)
    if (index >= 0)
      array.splice(index, 1);
    return index >= 0;
  }
}

const utils = new UtilsService();
module.exports = utils;
