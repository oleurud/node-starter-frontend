'use strict'

function getDeviceInfo() {
    return getBrowser() + '|' + getPlatform() + '|' + getResolution() + '|' + getLanguages()
}

function getBrowser() {
    const userAgent = navigator.userAgent.toLowerCase()
    let browser
    if (userAgent.indexOf("firefox") >= 0) {
        browser = "Firefox";
    } else if (userAgent.indexOf("opera") >= 0 || userAgent.indexOf("opr") >= 0) {
        browser = "Opera";
    } else if (userAgent.indexOf("chrome") >= 0) {
        browser = "Chrome";
    } else if (userAgent.indexOf("safari") >= 0) {
        browser = "Safari";
    } else if (userAgent.indexOf("trident") >= 0) {
        browser = "Internet Explorer";
    } else {
        browser = "Other";
    }

    return browser
}

function getPlatform() {
    if (navigator && navigator.platform) {
        return navigator.platform;
    } else {
        return "unknown";
    }
}

function getResolution() {
    if(screen && screen.width && screen.height && screen.colorDepth) {
        return '' + screen.width + screen.height + screen.colorDepth
    } else {
        return "unknown";
    }
}

function getLanguages() {
    if (navigator && navigator.language && navigator.languages) {
        return navigator.language + ',' + navigator.languages.join(',')
    } else {
        return "unknown";
    }
}

export default getDeviceInfo
