const Motto = require("../../model/motto")
const constant = require('../../constant');

const getListMotto = async (req, res) => {
    const { creatorId } = req.query

    if (!creatorId) {
        res.json({
            code: constant.respStatus.INVALID,
            message: "Invalid input",
            error_code: constant.errorCode.INVALID,
        });

        return
    }

    const mottos = await Motto.find({
        creatorId: creatorId
    })

    if (mottos?.length === 0) {
        const initResult = _initMottos(creatorId)

        await Motto.insertMany(initResult)
    }

    return res.status(200).send({
        code: constant.respStatus.OK,
        data: mottos,
        message: "Query motto successfully",
    })
}

const _initMottos = (creatorId) => {
    const mockData = [
        {
            content: "Bên em thôi, đừng bên ai. Yêu em thôi, đừng thêm ai."
        },
        {
            content: "Trên thế giới có 6 tỉ người. Anh nhớ em bởi vì 5,999,999,999 người còn lại không thể nào thay thế một người đặc biệt như em."
        },
        {
            content: "Tình yêu không phải là những lời thề non hẹn biển, chỉ đơn giản là cùng nhau bình yên qua ngày."
        },
        {
            content: "Muốn hạnh phúc trong tình yêu hãy cho đi nhiều hơn, hãy tha thứ, hãy thông cảm, và hãy yêu thương nhiều hơn."
        },
        {
            content: "Anh có thể chỉ mất 3 giây để yêu em. Nhưng để quên được em a chắc chắn rằng sẽ phải mất cả cuộc đời của anh."
        },
        {
            content: "Yêu chính là muốn ở bên một người, không muốn xa người đó dù chỉ là một giây."
        },
        {
            content: "Tin tưởng vào lời hứa xa bao lâu cũng tìm nhau. Giữ gìn là trọng trách đôi vai anh thêm sức mạnh."
        },
        {
            content: "Đừng vì quá cô đơn mà nắm nhầm 1 bàn tay. Đừng vì quá lạnh mà vội ôm 1 bờ vai."
        },
        {
            content: "Khi yêu ai đó cách mà người ấy gọi tên bạn cũng khiến bạn mỉm cười hạnh phúc."
        },
        {
            content: "Chocolate đắng đầu lưỡi nhưng ngọt ở cuống họng, như tình yêu em dành cho anh."
        },
        {
            content: "Anh có thể làm mọi thứ cho em, ngoại trừ việc yêu em lần nữa."
        },
        {
            content: "Một cách đơn giản để hạnh phúc là tôn trọng những gì mình đang có."
        },
        {
            content: "Tình yêu biến những điều vô nghĩa của cuộc đời thành những gì có ý nghĩa, làm cho những bất hạnh trở thành hạnh phúc."
        },
        {
            content: "Em không cần một tình yêu quá lớn, nhưng em cần một tình yêu vừa đủ… để em cảm thấy an tâm."
        },
        {
            content: "Nhà anh có bán rượu không mà sao nói chuyện với anh em say quá."
        },
        {
            content: "Chỉ cần chúng ta yêu ai đó bằng cả trái tim thì đó luôn được gọi là mối tình đầu."
        },
    ]

    const mapping = mockData.map(motto => (
        {
            creatorId: creatorId,
            ...motto
        }
    ))

    return mapping
}

module.exports = { getListMotto }
