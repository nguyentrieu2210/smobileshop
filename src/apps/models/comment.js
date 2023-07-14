
const mongoose = require("../../common/database")();
const commentSchema = mongoose.Schema({
    email:{
        type: String,
        default:null,
    },
    prd_id:{
        type: mongoose.Types.ObjectId,
        ref: "Product",
        required: true,
    },
    body: {
        type: String,
        required: true,
    },
    full_name: {
        type: String,
        required: true,
    }
},{
    timestamps: true,
});
const CommentModel = mongoose.model("Comment",commentSchema , "comments");
module.exports = CommentModel;