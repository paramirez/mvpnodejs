import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

const Schema = mongoose.Schema;

const userSchema = new Schema(
    {
        email: { type: String, unique: true, required: true, validate: [validateEmail, "No match email"] },
        password: { type: String, required: true },
        active: { type: Boolean, default: true },
        token: { type: String, default: "" },
        rol: { type: Schema.Types.ObjectId, ref: 'rol' }
    },
    {
        collection: 'users',
        timestamps: true
    }
);

function validateEmail(email) {
    var reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return reg.test(email);
};

userSchema.pre('save', function (next) {
    const user = this;
    if (!user.isModified('password')) next();
    bcrypt.genSalt(function (err, salt) {
        if (err) next(err);
        bcrypt.hash(user.password, salt, function (err, hash) {
            if (err) next(err);
            user.password = hash;
            next();
        });
    });
});

export default mongoose.model('user', userSchema);