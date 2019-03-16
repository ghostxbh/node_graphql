/**
 *@author xbh
 *@dateTime 2019-03-02 13:23
 *@description
 */
var UserService = require('../../services/message-service');
var express = require('express');
var router = express.Router();
var graphqlHTTP = require('express-graphql');
var {buildSchema} = require('graphql');

var schema = buildSchema(`
type Query {
    user(id:ID):User!
    users(page:Int,size:Int,oderBy:String):[User!]
}
  
type User {
    id: ID!
    name: String!
    age: Int!
    phone:String!
    address:String!
    job:String!
    other:String!    
}

type Message {
    id: ID!
    sender: String!
    phone:String!
    time:String!   
    message:String!
    user_id:Int!
}
`);
/*type Mutation{
    createUser(user:User!):Boolean
    deleteUser(id:ID!):Boolean
    updateUser(user:User!):Boolean

    createMessage(message:Message!):Boolean
    deleteMessage(id:ID!):Boolean
    uodate(message:Message!):Boolean
}*/
var app = express();
app.use('/graphql', graphqlHTTP({
    schema: schema,
    rootValue: UserService,
    graphiql: true,
}));

router.get('/user/{id}', (req, res, next) => {
    let id = req.param('id');
    UserService.user(id)
        .then(rows =>{
            console.log(rows);
            res.json(rows);
        })
});
app.listen(4000);
console.log('Running a GraphQL API server at localhost:4000/graphql');

module.exports=router;