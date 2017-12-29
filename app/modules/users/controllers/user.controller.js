import userModel from '../models/user.model';

function index(req, res) {
    res.send("Hola, mundo!");
};

async function allUsers(req, res) {
    try {
        let users = await userModel
            .find({ active: true }, 'email active -_id')
            .populate({ path: 'rol', select: 'name -_id', match: { active: true } })

        users = users.filter(user => user.rol !== null);

        res.json(users);
    } catch (error) {
        res.status(500).json(error);
    }
};

async function newUser(req, res) {
    try {
        let user = new userModel(req.body);
        user = await user.save();
        res.json(user);
    } catch (error) {
        if (error.code === 11000) {
            res.status(400).json({ code: error.code, message: 'Duplicate field' });
        } else {
            res.status(500).json(error);
        }
    }
};

export default {
    index,
    allUsers,
    newUser
};