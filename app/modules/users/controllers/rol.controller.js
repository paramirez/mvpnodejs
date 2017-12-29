import rolModel from '../models/rol.model';

async function createRol(req, res) {
    try {
        let rol = new rolModel(req.body);
        rol = await rol.save();
        res.status(200).json({message: 'Rol created'});
    } catch (error) {
        res.status(500).json(error);
    }
};

async function getAllRols(req, res) {
    const listRols = await rolModel.find({ active: true }, 'name _id active');
    res.json(listRols);
};

async function getAllRolsDisabled(req, res) {
    const listRols = await rolModel.find({ active: false }, 'name _id active');
    res.json(listRols);
};

async function disableRol(req, res) {
    const rol = await rolModel.update({ _id: req.params.rolId, active: true }, { active: false });
    res.sendStatus(rol ? 200 : 404);
};

async function activeRol(req, res) {
    const rol = await rolModel.update({ _id: req.params.rolId, active: false }, { active: true });
    res.sendStatus(rol ? 200 : 404);
};

async function findRolById(req, res) {
    try {
        const rol = await rolModel.findOne({ _id: req.params.rolId, active: true });
        if (rol) {
            res.json(rol);
        } else {
            res.sendStatus(404);
        }
    } catch (error) {
        if (error.name === "CastError") { res.sendStatus(404) }
        else { res.status(500).json(error) }
    }
};

export default {
    createRol,
    getAllRols,
    getAllRolsDisabled,
    activeRol,
    disableRol,
    findRolById
};