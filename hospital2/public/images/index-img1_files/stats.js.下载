(function () {
//对cookie进行处理的js对象。--start
    ;(function (factory) {
        var registeredInModuleLoader;
        if (typeof define === 'function' && define.amd) {
            define(factory);
            registeredInModuleLoader = true;
        }
        if (typeof exports === 'object') {
            module.exports = factory();
            registeredInModuleLoader = true;
        }
        if (!registeredInModuleLoader) {
            var OldCookies = window.Cookies;
            var api = window.Cookies = factory();
            api.noConflict = function () {
                window.Cookies = OldCookies;
                return api;
            };
        }
    }(function () {
        function extend () {
            var i = 0;
            var result = {};
            for (; i < arguments.length; i++) {
                var attributes = arguments[ i ];
                for (var key in attributes) {
                    result[key] = attributes[key];
                }
            }
            return result;
        }

        function init (converter) {
            function api (key, value, attributes) {
                if (typeof document === 'undefined') {
                    return;
                }

                // Write

                if (arguments.length > 1) {
                    attributes = extend({
                        path: '/'
                    }, api.defaults, attributes);

                    if (typeof attributes.expires === 'number') {
                        attributes.expires = new Date(new Date() * 1 + attributes.expires * 864e+5);
                    }

                    // We're using "expires" because "max-age" is not supported by IE
                    attributes.expires = attributes.expires ? attributes.expires.toUTCString() : '';

                    try {
                        var result = JSON.stringify(value);
                        if (/^[\{\[]/.test(result)) {
                            value = result;
                        }
                    } catch (e) {}

                    value = converter.write ?
                        converter.write(value, key) :
                        encodeURIComponent(String(value))
                            .replace(/%(23|24|26|2B|3A|3C|3E|3D|2F|3F|40|5B|5D|5E|60|7B|7D|7C)/g, decodeURIComponent);

                    key = encodeURIComponent(String(key))
                        .replace(/%(23|24|26|2B|5E|60|7C)/g, decodeURIComponent)
                        .replace(/[\(\)]/g, escape);

                    var stringifiedAttributes = '';
                    for (var attributeName in attributes) {
                        if (!attributes[attributeName]) {
                            continue;
                        }
                        stringifiedAttributes += '; ' + attributeName;
                        if (attributes[attributeName] === true) {
                            continue;
                        }

                        // Considers RFC 6265 section 5.2:
                        // ...
                        // 3.  If the remaining unparsed-attributes contains a %x3B (";")
                        //     character:
                        // Consume the characters of the unparsed-attributes up to,
                        // not including, the first %x3B (";") character.
                        // ...
                        stringifiedAttributes += '=' + attributes[attributeName].split(';')[0];
                    }
                    return (document.cookie = key + '=' + value + stringifiedAttributes);
                }

                // Read

                var jar = {};
                var decode = function (s) {
                    return s.replace(/(%[0-9A-Z]{2})+/g, decodeURIComponent);
                };
                // To prevent the for loop in the first place assign an empty array
                // in case there are no cookies at all.
                var cookies = document.cookie ? document.cookie.split('; ') : [];
                var i = 0;

                for (; i < cookies.length; i++) {
                    var parts = cookies[i].split('=');
                    var cookie = parts.slice(1).join('=');

                    if (!this.json && cookie.charAt(0) === '"') {
                        cookie = cookie.slice(1, -1);
                    }

                    try {
                        var name = decode(parts[0]);
                        cookie = (converter.read || converter)(cookie, name) ||
                            decode(cookie);

                        if (this.json) {
                            try {
                                cookie = JSON.parse(cookie);
                            } catch (e) {}
                        }

                        jar[name] = cookie;

                        if (key === name) {
                            break;
                        }
                    } catch (e) {}
                }

                return key ? jar[key] : jar;
            }

            api.set = api;
            api.get = function (key) {
                return api.call(api, key);
            };
            api.getJSON = function (key) {
                return api.call({
                    json: true
                }, key);
            };
            api.remove = function (key, attributes) {
                api(key, '', extend(attributes, {
                    expires: -1
                }));
            };

            api.defaults = {};

            api.withConverter = init;

            return api;
        }

        return init(function () {});
    }));  //对cookie进行处理的js对象。--end

	var topDomain = document.domain.split('.').slice(-2).join('.');
    var params = {};
    function getProject(){
        var projects = new Array('ibaotu','699pic','58pic','588ku','818ps','90sheji','huke88','ooopic','ibaba88','6tuya','izihun');
        for(var i in projects){
            if(document.domain.indexOf(projects[i])!= -1){
                return projects[i];
            }
        }

        return false;
    }
    //实现新老访客统计
    if (! Cookies.get('FIRSTVISITED')) {
        var timestamp = (new Date()).valueOf() / 1000;
        Cookies.set('FIRSTVISITED', timestamp, {expires: 30,domain:topDomain});
        params.firstvisitedtime = timestamp;
    } else {
        params.firstvisitedtime = Cookies.get('FIRSTVISITED');
    }

    //Document对象数据
    if (document) {
        params.project = getProject() || '-';
        params.url = encodeURI(document.URL) || '-';
        params.referrer = encodeURI(document.referrer) || '-';
    }

    if(params.project == '-'){
        return ;
    }
    //解析_hmq配置

    if (typeof(_hmq) != 'undefined') {
        for(var ii in _hmq) {
            switch(_hmq[ii][0]) {
                case '_uid':
                    if(Boolean(_hmq[ii][1]) && _hmq[ii][1]!='0'){
                        //这里实现 多网站 独立用户统计

                        if (! Cookies.get('ISREQUEST')){
                            Cookies.set('ISREQUEST', 1, {expires: 30,domain:topDomain});
                            params.independent = 1;
                        }
                        params.uid = _hmq[ii][1];
                    }
                    break;
                case '_is_pay':
                    var is_pay = _hmq[ii][1];
                    if(is_pay!= 0 && is_pay!=1){
                        is_pay = 0;
                    }
                    params.params = 'is_pay='+is_pay;
                    break;
                default:
                    break;
            }
        }
    }

    if(!Boolean(params.params)){
        params.params='is_pay=0';
    }

    

    if (!(Boolean(params.uid)||params.uid=='0')) {
        params.uid = 0;
    }
	var newParams ='1';
    if(params.uid != 0 && params.params!= undefined && Cookies.get('WEBPARAMS') != params.params){
        Cookies.set('WEBPARAMS', params.params, {expires: 30,domain:topDomain});
        Cookies.set('ISREQUEST', 1, {expires: 30,domain:topDomain});
		newParams = Cookies.get('WEBPARAMS');
		if(Cookies.get('WEBPARAMS') != params.params){
			Cookies.set('WEBPARAMS', params.params, {expires: -1});
			Cookies.set('ISREQUEST', 1, {expires: -1});
		}
        params.independent = 1;
    }
	
	//添加一个版本号
    var version = '2.4';
    params.params +=';version='+version;
	params.WEBPARAMS = Cookies.get('WEBPARAMS');
	params.newParams = newParams;

    //拼接参数串
    var args = '';
    for(var i in params) {
        if(args != '') {
            args += '&';
        }
        args += i + '=' + params[i];
    }
    var img = new Image(1, 1);
    img.src = 'https://stats.hanmaker.com/notopen.gif?' + args;
})();