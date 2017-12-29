import userModel from "../models/user.model";

async function createUser(_user) {
    const user = new userModel(_user);
    return await user.save();
};

function findAllUsers() {
    userModel
        .find({ active: true }, 'email active -_id')
        .populate({
            path: 'rol',
            select: 'name -_id',
            match: { active: true }
        })
        .exec((err, users) => {
            if (err) { return err }
            if (users) { return users.filter(user => user.rol !== null); }
        });
};

export default {
    createUser,
    findAllUsers
};