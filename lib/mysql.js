const  mysql = require('mysql');
const mysqlConfig = require('../config/index').database

const pool  = mysql.createPool(mysqlConfig);

const query = (sql,values=[])=>{
    return new Promise((resolve,reject)=>{
        pool.getConnection(function(err, connection) {
            if (err) {
                reject (err);
            }else{
                connection.query(sql, values,function (error, results, fields) {
                    if (error) reject (error);
                    if(results) resolve (results);
                    connection.release();
                });
            }
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
     cid VARCHAR(100) NOT NULL COMMENT '评论id',
     content TEXT(0) NOT NULL COMMENT '内容',
     moment VARCHAR(40) NOT NULL COMMENT '评论时间',
     PRIMARY KEY(id) 
    );`

query(users);
query(posts);
query(comment);

//用户注册
exports.addUser = (values)=>{
    let _sql = 'insert into users set name=?,pass=?,avator=?,moment=?,uid=?;'
    return query (_sql,values)
}

//用户信息编辑
exports.editUser = (values)=>{
    let _sql = 'update users set pass=?,avator=? where uid=?;'
    return query (_sql,values)
}

//用户查找
exports.findUserByName = (values)=>{
    let _sql = 'select * from users where name=?;'
    return query (_sql,values)
}

exports.findUserByUid = (values)=>{
    let _sql = 'select * from users where uid=?;'
    return query (_sql,values)
}


//发表文章
exports.addPost = (values)=>{
    let _sql = 'insert into posts set uid=?,pid=?,title=?,content=?,moment=?;'
    return query (_sql,values)
}
//修改文章
exports.editPost = (values)=>{
    let _sql = 'update posts set title=?,content=? where pid=?;'
    return query (_sql,values)
}
//删除文章
exports.deletePostById = (values)=>{
    let _sql = 'delete from posts where pid=?;'
    return query (_sql,values)
}
//查询文章按照发表时间从最新时间到最旧时间，联合查询返回用户的头像和名称
exports.findPostsByMoment = (page)=>{
    let _sql = `select s.pid,s.title,s.content,s.moment,u.name,u.avator from posts s,users u where s.uid=u.uid order by moment desc limit ${page-1},10;`
    return query (_sql)
}

//根据pid查找文章信息
exports.findPostByPid = (values)=>{
    let _sql = 'select * from posts where pid=?;'
    return query (_sql,values)
}

//分页查询文章的评论,联合查询返回用户的头像和名称
exports.findCommentByMoment = ([pid,page])=>{
    let _sql = `select c.pid,c.cid,c.content,c.moment,u.name,u.avator from comment c,users u where c.pid='${pid}' and c.uid=u.uid order by moment desc limit ${page-1},10;`
    return query (_sql)
}
//根据cid查找评论信息
exports.findCommentByCid = (values)=>{
    let _sql = 'select * from comment where cid=?;'
    return query (_sql,values)
}


//发表文章评论
exports.addComment = (values)=>{
    let _sql = 'insert into comment set uid=?,pid=?,cid=?,content=?,moment=?;'
    return query (_sql,values)
}

//删除自己的评论
exports.deleteCommentById = (values)=>{
    let _sql = 'delete from comment where cid=?;'
    return query (_sql,values)
}
