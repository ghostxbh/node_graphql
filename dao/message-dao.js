/**
 *@author xbh
 *@dateTime 2019-03-02 09:11
 *@description 信息DAO
 */
const Mysql = require('../utils/mysql-util');
const model = 'id,sender,phone,time,message,user_id';

const MessageDao = {
    createMessage: (id, sender, phone, time, message, user_id) => {
        return new Promise((resolve, reject) => {
            Mysql.getPool()
                .then(pool => {
                    let value = '' + id + ',"' + sender + '","' + phone + '","' + time + '","' + message + '",' + user_id + '';
                    let sql = 'insert into message value (' + value + ')';
                    pool.query(sql, (e, v, f) => {
                        if (e) {
                            reject(e);
                        } else {
                            resolve(v);
                        }
                    });
                });
        });
    },

    deleteMessage: (id) => {
        return new Promise((resolve, reject) => {
            Mysql.getPool()
                .then(pool => {
                    let sql = 'delete from message where id = ?';
                    pool.query(sql, [id], (e, v, f) => {
                        if (e) {
                            reject(e);
                        } else {
                            resolve(v);
                        }
                    });
                });
        });
    },

    updateMessage: (id, sender, phone, time, message, user_id) => {
        return new Promise((resolve, reject) => {
            Mysql.getPool()
                .then(pool => {
                    let value = 'sender="' + sender + '",phone="' + phone + '",time="' + time + '",message="' + message + '",user_id=' + user_id + '';
                    let sql = 'update message set ' + value + ' where id=' + id;
                    pool.query(sql, (e, v, f) => {
                        if (e) {
                            reject(e);
                        } else {
                            resolve(v);
                        }
                    });
                });
        });
    },

    message: (id) => {
        return new Promise((resolve, reject) => {
            Mysql.getPool()
                .then(pool => {
                    let sql = 'select ' + model + ' from message where id=?';
                    pool.query(sql, [id], (e, v, f) => {
                        if (e) {
                            reject(e);
                        } else {
                            resolve(v);
                        }
                    });
                });
        });
    },

    messages: (page, size, orderBy) => {
        return new Promise((resolve, reject) => {
            Mysql.getPool()
                .then(pool => {
                    let order = orderBy ? 'order by' + orderBy : '';
                    let limit = 'limit' + page ? page + ',' + size ? size : null : size ? size : null;
                    let sql = 'select ' + model + ' from message' + order + limit;
                    pool.query(sql, (e, v, f) => {
                        if (e) {
                            reject(e);
                        } else {
                            resolve(v);
                        }
                    });
                });
        });
    },

    ByuserId: (page, size, orderBy, userId) => {
        return new Promise((resolve, reject) => {
            Mysql.getPool()
                .then(pool => {
                    let order = orderBy ? ' order by ' + orderBy : '';
                    let limit = page || size ? ' limit ' + (size ? page + ',' + size : page) : '';
                    let sql = 'select ' + model + ' from message where user_id=' + userId + order + limit;
                    console.log("sql:"+sql);
                    pool.query(sql, (e, v, f) => {
                        if (e) {
                            reject(e);
                        } else {
                            resolve(v);
                        }
                    });
                });
        });
    }
};

module.exports = MessageDao;