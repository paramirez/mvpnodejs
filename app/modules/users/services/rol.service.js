import rolModel from '../models/rol.model';

async function createRol(_rol) {
    try {
        let rol = new rolModel(_rol);
        return rol.save();
    } catch (err) {
        return err
    }
};

async function getAllRols() {
    return rolModel.find({ active: true });
};

async function getAllRolsDisabled() {
    return rolModel.find({ active: false });
};

async function disableRol(_id) {
    try {
        return rolModel.update({ _id, active: true }, { active: false });
    } catch (err) {
        return err;
    }
};

async function findRolById(_id) {
    try {
        return rolModel.find({ _id, active: true });
    } catch (err) {
        return err;
    }
};

export default {
    createRol,
    getAllRols,
    getAllRolsDisabled,
    disableRol,
    findRolById
};