var L = {};

L.toCamel = function(str) {
    return str.replace(/-[a-z]/g, function($1) {
        return $1[1].toUpperCase();
    });
};

L.fromCamel = function(str) {
    return str.replace(/[A-Z]/g, function($1) {
        return '-' + $1.toLowerCase();
    });
};

L.capitalize = function(str) {
    return str[0].toUpperCase() + str.substr(1);
};

L.compose = function(attr) {
    var c = L.toCamel(attr);
    var f = L.fromCamel(attr);
    var ret = [c, f];
    var cC = c;
    if (c && c[0]) {
        cC = L.capitalize(c);
    }
    var available = ["ms", "webkit", "moz", "o"];
    for (var i = 0; i < available.length; i++) {
        ret.push(available[i] + cC);
        ret.push(L.fromCamel(L.capitalize(available[i]) + cC));
    }
    return ret;
};

module.exports = L;