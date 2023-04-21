const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        minlength: 3,
        unique: true,
        trim: true,
    },
    name: String,
    password: String,
    blogs: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Blog',
        },
    ],
    comments: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Comment'
        }
    ]
});

userSchema.set('toJSON', {
    transform: (document, object) => {
        object.id = object._id.toString();
        delete object._id;
        delete object.__v;
    },
});

const User = mongoose.model('User', userSchema);

module.exports = User;
