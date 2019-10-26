const uuidv1 = require('uuid/v1');
const model = require('../lib/mysql')
const utils = require('../middlewares/index')



exports.getPosts = async (ctx)=>{
    //分页查询
    const page = ctx.query.page
    if(!page){
        ctx.body={
            code:500,
            msg:'page must need'
        }
    }else{
        await model.findPostsByMoment(page).then(res=>{
            ctx.body={
                code:200,
                msg:'ok',
                data:res
            }
        }).catch(e=>{
            ctx.body={
                code:500,
                msg:JSON.stringify(e)
            }
        })
    }
}

exports.addPost = async (ctx)=>{
    if(!utils.isLogin(ctx)){
        ctx.body={
            code:500,
            msg:'user has not login'
        }
    }else{
        const {title,content,moment} = ctx.request.body
        if(!title || !content ||!moment){
            ctx.body ={
                code:500,
                msg:'title content moment must need'
            }
        }else{
            const uid = ctx.session.uid
            const pid = uuidv1()
            await model.addPost([uid,pid,title,content,moment]).then(res=>{
                ctx.body={
                    code:200,
                    msg:'post success'
                }
            }).catch(e=>{
                ctx.body ={
                    code:500,
                    msg:JSON.stringify(e)
                }
            })
        }
    }
}

exports.deletePost = async (ctx)=>{
    if(!utils.isLogin(ctx)){
        ctx.body={
            code:500,
            msg:'user has not login'
        }
    }else{
        const {pid} = ctx.request.body
        if(!pid){
            ctx.body ={
                code:500,
                msg:'pid must need'
            }
        }else{
            //只能删除自己的文章
            await model.findPostByPid([pid]).then(async res=>{
                if(res && res.length){
                    const uid = res[0]["uid"]
                    if(uid === ctx.session.uid){
                        await model.deletePostById([pid]).then(async res=>{
                            ctx.body ={
                                code:200,
                                msg:'delete success'
                            }
                        })
                    }else{
                        ctx.body ={
                            code:500,
                            msg:"it's not your post"
                        }
                    }
                }else{
                    ctx.body ={
                        code:500,
                        msg:'post not exits'
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
}

exports.editPost = async (ctx)=>{
    if(!utils.isLogin(ctx)){
        ctx.body={
            code:500,
            msg:'user has not login'
        }
    }else{
        const {title,content,pid} = ctx.request.body
        if(!pid || !title || !content){
            ctx.body ={
                code:500,
                msg:'pid title content must need'
            }
        }else{
            //只能删除自己的文章
            await model.findPostByPid([pid]).then(async res=>{
                if(res && res.length){
                    const uid = res[0]["uid"]
                    if(uid === ctx.session.uid){
                        await model.editPost([title,content,pid]).then(async res=>{
                            ctx.body ={
                                code:200,
                                msg:'edit success'
                            }
                        })
                    }else{
                        ctx.body ={
                            code:500,
                            msg:"it's not your post"
                        }
                    }
                }else{
                    ctx.body ={
                        code:500,
                        msg:'post not exits'
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
}