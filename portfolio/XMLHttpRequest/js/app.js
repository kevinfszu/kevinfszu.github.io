/**
 * 主要是为了学习原生 XMLHttpRequest 对象，加深对其了解。
 * 自定义一个 ajax 函数，简单模拟 jQuery 的 ajax 方法
 */
function myAjax(url) {
    // 使用 XMLHttpRequest() 构造函数创建一个新的 XMLHttpRequest 对象。IE5 和 IE6 中没有原生的 XMLHttpRequest 对象，它们的 XMLHttpRequest 对象是通过 MSXML 库中俄 ActiveXObject 对象实现的，所以为了支持这两个版本的浏览器需要做一些额外的兼容工作，但由于这两个版本的浏览器实在太老了，就放弃它们吧，不浪费字节数了。
    var xhr = new XMLHttpRequest();

    /**
     * [readystatechange 事件 的 事件处理函数]
     * xhr.readyState 属性发生变化时，会触发  readystatechange 事件，该事件的事件处理函数为 onreadystatechange。
     * - 为了确保跨浏览器兼容性，必须在调用 open() 之前先定义好 onreadystatechange 函数。（这是《JavaScript高级程序设计》一书说的，不知道是为了照顾具体哪些版本的浏览器的兼容性，但我看 jQuery 的 ajax 模块源码中并没有这样做）
     * - 请在 onreadystatechange 函数内部使用实际的 XHR 对象实例变量 xhr；如果使用 this 对象，在个别浏览器中会导致函数执行失败或发生错误。（jQuery 的 ajax 模块源码确实也是这样做了）
     * @return {[type]} [description]
     */
    xhr.onreadystatechange = function() {

        /**
         * [XHR 对象的 readyState 属性，表示请求/响应过程中的当前活动阶段]
         * 可能的取值：
         * - UNSENT(数值 0)，未初始化，尚未调用 open() 方法；
         * - OPENED(数值 1)，启动，已调用 open()，但尚未调用 send()；
         * - HEADERS_RECEIVED(数值 2)，发送，已调用 send()，但尚未接收到响应；
         * - LOADING(数值 3)，接收，已接受到部分相应数据；
         * - DONE(数值 4)，完成，已接受到全部相应数据，而且已经可以在客户端使用了；
         */

        // 这是在 WHATWG 规范中示例代码中的写法
        // if (xhr.readyState === xhr.DONE) {
        // 或者网上更常见的写法（jQuery 的 ajax 模块源码也是这种写法）
        if (xhr.readyState === 4) {

            /**
             * 接收到响应之后，响应的数据会自动填充到 XHR 对象的以下属性：
             * - status：响应的 HTTP 状态；具体请看：https://developer.mozilla.org/en-US/docs/Web/HTTP/Status；
             * -- 1xx ：信息展示
             * -- 2xx ：成功
             * -- 3xx ：重定向
             * -- 4xx : 客户端错误
             * -- 5xx ：服务器端错误
             * - statusText：HTTP 状态的说明；
             * - responseText：作为响应的主体而被返回的文本；（无论响应的内容类型是什么，响应主题的内容都会保存到这个属性中）
             * - responseXML：如果响应的内容类型是"text/xml"或"application/xml"，这个属性中将保存包含着响应数据的 XML DOM 文档；否则（非 XML 数据），为 null；
             * @type {[type]}
             */
            if (xhr.status >= 200 && xhr.status < 300 || xhr.status == 304) {
                alert(xhr.responseText);
            } else {
                alert('Request was unsuccessful: ' + xhr.status);
            }
        }

        // 另外，在接收到响应之前（需要根据xhr.readyState 属性判断）调用 abort() 方法，可以取消异步请求（鉴于同步请求的特性，这个方法不适用于同步请求）
        // xhr.abort();

        /**
         * 在接收到响应之后：
         * - 可以用 getResponseHeader() 方法获取指定的头部信息；
         * - 也可以用 getAllResponseHeaders() 方法获取一个包含所有头部信息的长字符串；
         */
        // var MyHeader = xhr.getResponseHeader('MyHeader');
        // var allHeaders = xhr.getAllResponseHeaders();

    };

    /**
     * 定义一个函数，用于向现有的 URL 的末尾添加查询字符串
     * - 添加分隔符
     * - 对参数的名称和值进行编码
     */
    function addURLParam(url, name, value) {
        url += (url.indexOf('?') == -1 ? '?' : '&');
        url += encodeURIComponent(name) + '=' + encodeURIComponent(value);
        return url;
    }

    var url = 'example.php';

    url = addURLParam(url, 'my-name', 'my-value');

    /**
     * 初始化请求。
     * open() 接收三个参数：请求类型、URL、是否异步发送请求（布尔值）。
     * - 请求类型：GET、POST 等；
     * -- GET 类型的请求最常用于向服务器查询某些信息，可将查询字符串追加到 URL 末尾，发送请求时用 send(null)；适用 GET 类型请求，经常会发生的一个错误就是查询字符串格式错误；查询字符串中的每一个参数的名称和值分别都必须用 encodeURIComponent() 进行编码，才能放到 URL 末尾，并且各个参数之间都必须用 & 连接；
     * -- POST 类型的请求通常用于向服务器发送应该被保存的数据，此类请求应该将数据作为 POST 请求的主体来提交，即 send(数据)；
     * - URL：可以是相对于执行代码的当前页面的相对路径，也可以是绝对路径；需要遵守同源策略（协议://域名:端口）；
     * - 是否异步发送请求：若请求是同步的，则 JavaScript 代码会等到服务器响应之后才继续执行；若请求是异步的，则 JavaScript 代码不会等待响应，而是直接继续执行；
     */
    xhr.open('GET', url, true);

    /**
     * 用于设置 自定义的 HTTP 头部信息。
     * 接收两个参数：头部字段的名称及其对应的值。
     * - 为了成功发送自定义的 HTTP 头部信息，必须在 open() 方法之后、send() 方法之前调用 setRequestHeader() 方法。
     */
    setRequestHeader('MyHeader', 'MyValue');

    /**
     * send() 方法必须接收一个参数：要么是作为请求主体而发送的数据，要么是 null。
     * 默认情况下，在发送 XHR 请求的同时，还会发送一下 HTTP 头部信息：
     * - Accept：浏览器能够处理的内容类型；
     * - Accept-Charset：浏览器能够显示的字符集；
     * - Accept-Encoding：浏览器能够处理的压缩编码；
     * - Accept-Language：浏览器当前设置的语言；
     * - Connection：浏览器与服务器之间连接的类型；
     * - Cookie：当前页面设置的任何 Cookie；
     * - Host：发出请求的页面所在的域；
     * - Referer发出请求的页面的 URI；
     * - User-Agent：浏览器的用户代理字符串；
     */
    xhr.send(null);


    // 服务器对待 POST 请求和 HTML 表单提交的请求是不一样的。但可以用 XHR 来模仿 HTML 表单提交：将 Content-Type 头部信息设置为 application/x-www-form-urlencoded，也就是 HTML 表单提交时的内容类型。POST 请求如果不设置 Content-Type，那么它发送给服务器的数据就不会出现在 $_POST 超级全局变量中，而是只会出现在 $HTTP_RAW_POST_DATA 中。
    // POST 要求的数据格式与查询字符串相同，但与 HTML 表单提交的数据格式不相同，所以表单提交的数据需要经过序列化（调用 serialize()）才能转换为 POST 所要求的数据格式。

    var form = document.getElementById('form-1');

    xhr.open('POST', url, true);
    setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');

    /**
     * send() 方法必须接收一个参数：要么是作为请求主体而发送的数据，要么是 null。
     * 默认情况下，在发送 XHR 请求的同时，还会发送一下 HTTP 头部信息：
     * - Accept：浏览器能够处理的内容类型；
     * - Accept-Charset：浏览器能够显示的字符集；
     * - Accept-Encoding：浏览器能够处理的压缩编码；
     * - Accept-Language：浏览器当前设置的语言；
     * - Connection：浏览器与服务器之间连接的类型；
     * - Cookie：当前页面设置的任何 Cookie；
     * - Host：发出请求的页面所在的域；
     * - Referer发出请求的页面的 URI；
     * - User-Agent：浏览器的用户代理字符串；
     */
    xhr.send(serialize(form));


}





var xdr = new XDomainRequest();

xdr.onload = function() {
    alert(xdr.requestText);
};
xdr.onerror = function() {
    alert('An error occurred.');
};

xdr.timeout = 1000;
xdr.ontimeout = function() {
    alert('Request took too long.');
};

xdr.open('POST', 'http://www.somewhere-else.com/page/');
xdr.contentType = 'application/x-www-form-urlencoded';
xdr.send('name1=value1&name2=value2');




function createCORSRequest(method, url) {
    var xhr = new XMLHttpRequest();

    if ('withCredentials' in xhr) {
        xhr.open(method, url, true);
    } else if (typeof XDomainRequest != 'undefined') {
        xhr = new XDomainRequest();
        xhr.open(method, url);
    } else {
        xhr = null;
    }

    return xhr;
}

var xhr = createCORSRequest('get', 'http://www.somewhere-else.com/page/');
if (request) {
    request.onload = function() {
        // 对 request.responseText 进行处理
    }
    request.send();
}
