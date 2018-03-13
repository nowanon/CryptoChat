/*
  Crypto Chat
  @author: ihaci
*/

var CryptoChat = /** @class */ (function () {
    function CryptoChat() {
    }
    CryptoChat.hash = function (str) {
        var n = 87654321;
        for (var i = 0; i < str.length; i++) {
            n ^= str[i].charCodeAt(0);
            n ^= (n << 1) + ((n << 6) + (n << 7) + (n << 12) + (n << 16));
        }
        return (n >>> 0).toString(16);
    };
    CryptoChat.toCode = function (str) {
        var r = [];
        for (var i = 0; i < str.length; i++) {
            r.push(str[i].charCodeAt(0));
        }
        return r;
    };
    CryptoChat.nowTime = function (second) {
        return Math.floor(Math.floor(new Date().getTime() / Math.floor((second * 1000) / 2)) / second);
    };
    CryptoChat.write = function (msg, password, second) {
        if (second === void 0) { second = 0; }
        var output = "0";
        var index = 0;
        var pw = this.toCode(this.hash(password));
        var data = this.toCode(msg);
        if (second) {
            output = second.toString().length + second.toString();
            pw = this.toCode(this.hash(this.nowTime(second) + password));
        }
        for (var i = 0; i < data.length; i++) {
            output += String.fromCharCode(data[i] + pw[index]);
            index++;
            if (!pw[index]) {
                index = 0;
            }
        }
        return output;
    };
    CryptoChat.read = function (msg, password) {
        var output = "";
        var index = 0;
        var pw = this.toCode(this.hash(password));
        var data = this.toCode(msg.slice(1));
        if (/^[1-9]+$/.test(msg[0])) {
            pw = this.toCode(this.hash(this.nowTime(parseInt(msg.slice(1, parseInt(msg[0]) + 1))) + password));
            data = this.toCode(msg.slice(parseInt(msg[0]) + 1));
        }
        for (var i = 0; i < data.length; i++) {
            output += String.fromCharCode(data[i] - pw[index]);
            index++;
            if (!pw[index]) {
                index = 0;
            }
        }
        return output;
    };
    return CryptoChat;
}());
