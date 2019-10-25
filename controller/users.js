const crypto = require("crypto");
const uuidv1 = require('uuid/v1');
const model = require('../lib/mysql')


const md5 = crypto.createHash('md5');


exports.login = async (ctx)=>{
    const {name,password} = ctx.request.body
    await model.findUserByName([name]).then(async res=>{
        if(res && res.length){
            if(md5.update(password).digest('hex') === res[0]["pass"]){
                //设置cookie
                ctx.session.uid=res[0]["uid"]
                console.log(ctx.session)
                ctx.body={
                    codea:200,
                    msg:'login success'
                }
            }
        }else{
            ctx.body={
                code:500,
                msg:'user not exits'
            }
        }
    }).catch((e)=>{
        ctx.body ={
            code:500,
            msg:JSON.stringify(e)
        }
    })
}

exports.logout = async (ctx)=>{
    ctx.session = null
    ctx.body={
        code:200,
        msg:'logout success'
    }
}

exports.addUser = async (ctx)=>{
    const {name,password,avator,moment} = ctx.request.body || {}
    if(!name || !password || !avator || !moment){
        ctx.body={
            code:500,
            msg:'name,password,avator,moment must need'
        }
    }else{
        //写入数据库并根据数据库的返回值响应
        await model.findUser([name]).then(async res=>{
            if(res && res.length){
                ctx.body={
                    codea:500,
                    msg:'user has exits'
                }
            }else{
                await model.addUser([name,md5.update(password).digest('hex'),avator,moment,uuidv1()]).then(res=>{
                    console.log(res)
                    ctx.body={
                        code:200,
                        msg:'sign up ok'
                    }
                })
            }
        }).catch((e)=>{
            ctx.body ={
                code:500,
                msg:JSON.stringify(e)
            }
        })
    }
}

exports.editUser = async (ctx)=>{
    console.log()
    const {password,avator} = ctx.request.body
    await model.findUser([]).then(res=>{
        ctx.body="editUser"
    })
    model.editUser([]).then(res=>{
        ctx.body="editUser"
    })
}