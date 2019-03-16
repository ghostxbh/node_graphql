/**
 *@author xbh
 *@dateTime 2019-03-02 10:46
 *@description
 */
const MessageDao = require('../dao/message-dao');
const UserDao = require('../dao/user-dao');

let PageUtil = {
    page: 1,
    size: 5
};
let Message = {
    id: 0,
    sender: '',
    phone: '',
    time: '',
    message: ''
};
let User = {
    id: 0,
    name: '',
    age: '',
    phone: '',
    address: '',
    job: '',
    other: '',
    message: Message
};
var UserService = {
    user: ({id}) => {
        return new Promise((resolve, reject) => {
            UserDao.user(id)
                .then(value => {
                    resolve(value);
                   /* User = value;
                    console.log(User);
                    MessageDao.ByuserId(PageUtil.page, PageUtil.size, null, id)
                        .then(value1 => {
                            Message = value1;
                            User.message = Message;
                            console.log(User);
                            resolve(User);
                        }).catch(err => {
                        reject(err);
                    })*/
                }).catch(err => {
                reject(err);
            });
        });
    },
    users: ({page, size, order}) => {
        return new Promise((resolve, reject) => {
            UserDao.users(page, size, order)
                .then(value => {
                    value.forEach(user => {
                        MessageDao.ByuserId(null, null, null, user.id)
                            .then(value1 => {
                                user.message = value1;
                            }).catch(err => {
                                reject(err);
                            }
                        )
                    });
                }).catch(err => {
                reject(err);
            })

        });
    }
};

module.exports = UserService;