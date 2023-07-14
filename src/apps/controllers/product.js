const ProductModel = require("../models/product");
const Paginate = require("../../common/paginate");
const CategoryModel = require("../models/category");
const path = require("path");
const fs = require("fs");
const slug = require("slug");
const index = async (req, res) => {
    const limit = 5;
    const page = parseInt(req.query.page)||1;
    const skip = (page-1)*limit;

    const products = await ProductModel
        .find()
        .skip(skip)
        .sort({_id: -1})
        .limit(limit)
        .populate({path: "cat_id"});
    const totalRow = await ProductModel.find().countDocuments();
    const totalPage = Math.ceil(totalRow/limit); 
    res.render("../views/admin/products/product", {
        products,
        page,
        totalPage,
        pages: Paginate(page, totalPage),
    });
}
const create = async (req, res) => {
    const categories = await CategoryModel.find();
    res.render("../views/admin/products/add_product", {categories});
}
const store = (req, res) => {
    const {file, body} = req;
    const product = {
        // thumbnail:,
        description: body.description,
        price: body.price,
        cat_id: body.cat_id,
        status: body.status=="on",
        promotion: body.promotion,
        warranty: body.warranty,
        accessories: body.accessories,
        is_stock: body.is_stock,
        name: body.name,
        slug: slug(body.name),
    }
    if(file) {
        const thumbnail = "products/"+file.originalname;
        fs.renameSync(file.path, path.resolve("src/public/images", thumbnail));
        product["thumbnail"] = thumbnail;
        new ProductModel(product).save();
        res.redirect("/admin/products");
    }
}
const update = async (req, res) => {
    const id = req.params.id;
    const {file, body} = req;
    const product = {
        // thumbnail:,
        description: body.description,
        price: body.price,
        cat_id: body.cat_id,
        status: body.status=="on",
        promotion: body.promotion,
        warranty: body.warranty,
        accessories: body.accessories,
        is_stock: body.is_stock,
        name: body.name,
        slug: slug(body.name),
    }
    if(file) {
        const thumbnail = "products/"+file.originalname;
        fs.renameSync(file.path, path.resolve("src/public/images", thumbnail));
        product["thumbnail"] = thumbnail;
    }
    await ProductModel.updateOne({_id:id}, {$set: product});
    res.redirect("/admin/products");
}
const edit = async (req, res) => {
    const id = req.params.id;
    const product = await ProductModel.find({_id: id});
    const categories = await CategoryModel.find();
    res.render("../views/admin/products/edit_product", {product: product[0], categories});
}
const del = async (req, res) => {
    const id = req.params.id;
    await ProductModel.deleteOne({_id: id});
    res.redirect("/admin/products");
}

module.exports = {
    index, 
    create,
    store,
    update,
    edit,
    del,
}