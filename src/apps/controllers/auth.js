const UserModel = require("../models/user");

const getLogin = (req, res) => {
    res.render("admin/login", {data:{}});
}
const postLogin = async (req, res) => {
    let error = null;
    const {email,password} = req.body;
    const users = await UserModel.find({email, password});
    if(email==="" || password==="") {
        error = 'Tài khoản không được để trống!'
        res.render("admin/login", {error});
    }else if(users.length>0){
        req.session.email = email;
        req.session.password = password;
        res.redirect("/admin/dashboard");
    }else{
        error = 'Tài khoản không hợp lệ!';
        res.render("admin/login", {error});
    }
    res.render("admin/login", {data:{error}});
}
const logout = (req, res) => {
    req.session.destroy();
    res.redirect("/admin/logout");
}
module.exports = {
    getLogin,
    postLogin,
    logout,
}