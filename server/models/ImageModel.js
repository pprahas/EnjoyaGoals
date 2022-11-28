const mongoose = require('mongoose');

const imageSchema = mongoose.Schema({
    name: String,
    image: Buffer,
    filetype: String,
    task_id:  mongoose.Schema.ObjectId,
    user_id:  mongoose.Schema.ObjectId,

});

const Image = new mongoose.model('Image', imageSchema);
module.exports = Image;
