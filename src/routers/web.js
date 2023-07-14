//Router Admin
    const express = require("express");
    const router = express.Router();

    //import middleware
    const AuthMiddleware = require("../apps/middlewares/auth.js");
    const UploadMiddleware = require("../apps/middlewares/upload");

    //import controllers
    const AuthController = require("../apps/controllers/auth.js");
    const AdminController = require("../apps/controllers/admin.js");
    const ProductController = require("../apps/controllers/product.js");
    const SiteController = require("../apps/controllers/site.js");

    router.get("/admin/login",AuthMiddleware.checkLogin, AuthController.getLogin);
    router.post("/admin/login",AuthMiddleware.checkLogin, AuthController.postLogin)
    router.get("/admin/logout",AuthMiddleware.checkAdmin, AuthController.logout);

    router.get("/admin/dashboard",AuthMiddleware.checkAdmin, AdminController.index);
    router.get("/admin/products",AuthMiddleware.checkAdmin, ProductController.index);
    router.get("/admin/products/create",AuthMiddleware.checkAdmin, ProductController.create);
    router.post("/admin/products/store",AuthMiddleware.checkAdmin,UploadMiddleware.single("thumbnail"), ProductController.store);
    router.get("/admin/products/edit/:id",AuthMiddleware.checkAdmin, ProductController.edit);
    router.post("/admin/products/update/:id",AuthMiddleware.checkAdmin,UploadMiddleware.single("thumbnail"), ProductController.update);
    router.get("/admin/products/delete/:id",AuthMiddleware.checkAdmin, ProductController.del);

    //Site
    router.get("/", SiteController.home);
    router.get("/product-:slug.:id", SiteController.product);
    router.post("/product-:slug.:id", SiteController.comment);
    router.get("/category-:slug.:id", SiteController.category);
    router.get("/search", SiteController.search);
    router.get("/cart", SiteController.cart);
    router.post("/add-to-cart", SiteController.addToCart);
    router.post("/update-cart", SiteController.updateCart);
    router.get("/delete-cart-:id", SiteController.deleteCart);
    router.post("/order", SiteController.order);
    router.get("/success", SiteController.success);

module.exports = router;