const Memory = require("../../model/memory")
const constant = require('../../constant');

const getSingleMemory = async (req, res) => {
    const { memoryId } = req.query

    if (!memoryId) {
        res.status(constant.respStatus.INVALID).json({
            code: constant.respStatus.INVALID,
            message: 'INVALID_INPUT',
            error_code: constant.errorCode.INVALID,
        });
    }

    const memory = Memory.findOne({
        memoryId
    })

    res.status(constant.respStatus.OK).json({
        code: constant.respStatus.OK,
        data: memory,
    });
}

const getListMemory = async (req, res) => {
    let { limit, offset } = req.query;

    limit = parseInt(limit, 10);
    offset = parseInt(offset, 10);

    if (!limit || limit < 0 || Object.is(NaN, limit)) {
        limit = 20;
    }
    if (!offset || offset < 0 || Object.is(NaN, offset)) {
        offset = 0;
    }

    const totalMemory = await Memory.find({}).count();
    const result = await Memory.find({}, { _id: 0, token: 0, salt: 0, hash: 0, __v: 0 })
        .skip(offset)
        .limit(limit);

    if (result.length === 0) {
        res.status(constant.respStatus.INVALID).json({
            code: constant.respStatus.NOT_FOUND,
            message: "Not foudn any memories",
            error_code: constant.errorCode.NOT_FOUND,
        });
    }

    res.status(constant.respStatus.OK).json({
        code: constant.respStatus.OK,
        message: 'Get list memory succesfully',
        data: result,
        total: totalMemory,
    });
}

module.exports = {
    getSingleMemory,
    getListMemory
}
