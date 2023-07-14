const UserModel = require("../models/user");
const ProductModel = require("../models/product");

const index = async (req, res) => {
    const users = (await UserModel.find()).length;
    const products = (await ProductModel.find()).length;
    res.render("../views/admin/admin", {users, products});
}
module.exports = {
    index,
}