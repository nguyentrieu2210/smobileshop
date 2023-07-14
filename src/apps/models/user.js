const mongoose = require("../../common/database")();
const userSchema = mongoose.Schema({
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        require:true,
    },
    full_name: {
        type: String,
        requierd: true,
    }
});
const UserModel = mongoose.model("User", userSchema, "users");
module.exports = UserModel;