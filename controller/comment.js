const uuidv1 = require('uuid/v1');
const model = require('../lib/mysql')
const utils = require('../middlewares/index')

exports.getComment = async (ctx)=>{
    //分页查询
    const page = ctx.query.page
    const {pid} = ctx.request.body
    if(!page || !pid){
        ctx.body={
            code:500,
            msg:'page pid must need'
        }
    }else{
        await model.findCommentByMoment([pid,page]).then(res=>{
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

exports.addComment = async (ctx)=>{
    if(!utils.isLogin(ctx)){
        ctx.body={
            code:500,
            msg:'user has not login'
        }
    }else{
        const {pid,content,moment} = ctx.request.body
        if(!pid || !content ||!moment){
            ctx.body ={
                code:500,
                msg:'pid content moment must need'
            }
        }else{
            const uid = ctx.session.uid
            const cid = uuidv1()
            await model.addComment([uid,pid,cid,content,moment]).then(res=>{
                ctx.body={
                    code:200,
                    msg:'comment success'
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

exports.deleteComment = async (ctx)=>{
    if(!utils.isLogin(ctx)){
        ctx.body={
            code:500,
            msg:'user has not login'
        }
    }else{
        const {cid} = ctx.request.body
        if(!cid){
            ctx.body ={
                code:500,
                msg:'cid must need'
            }
        }else{
            //只能删除自己的评论
            await model.findCommentByCid([cid]).then(async res=>{
                if(res && res.length){
                    const uid = res[0]["uid"]
                    if(uid === ctx.session.uid){
                        await model.deleteCommentById([cid]).then(async res=>{
                            ctx.body ={
                                code:200,
                                msg:'delete success'
                            }
                        })
                    }else{
                        ctx.body ={
                            code:500,
                            msg:"it's not your comment"
                        }
                    }
                }else{
                    ctx.body ={
                        code:500,
                        msg:'comment not exits'
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