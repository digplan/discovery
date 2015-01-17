module.exports = snmp = function(ip_or_host, port, community) {

  var snmp = require('snmp-native');
  var session = new snmp.Session({
    host: ip_or_host || 'localhost',
    port: port || '161',
    community: community || ''
  });
  console.log(session);

  var oids = [ [1, 3, 6, 1, 4, 1, 42, 1, 0], [1, 3, 6, 1, 4, 1, 42, 2, 0] ];
  
  session.getAll({ oids: oids }, console.log.bind(console));

}

snmp(null, null, null);
