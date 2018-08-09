function eee (s, e) {
    var a = '2018-02-09 ' + s;
    var b = '2018-02-10 ' + e;
    return (new Date(b) - new Date(a))/1000/60
}
console.log(eee("20:34","07:50")); 