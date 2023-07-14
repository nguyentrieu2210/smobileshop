const ProductModel = require("../models/product");
const CategoryModel = require("../models/category");
const CommentModel = require("../models/comment");
const moment = require("moment");
const config = require("config");
const path = require("path");
const transporter = require("../../common/transporter");
const ejs = require("ejs");

const home = async (req, res) => {
    const featureds = await ProductModel.find({featured:true, is_stock: true})
        .limit(6)
        .sort({_id:-1});
    const latest = await ProductModel.find({is_stock:true})
        .limit(6)
        .sort({_id:-1});
    res.render("../views/site/index.ejs", {featureds, latest});
}
const product = async (req, res) => {
    const id = req.params.id;
    const product = await ProductModel.findById(id);
    const comments = await CommentModel.find({prd_id:id})
        .sort({_id: -1});
    res.render("../views/site/product.ejs", {product, comments, moment});
}
const comment = async (req, res) => {
    const id = req.params.id;
    const body = req.body;
    const comment = {
        email:body.email,
        full_name:body.full_name,
        body: body.body,
        prd_id: id,
    }
    new CommentModel(comment).save();
    await res.redirect(req.path);
}
const category = async (req, res) => {
    const id = req.params.id;
    const products = await ProductModel.find({cat_id:id})
        .sort({_id:-1});
    const categories = await CategoryModel.find({_id:id});
    res.render("../views/site/category.ejs", {products, category:categories[0]});
}
const cart = (req, res) => {
    const cart = req.session.cart;
    const totalCost = cart.reduce((total, item)=>total+=(item.qty*item.price), 0);
    res.render("../views/site/cart.ejs", {cart, totalCost});
}
const addToCart = async (req, res) => {
    const body = req.body;
    let cart = req.session.cart;
    isUpdate=false;
    cart.map((item)=>{
        if(item.id === body.id){
            item.qty+=parseInt(body.qty);
            isUpdate=true;
        }
        return item;
    });
    if(isUpdate===false) {
        const product = await ProductModel.findById(body.id);
        cart.push({
            name:product.name,
            img:product.thumbnail,
            price:product.price,
            qty: parseInt(body.qty),
            id: body.id,
        });
    }
    req.session.cart = cart;
    res.redirect("/cart");
}
const updateCart = (req, res) => {
    let cart = req.session.cart;
    const body = req.body;
    cart.map((item)=> {
        if(body.products[item.id]) {
            item.qty = body.products[item.id]["qty"];
        }
        return item;
    });
    req.session.cart = cart;
    res.redirect("/cart");
}
const deleteCart = (req, res) => {
    let cart = req.session.cart;
    const id = req.params.id;
    const newCart = cart.filter((item)=>item.id!=id);
    req.session.cart = newCart;
    res.redirect("/cart");
}
const search = async (req, res) => {
    const keyword = req.query.keyword;
    const filter ={};
    if(keyword) {
        filter.$text = {$search : keyword};
    }
    const products = await ProductModel.find(filter).sort({_id:-1});
    res.render("../views/site/search.ejs", {keyword, products});
}
const order = async (req, res) => {
    const cart = req.session.cart;
    const {name, mail, add, phone} = req.body;

    const html = await ejs.renderFile(
        path.join(req.app.get("views"), "site/email-order.ejs"),
        {
            name, 
            phone, 
            mail,
            add,
            cart,
        }
    )
    await transporter.sendMail({
        to:mail,
        from:"S-Mobile Shop",
        subject:"Xác nhận đơn hàng từ S-Mobile Shop",
        html,
    });
    req.session.cart = [];
    res.redirect("/success");
}
const success = (req, res) => {
    res.render("../views/site/success.ejs");
}
module.exports = {
    home,
    product,
    comment,
    category,
    search,
    cart,
    addToCart,
    updateCart,
    deleteCart,
    order,
    success,
}