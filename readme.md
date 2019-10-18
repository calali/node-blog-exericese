SMIPLE BLOG
简单的博客平台

## 功能
1、用户的登录注册
2、文章的增删改查
3、评论的增删改查

## 开发顺序
1、数据库表的设计与查询
2、后端项目搭建

## 数据库表的设计与查询
### 一、用户的登录注册
#### 1、用户表设计
users

|  字段   | 数据类型 | 含义  | 要求 |
|  ----  | ----    |----  |----  |
| id     | INT     |自增键 |  非空    |
| name     | VARCHAR(100)     |用户名 |  非空    |
| pass     | VARCHAR(100)     |密码 |  非空    |
| avator     | VARCHAR(100)     |头像 |  非空    |
| moment     | VARCHAR(100)     |注册时间 |  非空    |
| uid     | VARCHAR(100)     | 用户id |  非空    |

#### 2、用户SQL语句
增加："insert into users set name=?,pass=?,avator=?,moment=?;"

删除：`delete from users where name="${name}";`

查询：`select * from users where name="${name}";`


###  二、文章的增删改查
#### 1、文章表设计
posts

|  字段   | 数据类型 | 含义  | 要求 |
|  ----  | ----    |----  |----  |
| id     | INT     |自增键 |  非空    |
| uid     | VARCHAR(100)     |用户id |  非空    |
| title     | TEXT(0)     |标题 |  非空    |
| content     | TEXT(0)     |内容 |  非空    |
| moment     | VARCHAR(100)  |发布时间 |  非空    |
| pid     | VARCHAR(100)  |文章id |  非空    |

#### 2、文章的SQL语句

增加："insert into posts set name=?,title=?,content=?,md=?,uid=?,moment=?,avator=?;"

更新：`update posts set title=?,content=?,md=? where id=?`

查询：`select * from posts limit ${(page-1)*5},5;`

删除：`delete from posts where id = ${id}`

###  三、评论的增删改查
#### 1、评论表设计
comment

|  字段   | 数据类型 | 含义  | 要求 |
|  ----  | ----    |----  |----  |
| id     | INT     |自增键 |  非空    |
| uid     | VARCHAR(100)     |用户id |  非空    |
| pid     | VARCHAR(100)     |文章id |  非空    |
| content     | TEXT(0)     |评论内容 |  非空    |
| moment     | VARCHAR(100)  |评论时间 |  非空    |

#### 2、评论的SQL语句

增加："insert into comment set name=?,content=?,moment=?,postid=?,avator=?;"

删除：`delete from comment where id=${id}`

查询：`select * from comment where postid=${postId} order by id desc limit ${(page-1)*10},10;`

更新：`delete from comment where id=${id}`

## 后端项目搭建
### 一、koa中间件
1、用户登录态的处理：https://www.cnblogs.com/cangqinglang/p/10266952.html

2、请求参数解析：koa-bodyparser

3、路由：koa-router

### 二、项目结构

config: 配置文件

controller：接口业务逻辑

routers：路由处理

middlewares：中间件文件

lib:数据库文件

### 三、测试
参考文件：https://github.com/alsotang/node-lessons/tree/master/lesson6

测试内容是功能里的内容

### 四、开发热更新
https://www.npmjs.com/package/supervisor

### 五、eslint
https://github.com/liuxing/node-blog/blob/master/.eslintrc
https://cn.eslint.org/docs/user-guide/configuring

## 参考资料
https://github.com/wclimb/Koa2-blog