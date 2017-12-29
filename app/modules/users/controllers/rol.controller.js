import rolService from '../services/rol.service';

function newRol(req, res, next) {
    let name = req.body.name;
    rolService.createRol({ name })
        .then(rol => {
            res.json({ name: `Rol ${rol.name} created!` });
        })
        .catch(err => {
            res.status(500).json(err);
        });
};

function listRols(req, res, next) {
    rolService.getAllRols()
        .then(list => {
            res.json(list);
        })
        .catch(err => {
            res.status(500).json(err);
        });
};

function deleteRol(req, res, next) {
    rolService.disableRol(req.params.rolId)
        .then(rol => {
            res.json({ message: 'Rol removed!' });
        })
        .catch(err => {
            res.status(500).json(err);
        });
};

function activeRol(req, res, next) {
    rolService.disableRol(req.params.rolId)
        .then(rol => {
            res.json({ message: 'Rol removed!' });
        })
        .catch(err => {
            res.status(500).json(err);
        });
};


function viewRol(req, res, next) {
    rolService.findRolById(req.params.rolId)
        .then(rol => {
            res.json(rol);
        })
        .catch(err => {
            if (err.name === "CastError") { res.status(404).json({ message: `Rol ${err.value} not exist` }) }
            else { res.status(500).json(err) }
        })
};

function listRolsDisables(req, res, next) {
    rolService.getAllRolsDisabled()
        .then(list => {
            res.json(list);
        })
        .catch(err => {
            res.status(500).json(err);
        });
};

export default {
    newRol,
    listRols,
    listRolsDisables,
    deleteRol,
    viewRol
};