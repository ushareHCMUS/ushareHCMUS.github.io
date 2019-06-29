function convertTimeNumber(time) {
    return (time.toString().length >= 2 ? time.toString() : '0' + time);
}

export function formatUrlDateString(date) {
    let tempDate = new Date(date);

    let yearStr = convertTimeNumber(tempDate.getUTCFullYear());
    let monthStr = convertTimeNumber(tempDate.getMonth() + 1);
    let dayStr = convertTimeNumber(tempDate.getDate());
    
    return dayStr +  '/' + monthStr + '/' + yearStr;
}

export function getTomorrowDate(date) {
    return new Date(date.getTime() + 24 * 60 * 60 * 1000);
}

export function formatUrlTimeString(time) {
    let tempTime = new Date(time);

    let hourStr = convertTimeNumber(tempTime.getHours());
    let minuteStr = convertTimeNumber(tempTime.getMinutes());

    return hourStr + ':' + minuteStr;
}

export function stringToColor(str){
    let hash = 5381;
    let i = str.length;
    while(i)
        hash = (hash * 33) ^ str.charCodeAt(--i)
    let hashCode = hash >>> 0;
    return '#' + (hashCode * 2 % 256).toString(16) + (hashCode * 3 % 256).toString(16) + (hashCode * 7 % 256).toString(16);
}

export function isEmail(email) {
    const formatEmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return formatEmail.test(email);
}

export function hashCode(str) { 
    var hash = 0;
    for (var i = 0; i < str.length; i++) {
       hash = str.charCodeAt(i) + ((hash << 5) - hash);
    }
    return hash;
} 

export function intToRGB(i){
    var c = (i & 0x00FFFFFF)
        .toString(16)
        .toUpperCase();

    return "00000".substring(0, 6 - c.length) + c;
}