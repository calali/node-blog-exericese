const isLogin =  (ctx)=>{
    if(ctx.session && ctx.session.uid){
        return true
    }
    return false
}