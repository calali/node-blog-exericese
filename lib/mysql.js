const  mysql = require('mysql');
const mysqlConfig = require('../config/index').database

const pool  = mysql.createPool(mysqlConfig);

const query = (sql,values=[])=>{
    return new Promise((resolve,reject)=>{
        pool.getConnection(function(err, connection) {
            if (err) reject (err);
            connection.query(sql, values,function (error, results, fields) {
                if (error) reject (error);
                if(results) resolve (results);
                connection.release();
            });
        });
    });
}

let users =
    `create table if not exists users(
     id INT NOT NULL AUTO_INCREMENT,
     name VARCHAR(100) NOT NULL COMMENT '用户名',
     pass VARCHAR(100) NOT NULL COMMENT '密码',
     avator VARCHAR(100) NOT NULL COMMENT '头像',
     moment VARCHAR(100) NOT NULL COMMENT '注册时间',
     uid VARCHAR(100) NOT NULL COMMENT '用户id',
     PRIMARY KEY ( id )
    );`

let posts =
    `create table if not exists posts(
     id INT NOT NULL AUTO_INCREMENT,
     uid VARCHAR(100) NOT NULL COMMENT '用户id',
     pid VARCHAR(100) NOT NULL COMMENT '文章id',
     title TEXT(0) NOT NULL COMMENT '标题',
     content TEXT(0) NOT NULL COMMENT '内容',
     moment VARCHAR(100) NOT NULL COMMENT '发布时间',
     PRIMARY KEY(id)
    );`

let comment =
    `create table if not exists comment(
     id INT NOT NULL AUTO_INCREMENT,
     uid VARCHAR(100) NOT NULL COMMENT '用户id',
     pid VARCHAR(100) NOT NULL COMMENT '文章id',
     content TEXT(0) NOT NULL COMMENT '内容',
     moment VARCHAR(40) NOT NULL COMMENT '评论时间',
     PRIMARY KEY(id) 
    );`

query(users,[]);
query(posts,[]);
query(comment,[]);

//用户注册
exports.addUser = (sql,values)=>{
    let _sql = 'insert into users set name=?,pass=?,avator=?,moment=?,uid=?;'
    return query (_sql,values)
}

//用户信息编辑
exports.editUser = (sql,values)=>{
    let _sql = 'update users set name=?,pass=?,avator=?;'
    return query (_sql,values)
}

//用户查找
exports.findUser = (sql,values)=>{
    let _sql = 'select * from users where name=?;'
    return query (_sql,values)
}