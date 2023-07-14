const CategoryModel = require("../models/category");
const ProductModel = require("../models/product");
const UserModel = require("../models/user");
const test1 = (req, res) => {
    // UserModel.find({}, (err, docs)=> {
    //     console.log(docs.email);
    // })
    const promise = new Promise((res, rej)=> {
        
    })
//     ProductModel.find().populate({path: "cat_id"}).exec((err, docs)=> {
//         console.log(docs);
//     });
// const promise = new Promise((res, rej)=> {
//     const product = ProductModel.find({}, (err, docs)=> {
//         return docs;
//     });
//     const category = CategoryModel.find({}, (err, docs)=> {
//         return docs;
//     });
//     res(product.length+category.length);
// });
// promise.then((resoult)=> {
//     console.log(resoult);
// })
// console.log(product.length);
//     CategoryModel.deleteMany({"title":"bphone-title"}, (err, docs)=>{
//         console.log(docs)
//    })
//    const category = {
//     "description":"bphone-des",
//     "title":"bphone-title",
//     "slug":"bphone",
//    }
//    new CategoryModel(category).save();
    //     res.send(
    // `        <form method = post>
    //             <input type=text name=email>
    //             <br/>
    //             <input type=text name=password>
    //             <br/>
    //             <input type=submit name=submit value=send>
    //         </form>`
    //     );
    // const data2 = "Nodejs";
    // res.render("admin/test", {data2});
    // res.render("admin/login");
    // res.redirect("/admin/dashboard");
    }
    const test2 = (req, res) => {
        res.send(req.body.email);
    }
    
    module.exports = {
        test1: test1,
        test2: test2
    }