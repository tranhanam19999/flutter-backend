const jwt = require('jsonwebtoken');
const User = require('../../model/user');
const utils = require('../../utils');
const constant = require('../../constant');

const getIndex = (req, res) => {
    res.status(200).json('Im from auth');
};

const signIn = (req, res) => {
    try {
        User.findOne({ username: req.body.username }, function (err, user) {
            if (user === null) {
                return res.status(400).send({
                    message: 'User not found.',
                });
            } else {
                if (!req.body.password) {
                    return res.status(400).send({
                        code: constant.respStatus.INVALID,
                        message: 'Missing Password',
                        error_code: constant.errorCode.INVALID,
                    });
                }
                if (user?.validPassword(req.body.password)) {
                    const token = jwt.sign(
                        { userId: user.userId, email: user.email },
                        process.env.TOKEN_KEY,
                        {
                            expiresIn: '30d',
                        }
                    );
                    // save user token
                    user.token = token;

                    return res.status(201).send({
                        code: constant.respStatus.OK,
                        data: user,
                        message: 'User Logged In',
                    });
                } else {
                    return res.status(400).send({
                        code: constant.respStatus.INVALID,
                        message: 'Wrong Password',
                        error_code: constant.errorCode.INVALID,
                    });
                }
            }
        });
    } catch (err) {
        res.status(404).json({
            code: constant.respStatus.INVALID,
            message: err.message,
            error_code: constant.errorCode.INVALID,
        });
    }
};

const signUp = (req, res) => {
    try {
        let newUser = new User(req.body);
        newUser.setPassword(req.body.password);
        newUser.userId = utils.hashCode(newUser.username);
        newUser.status = constant.UserStatus.ACTIVE

        const token = jwt.sign(
            { userId: newUser.userId, email: newUser.username },
            process.env.TOKEN_KEY,
            {
                expiresIn: '30d',
            }
        );
        newUser.token = token;

        newUser.save((err, _) => {
            if (err) {
                return res.status(400).send({
                    code: constant.respStatus.INVALID,
                    message: err.message,
                    error_code: constant.errorCode.FAILED_ACTION,
                });
            } else {
                return res.status(200).send({
                    code: constant.respStatus.OK,
                    data: newUser,
                    message: 'Create user successfully',
                });
            }
        });
    } catch (err) {
        res.status(404).json({
            code: constant.respStatus.INVALID,
            message: err.message,
            error_code: constant.errorCode.INVALID,
        });
    }
};

module.exports = { getIndex, signIn, signUp };
