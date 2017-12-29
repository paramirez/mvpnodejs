import userModel from '../models/user.model';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { secretKey, tokenExpiresTime } from '../../../core/global';

async function login(req, res, next) {
    try {
        let email = req.body.email;
        let user = await userModel.findOne({ email })
            .populate({
                path: 'rol',
                match: { active: true }
            });
        if (!user) {
            res.status(401).json({ message: `Email invalidate` });
        } else {
            if (bcrypt.compareSync(req.body.password, user.password)) {
                if (user.rol === null || user.active === false) {
                    res.status(401).json({ message: `Access invalidate, user disable` });
                } else {
                    let token = jwt.sign({ user: user.email, active: user.active }, secretKey, { expiresIn: tokenExpiresTime });
                    user.token = token;
                    user.save();
                    res.json({ success: true, message: 'Access true', token });
                }
            } else {
                res.status(401).json({ success: false, message: 'Invalid credentials' });
            }
        }
    } catch (error) {
        res.send(error);
    }
};

function authenticate(req, res, next) {
    let token = req.headers['x-access-token'];
    if (token) {
        jwt.verify(token, secretKey, (err, decoded) => {
            if (err) {
                res.sendStatus(401);
            } else {
                req.decoded = decoded;
                next();
            }
        });
    } else {
        res.status(403).json({ message: `Access invalidate` });
    }
};

export default {
    login,
    authenticate
};