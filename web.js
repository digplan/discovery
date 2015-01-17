module.exports = webdiscover = function(ip_or_host, cb){
  require('ajax.js').head(ip_or_host, null, process.bind(null, cb, ip_or_host));
}

function process(cb, host, a, b, c){
  var server = c.filter(function(h){ return h.match(/^server/)})[0];
  var name = server.split(': ')[1];
  cb({webserver: host, type: name, headers: c});
}

webdiscover('http://google.com', console.log.bind(console));
