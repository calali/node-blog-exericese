const crypto = require("crypto");
const uuidv1 = require('uuid/v1');
const model = require('../lib/mysql')
const utils = require('../middlewares/index')

exports.login = async (ctx)=>{
    const {name,password} = ctx.request.body
    if(!name || !password){
        ctx.body={
            code:500,
            msg:'name or password must need'
        }
    }else{
        if(utils.isLogin(ctx)){
            ctx.body={
                code:500,
                msg:'user has login'
            }
        }else{
            await model.findUserByName([name]).then(res=>{
                if(res && res.length){
                    if(crypto.createHash('md5').update(password).digest('hex') === res[0]["pass"]){
                        ctx.session.uid=res[0]["uid"]
                        ctx.body={
                            code:200,
                            msg:'login success'
                        }
                    }else{
                        ctx.body={
                            code:500,
                            msg:'user passowrd not correct'
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
                    msgd:JSON.stringify(e)
                }
            })
        }
    }
}

exports.logout = async (ctx)=>{
    if(!utils.isLogin(ctx)){
        ctx.body={
            code:500,
            msg:'user has not login'
        }
    }else{
        const uid = ctx.session.uid
        await model.findUserByUid([uid]).then(res=>{
            if(res && res.length){
                ctx.session = null
                ctx.body={
                    code:200,
                    msg:'logout success'
                }
            }else{
                ctx.body ={
                    code:500,
                    msg:'user not exits'
                }
            }
            
        }).catch(e=>{
            ctx.body ={
                code:500,
                msg:JSON.stringify(e)
            }
        })
        
    }
}

exports.addUser = async (ctx)=>{
    const {name,password,avator,moment} = ctx.request.body
    if(!name || !password || !avator || !moment){
        ctx.body={
            code:500,
            msg:'name,password,avator,moment must need'
        }
    }else{
        if(utils.isLogin(ctx)){
            ctx.body={
                code:500,
                msg:'user has login'
            }
        }else{
            //写入数据库并根据数据库的返回值响应
            await model.findUserByName([name]).then(async res=>{
                if(res && res.length){
                    ctx.body={
                        codea:500,
                        msg:'user has exits'
                    }
                }else{
                    await model.addUser([name,crypto.createHash('md5').update(password).digest('hex'),avator,moment,uuidv1()]).then(res=>{
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
}

exports.editUser = async (ctx)=>{
    if(!utils.isLogin(ctx)){
        ctx.body={
            code:500,
            msg:'user has not login'
        }
    }else{
        const uid = ctx.session.uid
        const {password,avator} = ctx.request.body
        if(!password || !avator){
            ctx.body ={
                code:500,
                msg:'password or avator need'
            }
        }else{
            await model.findUserByUid([uid]).then(async res=>{
                if(res && res.length){
                    await model.editUser([password,avator,uid]).then(()=>{
                        ctx.body ={
                            code:200,
                            msg:'update user success'
                        }
                    }).catch(e=>{
                        ctx.body ={
                            codea:500,
                            msg:JSON.stringify(e)
                        }
                    })
                }else{
                    ctx.body ={
                        code:500,
                        msg:'user not exits'
                    }
                }
            }).catch(e=>{
                ctx.body ={
                    codeaa:500,
                    msg:JSON.stringify(e)
                }
            })
        }
    }
}