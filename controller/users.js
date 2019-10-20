exports.login = async (ctx)=>{
    const {user,password} = ctx.query
    console.log(user,password)
    ctx.body="ok"
}

exports.logout = async (ctx)=>{

}

exports.addUser = async (ctx)=>{
    // const {user,password} = ctx.query
    console.log(ctx.request.body)
    ctx.body="ok"
}

exports.editUser = async (ctx)=>{

}

exports.deletetUser = async (ctx)=>{

}