const User = require("../model/user")

const checkCoupleDateRange = (time) => {
    setInterval(async () => {
        const distinctResult = await User.find()
        for (let i = 0; i < distinctResult?.length; i++) {
            if (distinctResult[i].matchTime) {
                const diffTime = Math.abs(Date.now() - distinctResult[i].matchTime)
                const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))

                if (diffDays / 30) {

                }
                if (diffDays === 365) {

                }
            }
        }
    }, time * 1000)
}

module.exports = { checkCoupleDateRange }
