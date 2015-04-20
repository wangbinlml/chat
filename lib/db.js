var Mysql = require('mysql-libmysqlclient');
var opt = require('../config/config').conn;
var conn;
function DB() {
};
DB.prototype = {
    init: function () {
        if (conn === undefined) {
            conn = Mysql.createConnectionSync();
            conn.initSync();
            //MYSQL_OPT_CONNECT_TIMEOUT
            conn.setOptionSync(0, 2);
            //MYSQL_OPT_READ_TIMEOUT
            conn.setOptionSync(12, 1);
            conn.setOptionSync(Mysql.MYSQL_OPT_RECONNECT, 1);
            conn.realConnectSync(
                opt.host,
                opt.user,
                opt.pass,
                opt.port,
                opt.db
            );
            conn.setCharsetSync('utf8');
        }
        return conn;
    },

    excute: function (sql) {
        return conn.querySync(sql);
    },

    find: function (sql) {
        var row = conn.querySync(sql);
        if (!row.fetchAllSync) {
            return row;
        }
        var res = row.fetchAllSync();
        conn.closeSync();
        return res;
    }
};

module.exports = new DB().init();