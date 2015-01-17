module.exports = ports = function(ip, begin, end, cb, timeout){
  ip = ip || '127.0.0.1';
  begin = begin-1;

  var ret = {node: ip, openports: []};
  
  while(begin++ < end)
  	tryport(ip, begin, ret);

  setTimeout(function(){
    cb(ret);
  }, timeout || 4000);
}

function tryport(ip, port, ret){
  var c = require('net').connect(port, ip);
  var ip = ip, r = ret;
  c.on('error', function(){});
  c.on('connect', function(){ r.openports.push(port); c.end() });
}

ports('google.com', 80, 84, console.log.bind(console), 4000);
