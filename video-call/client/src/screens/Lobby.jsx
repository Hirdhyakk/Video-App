// import { useCallback, useEffect, useState } from "react";
// import { useSocket } from "../context/SocketProvider";
// import { useNavigate } from "react-router-dom";

// const LobbyScreen = () => {
//     const [email, setEmail] = useState('');
//     const [room, setRoom] = useState('');

//     const socket = useSocket();
//     const navigate = useNavigate();

//     const handleSubmitForm = useCallback((e) => {
//         e.preventDefault();
//         socket.emit('room:join', { email, room });
//     }, [email, room, socket]);

//     const handleJoinRoom = useCallback((data) => {
//         const { email, room } = data;
//         console.log(email, room);
//         navigate(`/room/${room}`);
//     }, [navigate]);

//     useEffect(() => {
//         socket.on('room:join', handleJoinRoom);
//         return () => {
//             socket.off('room:join', handleJoinRoom);
//         }
//     }, [socket, handleJoinRoom]);

//     return (
//         <div>
//             <h1>lobby</h1>
//             <form onSubmit={handleSubmitForm}>
//                 <label htmlFor="emailId">Email Id: </label>
//                 <input type="email" name="emailId" id="emailId" value={email} onChange={(e) => setEmail(e.target.value)} />
//                 <br />
//                 <label htmlFor="room">Room No: </label>
//                 <input type="text" name="room" id="room" value={room} onChange={(e) => setRoom(e.target.value)} />
//                 <br />
//                 <button type="submit">JOIN</button>
//             </form>
//         </div>
//     );
// };

// export default LobbyScreen;



import { useCallback, useEffect, useState } from "react";
import { useSocket } from "../context/SocketProvider";
import { useNavigate } from "react-router-dom";

const LobbyScreen = () => {
    const [email, setEmail] = useState('');
    const [room, setRoom] = useState('');

    const socket = useSocket();
    const navigate = useNavigate();

    const handleSubmitForm = useCallback((e) => {
        e.preventDefault();
        socket.emit('room:join', { email, room });
    }, [email, room, socket]);

    const handleJoinRoom = useCallback((data) => {
        const { email, room } = data;
        console.log(email, room);
        navigate(`/room/${room}`);
    }, [navigate]);

    useEffect(() => {
        socket.on('room:join', handleJoinRoom);
        return () => {
            socket.off('room:join', handleJoinRoom);
        }
    }, [socket, handleJoinRoom]);

    return (
        <div className="container py-5">
            <div className="row justify-content-center">
                <div className="col-md-6">
                    <div className="card shadow-lg">
                        <div className="card-body">
                            <h1 className="text-center mb-4">Lobby</h1>
                            <form onSubmit={handleSubmitForm}>
                                <div className="mb-3">
                                    <label htmlFor="emailId" className="form-label">Email Id:</label>
                                    <input
                                        type="email"
                                        name="emailId"
                                        id="emailId"
                                        className="form-control"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        required
                                    />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="room" className="form-label">Room No:</label>
                                    <input
                                        type="text"
                                        name="room"
                                        id="room"
                                        className="form-control"
                                        value={room}
                                        onChange={(e) => setRoom(e.target.value)}
                                        required
                                    />
                                </div>
                                <div className="text-center">
                                    <button type="submit" className="btn btn-primary w-100">Join Room</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LobbyScreen;
