exports.login = async (ctx)=>{
    const {user,password} = ctx.body
    console.log(user,password)
    ctx.session.key = user
}

exports.logout = async (ctx)=>{
    ctx.session.key = null
}

exports.addUser = async (ctx)=>{
    const {name,password} = ctx.body
    
}

exports.editUser = async (ctx)=>{

}