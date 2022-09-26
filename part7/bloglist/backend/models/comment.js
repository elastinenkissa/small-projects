const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
    content: {
        type: String,
        required: true,
    },
    poster: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    blog: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Blog'
    }
});

commentSchema.set('toJSON', {
    transform: (document, object) => {
        object.id = object._id.toString();
        delete object._id;
        delete object.__v;
    },
});

const Comment = mongoose.model('Comment', commentSchema);

module.exports = Comment;
