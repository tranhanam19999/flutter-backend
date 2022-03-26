const levenshtein = require('js-levenshtein');
const { FindPartner } = require('../../model/chat');
const { normalizeObjToStrings } = require('../../utils');
const socketHandler = require('../../utils/socket');

const removeAllEvents = (socket) => {
    socket.removeAllListeners();
    socket.offAny();
};

const createConnection = (req, res) => {
    const io = socketHandler.handleSocketConnection();
    io.on('connection', (socket) => {
        // console.log('connected ', socket.id)
        removeAllEvents(socket);

        socket.on('open_room', ({ receiver, sender }) => {
            if (receiver && sender) {
                let roomId = [receiver, sender].sort().join('_');

                socket.join(roomId);
                socket.emit('open_room_success', {
                    status: 'OK',
                    roomId: roomId,
                });
            }
        });

        socket.on('send_text', ({ receiver, sender, text }) => {
            let roomId = [receiver, sender].sort().join('_');
            socket.to(roomId).emit('receive_text', {
                sender: sender,
                receiver: receiver,
                text,
            });
        });

        socket.on('find_partner', async ({ gender, age, source, socketId }) => {
            try {
                const findModel = new FindPartner({ gender, age, source, socketId });
                findModel.hash = normalizeObjToStrings({
                    gender: gender,
                    from: age.from,
                    to: age.to,
                });
                console.log('FIND_PARTNER ', source, socketId)
                await FindPartner.create(findModel);
                socket.emit('find_partner_pending');
            } catch (err) {
                console.log(err);
                socket.emit('disconnect_chat');
            }
        });

        socket.on('disconnect', () => {
            removeAllEvents(socket);
        });
    });

    // res.header("Access-Control-Allow-Origin", "*");
};



module.exports = { createConnection };
