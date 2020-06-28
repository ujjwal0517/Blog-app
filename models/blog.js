const mongoose = require("mongoose");
 
const blogSchema = mongoose.Schema({
    title:{
        type: String,
        required: true,
    },
    content:{
        type: String,
        required: true,
    },
    publishedAt:{
        type: Date,
        default: new Date().toLocaleDateString(),
    },
});
module.exports = mongoose.model("blog", blogSchema);