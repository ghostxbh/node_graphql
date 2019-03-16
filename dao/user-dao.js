/**
 *@author xbh
 *@dateTime 2019-03-02 11:44
 *@description 用户dao
 */

const Mysql = require('../utils/mysql-util');
const model = 'id,name,age,phone,address,job,other';

const UserDao = {
    createUser: (id, name, age, phone, address, job, other) => {
        return new Promise((resolve, reject) => {
            Mysql.getPool()
                .then(pool => {
                    let value = '' + id + ',"' + name + '",' + age + ',"' + phone + '","' + address + '","' + job + '","' + other + '"';
                    let sql = 'insert into user value (' + value + ')';
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

    deleteUser: (id) => {
        return new Promise((resolve, reject) => {
            Mysql.getPool()
                .then(pool => {
                    let sql = 'delete from user where id = ?';
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

    updateUser: (id, name, age, phone, address, job, other) => {
        return new Promise((resolve, reject) => {
            Mysql.getPool()
                .then(pool => {
                    let value = '' + id + ',name="' + name + '",age=' + age + ',phone="' + phone + '",address="' + address + '",job"' + job + '",other="' + other + '"';
                    let sql = 'update user set ' + value + ' where id=' + id;
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

    user: (id) => {
        return new Promise((resolve, reject) => {
            Mysql.getPool()
                .then(pool => {
                    let sql = 'select ' + model + ' from user where id=?';
                    console.log("sql:"+sql);
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

    users: (page, size, orderBy) => {
        return new Promise((resolve, reject) => {
            Mysql.getPool()
                .then(pool => {
                    let order = orderBy ? ' order by' + orderBy : '';
                    let limit = page || size ? ' limit ' + (size ? page + ',' + size : page) : '';
                    let sql = 'select ' + model + ' from user' + order + limit;
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

module.exports = UserDao;