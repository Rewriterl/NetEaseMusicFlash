# net-ease

>

## 思路

1.前台拿用户手机号和密码<br>
2.自己拼接data数组，[phone(string),countrycode(num),password(string),rememberLogin(boolean)]<br>
3.登录,保存__csrf(token)
3.后台使用两次AES加密处理data数组


## 网易云音乐加密算法相关<br>
分析网易云音乐的请求参数
csrf_token存放的是我的token
params<br>
```javascript
    var bYf8X = window.asrsea(JSON.stringify(i9b), bqR9I(["流泪", "强"]), bqR9I(QM2x.md), bqR9I(["爱心", "女孩", "惊恐", "大笑"]));
    e9f.data = k9b.cy0x({
        params: bYf8X.encText,
        encSecKey: bYf8X.encSecKey
    })
```
可以发现encSecKey和params首先使用上面的那个asrsea函数进行加密,该函数共有四个参数,asrsea的定义:
```javascript
    window.asrsea = d,
    window.ecnonasr = e
```
```javascript
    // 根据调试可以发现a是生成长度16的随机字符串,可以当成常量用
    function a(a) {
        var d, e, b = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789", c = "";
        for (d = 0; a > d; d += 1)
            e = Math.random() * b.length,
            e = Math.floor(e),
            c += b.charAt(e);
        return c
    }
    // AES加密
    function b(a, b) {
        var c = CryptoJS.enc.Utf8.parse(b)
          , d = CryptoJS.enc.Utf8.parse("0102030405060708")
          , e = CryptoJS.enc.Utf8.parse(a)
          , f = CryptoJS.AES.encrypt(e, c, {
            iv: d,
            mode: CryptoJS.mode.CBC
        });
        return f.toString()
    }
    // RSA加密
    function c(a, b, c) {
        var d, e;
        return setMaxDigits(131),
        d = new RSAKeyPair(b,"",c),
        e = encryptedString(d, a)
    }
    function d(d, e, f, g) {
        var h = {}
          , i = a(16);
        // encText实际使用了b方法进行AES加密
        return h.encText = b(d, g),
        // 第二次AES加密
        h.encText = b(h.encText, i),
        // 参数i使用a方法生成,完全随机，其余都是常量,由此可推c方法调用之后返回的就是一个‘常量’
        h.encSecKey = c(i, e, f),
        h
    }
    function e(a, b, d, e) {
        var f = {};
        return f.encText = c(a + e, b, d),
        f
    }
```
通过打断点的方式看一下这四个参数都是什么:
```
JSON.stringify(i9b) // 参数d
"{"csrf_token":"567849295c80512f8eaf562b51bc1523"}"
bqR9I(["流泪", "强"]) // 参数e,常量
"010001"
bqR9I(QM2x.md) // 参数f,常量
"00e0b509f6259df8642dbc35662901477df22677ec152b5ff68ace615bb7b725152b3ab17a876aea8a5aa76d2e417629ec4ee341f56135fccf695280104e0312ecbda92557c93870114af6c9d05c4f7f0c3685b7a46bee255932575cce10b424d813cfe4875d3e82047b97ddef52741d546b8e289dc6935b3ece0462db0a22b8e7"
bqR9I(["爱心", "女孩", "惊恐", "大笑"]) // 参数g,常量
"0CoJUm6Qyw8W8jud"
```

知道了bYf8X这个对象是从哪来的之后我们可以看params,和encSecKey的加密方法了
bYf8X.encText 使用方法b进行AES加密，第一次加密的参数是(formData,参数g),第二次加密的参数是(加密一次后的数据,方法a产生的随机十六位字符串)
bYf8X.encSecKey 完全随机，没有规律，可以当成是一个常量

刷的音乐来自每日推荐
```
/api/discovery/recommend/resource
```
