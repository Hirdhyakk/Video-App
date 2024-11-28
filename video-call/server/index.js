// const { Server } = require("socket.io");
// const io = new Server(8000, {
//     cors: {
//         origin: true,
//     }
// });

// const emailToSocketIdMap = new Map();
// const socketidToEmailMap = new Map();

// io.on('connection', (socket) => {
//     console.log(`Socket Connected`, socket.id);
//     socket.on('room:join', data => {
//         console.log(data);
//         const { email, room } = data;
//         emailToSocketIdMap.set(email, socket.id);
//         socketidToEmailMap.set(socket.id, email);
//         io.to(room).emit('user:joined', { email, id: socket.id });
//         socket.join(room);
//         io.to(socket.id).emit('room:join', data);
//     })

//     socket.on("user:call", ({ to, offer }) => {
//         io.to(to).emit("incoming:call", { from: socket.id, offer });
//     })

//     socket.on("call:accepted", ({ to, ans }) => {
//         io.to(to).emit("call:accepted", { from: socket.id, ans });
//     })

//     socket.on("peer:nego:needed", ({ to, offer }) => {
//         io.to(to).emit("peer:nego:needed", { from: socket.id, offer });
//     })

//     socket.on("peer:nego:done", ({ to, ans }) => {
//         io.to(to).emit("peer:nego:final", { from: socket.id, ans });
//     })
// });



const { Server } = require("socket.io");
const io = new Server(8000, {
    cors: {
        origin: true,
    }
});

const emailToSocketIdMap = new Map();
const socketidToEmailMap = new Map();

io.on('connection', (socket) => {
    console.log(`Socket Connected`, socket.id);

    // User joins room
    socket.on('room:join', data => {
        console.log(data);
        const { email, room } = data;
        emailToSocketIdMap.set(email, socket.id);
        socketidToEmailMap.set(socket.id, email);
        io.to(room).emit('user:joined', { email, id: socket.id });
        socket.join(room);
        io.to(socket.id).emit('room:join', data);
    });

    // Handling incoming call
    socket.on("user:call", ({ to, offer }) => {
        io.to(to).emit("incoming:call", { from: socket.id, offer });
    });

    // Handling call accepted by remote user
    socket.on("call:accepted", ({ to, ans }) => {
        io.to(to).emit("call:accepted", { from: socket.id, ans });
    });

    // Handling negotiation required between peers
    socket.on("peer:nego:needed", ({ to, offer }) => {
        io.to(to).emit("peer:nego:needed", { from: socket.id, offer });
    });

    socket.on("peer:nego:done", ({ to, ans }) => {
        io.to(to).emit("peer:nego:final", { from: socket.id, ans });
    });

    // Handling end of call (user disconnects or decides to end the call)
    socket.on('call:ended', ({ to }) => {
        console.log(`Ending call for ${socket.id} to ${to}`);
        // Notify the other user that the call has ended
        io.to(to).emit('call:ended', { from: socket.id });

        // Optionally clean up and remove from the maps
        const email = socketidToEmailMap.get(socket.id);
        if (email) {
            emailToSocketIdMap.delete(email);
            socketidToEmailMap.delete(socket.id);
        }

        // Optionally, you can remove the user from the room if necessary
        // socket.leave(room); // if you need to track rooms
    });

    // Clean up when socket disconnects
    socket.on('disconnect', () => {
        console.log(`Socket Disconnected`, socket.id);
        const email = socketidToEmailMap.get(socket.id);
        if (email) {
            emailToSocketIdMap.delete(email);
            socketidToEmailMap.delete(socket.id);
        }
    });
});
