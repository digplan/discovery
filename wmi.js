module.exports = discover = function(ip, cb) {

    ip = ip || '127.0.0.1';

    var cmds = {
      "system": "wmic /node:" + ip + " computersystem list full /format:csv",
      "product": "wmic /node: " + ip + " product list full /format:csv"
    };

    for (cmd in cmds) {
      call(cmd, cmds[cmd], cb);
    }

    function call(cmd, cmds, cb) {
      require('child_process').exec(cmds, function(e, r) {
      	if(e) return cb({error: e});
      	var ret = {};
      	ret[cmd] = csvJSON(r);
      	cb(ret);
      });
    }

    function csvJSON(csv) {
      var lines = csv.split("\r\n");
      lines.shift();
      var result = [];
      var headers = lines[0].split(",");

      for (var i = 1; i < lines.length; i++) {

        var obj = {};
        var currentline = lines[i].split(",");

        for (var j = 0; j < headers.length; j++) {
          obj[headers[j]] = currentline[j];
        }

        if(obj[Object.keys(obj)[0]])
          result.push(obj);
      }
      return result;
    }
}

discover('', console.log.bind(console))
