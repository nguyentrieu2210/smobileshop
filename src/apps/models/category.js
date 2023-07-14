const mongooes = require("../../common/database")();
const categorySchema = mongooes.Schema({
    description: {
        type:String,
        default:null,
    },
    title: {
        type: String,
        required: true,
    },
    slug: {
        type: String,
        required: true,
    }
}, {
    timestamps: true,
});
const CategoryModel = mongooes.model("Category", categorySchema, "categories");
module.exports = CategoryModel;