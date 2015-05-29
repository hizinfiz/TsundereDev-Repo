function miniWeather(options) {
    'use strict';
    var cvtc = function (d) {
        return Math.round((Number(d) - 32) * 5 / 9);
    };
    if (options.gps) {
        var url = 'file:///var/mobile/Documents/widgetweather.xml',
            callAjax = function (url) {
                var xmlhttp;
                xmlhttp = new XMLHttpRequest();
                xmlhttp.onreadystatechange = function () {
                    if (xmlhttp.readyState === 4) {
                        var weather = {},
                            wwxml = xmlhttp.responseXML.documentElement,
                            cc = wwxml.getElementsByTagName('currentcondition')[0],
                            d = wwxml.getElementsByTagName('day')[0],
                            date = new Date();
                        weather.city = cc.getElementsByTagName('city')[0].textContent;
                        weather.country = cc.getElementsByTagName('extraLocCountry')[0].textContent;
                        weather.lat = cc.getElementsByTagName('latitude')[0].textContent;
                        weather.long = cc.getElementsByTagName('longitude')[0].textContent;
                        weather.temp = cc.getElementsByTagName('temp')[0].textContent;
                        weather.dew = cc.getElementsByTagName('dewpt')[0].textContent;
                        weather.feelslike = cc.getElementsByTagName('chill')[0].textContent;
                        weather.humid = cc.getElementsByTagName('humidity')[0].textContent;
                        weather.icon = cc.getElementsByTagName('code')[0].textContent;
                        weather.uv = cc.getElementsByTagName('uvindex')[0].textContent;
                        weather.condition = cc.getElementsByTagName('description')[0].textContent;
                        weather.winddir = cc.getElementsByTagName('cardinal')[0].textContent;
                        weather.windspd = cc.getElementsByTagName('speed')[0].textContent;
                        weather.high = (d.getElementsByTagName('high')[0].textContent === '') ? cc.getElementsByTagName('temp')[0].textContent : d.getElementsByTagName('high')[0].textContent;
                        weather.low = d.getElementsByTagName('low')[0].textContent;
                        weather.update = date;
                        options.success(weather);
                        //console.log(cc)
                    }
                };
                xmlhttp.open("GET", url, true);
                xmlhttp.send();
            };
        setTimeout(function () {
            callAjax(url);
        }, 60000 * options.refresh);
        callAjax(url);
    } else {
        var url = 'http://wxdata.weather.com/wxdata/mobile/mobagg/' + options.code + '.js?key=2227ef4c-dfa4-11e0-80d5-0022198344f4&units=' + options.temp + '&locale=' + options.lang,
            callAjax = function (url) {
                var xmlhttp;
                xmlhttp = new XMLHttpRequest();
                xmlhttp.onreadystatechange = function () {
                    if (xmlhttp.readyState === 4) {
                        var weather = {},
                            x = JSON.parse(xmlhttp.responseText)[0],
                            tday = x.HourlyForecasts[0],
                            dday = x.DailyForecasts[0],
                            date = new Date();
                        weather.city = x.Location.city;
                        weather.country = x.Location.country;
                        weather.lat = x.Location.lat;
                        weather.long = x.Location.lng;
                        weather.temp = (options.temp === 'c') ? cvtc(tday.temp) : tday.temp;
                        weather.dew = tday.dew;
                        weather.feelslike = tday.feelsLike;
                        weather.humid = tday.humid;
                        weather.icon = tday.icon;
                        weather.uv = tday.uv;
                        weather.condition = tday.wDesc;
                        weather.winddir = tday.wDirText;
                        weather.windspd = tday.wSpeed;
                        weather.low = (options.temp === 'c') ? cvtc(dday.minTemp) : dday.minTemp;
                        weather.high = (options.temp === 'c') ? cvtc(dday.maxTemp || tday.temp) : dday.maxTemp || tday.temp;
                        weather.update = date;
                        options.success(weather);
                        //console.log(x);
                    }
                };
                xmlhttp.open("GET", url, true);
                xmlhttp.send();
            };
        setTimeout(function () {
            callAjax(url);
        }, 60000 * options.refresh);
        callAjax(url);
    }
}