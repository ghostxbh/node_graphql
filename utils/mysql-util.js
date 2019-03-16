/**
 *@author xbh
 *@dateTime 2019-03-01 15:47
 *@description  数据库连接操作
 */

const mysql = require('mysql');
const conf = require('../conf/resource');

var config = {
    connectionLimit: 5,
    host: conf.db.host,
    user: conf.db.username,
    password: conf.db.password,
    port: conf.port,
    database: conf.db.database_usercenter,
    multipleStatements: true
};
let pool;

const Mysql = {
    getConn: () => {
        return new Promise((resolve, reject) => {
            if (!pool) {
                pool = mysql.createPool(config);
                console.log(new Date(), '已创建连接');
                pool.on('connection', function (connection) {
                    console.log('Connection %d connected,%d', connection.threadId, pool._allConnections.length);
                });
                pool.on('release', function (connection) {
                    console.log('Connection %d released,%d', connection.threadId, pool._allConnections.length);
                });
            }
            if (pool) {
                console.log(new Date(), '当前连接池内数量：' + pool._allConnections.length);
                let count = pool._allConnections.length;
                if (count >= 15) {
                    pool._allConnections.forEach(p => {
                        console.log(p.threadId, p.state);
                    });
                }
                if (count >= 18) {
                    pool.end();
                    pool = mysql.createPool(config);
                    console.log(new Date(), '已重新创建连接');
                    pool.on('connection', function (connection) {
                        console.log('Connection %d connected,%d', connection.threadId, pool._allConnections.length);
                    });
                    pool.on('release', function (connection) {
                        console.log('Connection %d released,%d', connection.threadId, pool._allConnections.length);
                    });
                }
                pool.getConnection((err, conn) => {
                    if (!err) {
                        resolve(conn);
                    } else {
                        console.log(new Date(), '取出连接异常, 问题如下: ');
                        console.log(new Date(), err);
                        reject('没有连接');
                    }
                })
            } else {
                console.log('连接池不正常, 无法进行');
                reject('没有连接池');
            }
        })
    },
    getPool: () => {
        return new Promise((resolve, reject) => {
            if (pool) {
                resolve(pool);
            } else {
                pool = mysql.createPool(config);
                console.log(new Date(), '已创建连接池');
                pool.on('connection', function (connection) {
                    //console.log('Connection %d connected, %d', connection.threadId, pool._allConnections.length);
                });
                pool.on('release', function (connection) {
                    //console.log('Connection %d released, %d', connection.threadId, pool._allConnections.length);

                });
                if (resolve) {
                    resolve(pool);
                } else {
                    reject('没有连接');
                }
            }
        })
    }
};

module.exports = Mysql;