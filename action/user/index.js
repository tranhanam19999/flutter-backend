const jwt = require('jsonwebtoken');
const User = require('../../model/user');
const constant = require('../../constant');

const config = process.env;

const getUserById = async (req, res) => {
    const { userId } = req.query;

    if (!userId) {
        if (req.query.token) {
            getUserInfosByToken(req, res);
            return;
        } else {
            res.status(constant.respStatus.INVALID).json({
                code: constant.respStatus.INVALID,
                message: 'INVALID_INPUT',
                error_code: constant.errorCode.INVALID,
            });
        }
    }

    const result = await findUserById(userId);
    res.status(constant.respStatus.OK).json({
        code: constant.respStatus.OK,
        data: result,
    });
};

const getAllUsers = async (req, res) => {
    let { limit, offset } = req.query;

    limit = parseInt(limit, 10);
    offset = parseInt(offset, 10);

    if (!limit || limit < 0 || Object.is(NaN, limit)) {
        limit = 20;
    }
    if (!offset || offset < 0 || Object.is(NaN, offset)) {
        offset = 0;
    }

    const totalUser = await User.find({}).count();
    const result = await User.find({}, { _id: 0, token: 0, salt: 0, hash: 0, __v: 0 })
        .skip(offset)
        .limit(limit);

    if (result.length === 0) {
        res.status(constant.respStatus.INVALID).json({
            code: constant.respStatus.INVALID,
            message: err.message,
            error_code: constant.errorCode.INVALID,
        });
    }

    res.status(constant.respStatus.OK).json({
        code: constant.respStatus.OK,
        message: 'Get list user succesfully',
        data: result,
        total: totalUser,
    });
};

const getUserInfosByToken = async (req, res) => {
    const { token } = req.query;
    const decoded = jwt.verify(token, config.TOKEN_KEY);
    const { userId } = decoded;

    const result = await findUserById(userId);
    res.status(constant.respStatus.OK).json({
        code: constant.respStatus.OK,
        data: result,
    });
};

const findUserById = async (userId) => {
    const result = await User.find(
        {
            userId: userId,
        },
        { _id: 0, token: 0, salt: 0, hash: 0, __v: 0, password: 0 }
    );

    return result;
};

const activeUser = async (req, res) => {
    const { userId } = req.query

    if (!userId) {
        res.status(constant.respStatus.INVALID).json({
            code: constant.respStatus.INVALID,
            message: "Invalid input",
            error_code: constant.errorCode.INVALID,
        });
        return;
    }

    const result = await User.findOneAndUpdate({
        userId: userId
    }, {
        status: constant.UserStatus.ACTIVE
    })

    res.status(constant.respStatus.OK).json({
        code: constant.respStatus.OK,
        data: result,
    });
}

const deactiveUser = async (req, res) => {
    const { userId } = req.query

    if (!userId) {
        res.status(constant.respStatus.INVALID).json({
            code: constant.respStatus.INVALID,
            message: "Invalid input",
            error_code: constant.errorCode.INVALID,
        });
        return;
    }

    const result = await User.findOneAndUpdate({
        userId: userId
    }, {
        status: constant.UserStatus.BANNED
    })

    res.status(constant.respStatus.OK).json({
        code: constant.respStatus.OK,
        data: result,
    });
}

module.exports = { getAllUsers, getUserById, getUserInfosByToken, activeUser, deactiveUser };
