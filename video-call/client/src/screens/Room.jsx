// import { useCallback, useEffect, useState } from "react";
// import ReactPlayer from 'react-player'
// import peer from '../service/peer';
// import { useSocket } from "../context/SocketProvider";

// const RoomPage = () => {
//     const socket = useSocket();
//     const [remoteSocketId, setRemoteSocketId] = useState(null);
//     const [myStream, setMyStream] = useState();
//     const [remoteStream, setRemoteStream] = useState();

//     const handleUserJoined = useCallback(({ email, id }) => {
//         console.log(`Joined user: ${email}`);
//         setRemoteSocketId(id);
//     }, []);

//     const handleCallUser = useCallback(async () => {
//         const stream = await navigator.mediaDevices.getUserMedia({
//             video: true, audio: true
//         });

//         const offer = await peer.getOffer();
//         socket.emit('user:call', { to: remoteSocketId, offer });
//         setMyStream(stream);
//     }, [remoteSocketId, socket]);

//     const handleIncomingCall = useCallback(async ({ from, offer }) => {
//         setRemoteSocketId(from);
//         const stream = await navigator.mediaDevices.getUserMedia({
//             video: true, audio: true
//         });
//         setMyStream(stream);

//         const ans = await peer.getAnswer(offer);
//         socket.emit('call:accepted', { to: from, ans });
//     }, [socket]);

//     const sendStreams = useCallback(() => {
//         for (const track of myStream.getTracks()) {
//             peer.peer.addTrack(track, myStream);
//         }
//     }, [myStream]);

//     const handleCallAccepted = useCallback(({ from, ans }) => {
//         peer.setLocalDescription(ans);
//         console.log("Call Accepted!");
//         sendStreams();
//     }, [sendStreams]);

//     const handleNegoNeeded = useCallback(async () => {
//         const offer = await peer.getOffer();
//         socket.emit('peer:nego:needed', { offer, to: remoteSocketId });
//     }, [remoteSocketId, socket]);

//     useEffect(() => {
//         peer.peer.addEventListener('negotiationneeded', handleNegoNeeded);
//         return () => {
//             peer.peer.removeEventListener('negotiationneeded', handleNegoNeeded);
//         }
//     }, [handleNegoNeeded]);

//     const handleNegoNeedIncoming = useCallback(async ({ from, offer }) => {
//         const ans = await peer.getAnswer(offer);
//         socket.emit('peer:nego:done', { to: from, ans });
//     }, [socket]);

//     const handleNegoNeedFinal = useCallback(async ({ from, ans }) => {
//         await peer.setLocalDescription(ans);
//     }, []);

//     useEffect(() => {
//         peer.peer.addEventListener('track', async (ev) => {
//             const remoteStream = ev.streams;
//             console.log('got tracks');
//             setRemoteStream(remoteStream[0]);
//         })
//     }, []);

//     useEffect(() => {
//         socket.on('user:joined', handleUserJoined);
//         socket.on('incoming:call', handleIncomingCall);
//         socket.on('call:accepted', handleCallAccepted);
//         socket.on('peer:nego:needed', handleNegoNeedIncoming)
//         socket.on('peer:nego:final', handleNegoNeedFinal)

//         return () => {
//             socket.off('user:joined', handleUserJoined);
//             socket.off('incoming:call', handleIncomingCall);
//             socket.off('call:accepted', handleCallAccepted);
//             socket.off('call:nego:needed', handleNegoNeedIncoming);
//             socket.off('call:nego:final', handleNegoNeedFinal);
//         }
//     },
//         [socket, handleUserJoined, handleIncomingCall, handleCallAccepted, handleNegoNeedIncoming, handleNegoNeedFinal]
//     );

//     return (
//         <div>
//             <h1>Room Page</h1>
//             <h4>{remoteSocketId ? "Room Joined" : "Room is empty"}</h4>
//             {myStream &&
//                 <button onClick={sendStreams}>Send Stream</button>
//             }
//             {remoteSocketId &&
//                 <button onClick={handleCallUser}>Call</button>
//             }

//             {myStream &&
//                 <>
//                     <h2>My Video</h2>
//                     <ReactPlayer playing muted height="100px" width="200px" url={myStream} />
//                 </>
//             }
//             {remoteStream &&
//                 <>
//                     <h2>Remote Video</h2>
//                     <ReactPlayer playing muted height="100px" width="200px" url={remoteStream} />
//                 </>
//             }
//         </div>
//     );
// }

// export default RoomPage;



// import { useCallback, useEffect, useState } from "react";
// import ReactPlayer from 'react-player'
// import peer from '../service/peer';
// import { useSocket } from "../context/SocketProvider";

// const RoomPage = () => {
//     const socket = useSocket();
//     const [remoteSocketId, setRemoteSocketId] = useState(null);
//     const [myStream, setMyStream] = useState();
//     const [remoteStream, setRemoteStream] = useState();

//     const handleUserJoined = useCallback(({ email, id }) => {
//         console.log(`Joined user: ${email}`);
//         setRemoteSocketId(id);
//     }, []);

//     const handleCallUser = useCallback(async () => {
//         const stream = await navigator.mediaDevices.getUserMedia({
//             video: true, audio: true
//         });

//         const offer = await peer.getOffer();
//         socket.emit('user:call', { to: remoteSocketId, offer });
//         setMyStream(stream);
//     }, [remoteSocketId, socket]);

//     const handleIncomingCall = useCallback(async ({ from, offer }) => {
//         setRemoteSocketId(from);
//         const stream = await navigator.mediaDevices.getUserMedia({
//             video: true, audio: true
//         });
//         setMyStream(stream);

//         const ans = await peer.getAnswer(offer);
//         socket.emit('call:accepted', { to: from, ans });
//     }, [socket]);

//     const sendStreams = useCallback(() => {
//         for (const track of myStream.getTracks()) {
//             peer.peer.addTrack(track, myStream);
//         }
//     }, [myStream]);

//     const handleCallAccepted = useCallback(({ from, ans }) => {
//         peer.setLocalDescription(ans);
//         console.log("Call Accepted!");
//         sendStreams();
//     }, [sendStreams]);

//     const handleNegoNeeded = useCallback(async () => {
//         const offer = await peer.getOffer();
//         socket.emit('peer:nego:needed', { offer, to: remoteSocketId });
//     }, [remoteSocketId, socket]);

//     useEffect(() => {
//         peer.peer.addEventListener('negotiationneeded', handleNegoNeeded);
//         return () => {
//             peer.peer.removeEventListener('negotiationneeded', handleNegoNeeded);
//         }
//     }, [handleNegoNeeded]);

//     const handleNegoNeedIncoming = useCallback(async ({ from, offer }) => {
//         const ans = await peer.getAnswer(offer);
//         socket.emit('peer:nego:done', { to: from, ans });
//     }, [socket]);

//     const handleNegoNeedFinal = useCallback(async ({ from, ans }) => {
//         await peer.setLocalDescription(ans);
//     }, []);

//     useEffect(() => {
//         peer.peer.addEventListener('track', async (ev) => {
//             const remoteStream = ev.streams;
//             console.log('got tracks');
//             setRemoteStream(remoteStream[0]);
//         })
//     }, []);

//     useEffect(() => {
//         socket.on('user:joined', handleUserJoined);
//         socket.on('incoming:call', handleIncomingCall);
//         socket.on('call:accepted', handleCallAccepted);
//         socket.on('peer:nego:needed', handleNegoNeedIncoming)
//         socket.on('peer:nego:final', handleNegoNeedFinal)

//         return () => {
//             socket.off('user:joined', handleUserJoined);
//             socket.off('incoming:call', handleIncomingCall);
//             socket.off('call:accepted', handleCallAccepted);
//             socket.off('call:nego:needed', handleNegoNeedIncoming);
//             socket.off('call:nego:final', handleNegoNeedFinal);
//         }
//     },
//         [socket, handleUserJoined, handleIncomingCall, handleCallAccepted, handleNegoNeedIncoming, handleNegoNeedFinal]
//     );

//     // New function to end the call
//     const endCall = useCallback(() => {
//         if (myStream) {
//             // Stop all media tracks in the local stream
//             myStream.getTracks().forEach(track => track.stop());
//             setMyStream(null);  // Clear local stream state
//         }

//         if (remoteStream) {
//             // Stop all media tracks in the remote stream (if needed)
//             remoteStream.getTracks().forEach(track => track.stop());
//             setRemoteStream(null);  // Clear remote stream state
//         }

//         // Close the peer connection
//         if (peer.peer) {
//             peer.peer.close();
//         }

//         // Optionally, notify the remote peer about the end of the call
//         if (remoteSocketId) {
//             socket.emit('call:ended', { to: remoteSocketId });
//         }

//         // Reset remote socket id
//         setRemoteSocketId(null);
//     }, [myStream, remoteStream, remoteSocketId, socket]);

//     useEffect(() => {
//         socket.on('call:ended', ({ from }) => {
//             console.log(`Call ended by ${from}`);
//             // Handle cleanup here (stop streams, update UI, etc.)
//             endCall(); // Call the function to clean up the call on the frontend
//         });

//         return () => {
//             socket.off('call:ended');
//         };
//     }, [socket]);


//     return (
//         <div>
//             <h1>Room Page</h1>
//             <h4>{remoteSocketId ? "Room Joined" : "Room is empty"}</h4>
//             {myStream &&
//                 <button onClick={sendStreams}>Send Stream</button>
//             }
//             {remoteSocketId &&
//                 <button onClick={handleCallUser}>Call</button>
//             }

//             {myStream &&
//                 <>
//                     <h2>My Video</h2>
//                     <ReactPlayer playing muted height="100px" width="200px" url={myStream} />
//                 </>
//             }
//             {remoteStream &&
//                 <>
//                     <h2>Remote Video</h2>
//                     <ReactPlayer playing muted height="100px" width="200px" url={remoteStream} />
//                 </>
//             }

//             {/* End Call Button */}
//             {myStream && remoteStream && (
//                 <button onClick={endCall}>End Call</button>
//             )}
//         </div>
//     );
// }

// export default RoomPage;



import { useCallback, useEffect, useState } from "react";
import ReactPlayer from 'react-player'
import peer from '../service/peer';
import { useSocket } from "../context/SocketProvider";

const RoomPage = () => {
    const socket = useSocket();
    const [remoteSocketId, setRemoteSocketId] = useState(null);
    const [myStream, setMyStream] = useState();
    const [remoteStream, setRemoteStream] = useState();

    const handleUserJoined = useCallback(({ email, id }) => {
        console.log(`Joined user: ${email}`);
        setRemoteSocketId(id);
    }, []);

    const handleCallUser = useCallback(async () => {
        const stream = await navigator.mediaDevices.getUserMedia({
            video: true, audio: true
        });

        const offer = await peer.getOffer();
        socket.emit('user:call', { to: remoteSocketId, offer });
        setMyStream(stream);
    }, [remoteSocketId, socket]);

    const handleIncomingCall = useCallback(async ({ from, offer }) => {
        setRemoteSocketId(from);
        const stream = await navigator.mediaDevices.getUserMedia({
            video: true, audio: true
        });
        setMyStream(stream);

        const ans = await peer.getAnswer(offer);
        socket.emit('call:accepted', { to: from, ans });
    }, [socket]);

    const sendStreams = useCallback(() => {
        for (const track of myStream.getTracks()) {
            peer.peer.addTrack(track, myStream);
        }
    }, [myStream]);

    const handleCallAccepted = useCallback(({ from, ans }) => {
        peer.setLocalDescription(ans);
        console.log("Call Accepted!");
        sendStreams();
    }, [sendStreams]);

    const handleNegoNeeded = useCallback(async () => {
        const offer = await peer.getOffer();
        socket.emit('peer:nego:needed', { offer, to: remoteSocketId });
    }, [remoteSocketId, socket]);

    useEffect(() => {
        peer.peer.addEventListener('negotiationneeded', handleNegoNeeded);
        return () => {
            peer.peer.removeEventListener('negotiationneeded', handleNegoNeeded);
        }
    }, [handleNegoNeeded]);

    const handleNegoNeedIncoming = useCallback(async ({ from, offer }) => {
        const ans = await peer.getAnswer(offer);
        socket.emit('peer:nego:done', { to: from, ans });
    }, [socket]);

    const handleNegoNeedFinal = useCallback(async ({ from, ans }) => {
        await peer.setLocalDescription(ans);
    }, []);

    useEffect(() => {
        peer.peer.addEventListener('track', async (ev) => {
            const remoteStream = ev.streams;
            console.log('got tracks');
            setRemoteStream(remoteStream[0]);
        })
    }, []);

    useEffect(() => {
        socket.on('user:joined', handleUserJoined);
        socket.on('incoming:call', handleIncomingCall);
        socket.on('call:accepted', handleCallAccepted);
        socket.on('peer:nego:needed', handleNegoNeedIncoming)
        socket.on('peer:nego:final', handleNegoNeedFinal)

        return () => {
            socket.off('user:joined', handleUserJoined);
            socket.off('incoming:call', handleIncomingCall);
            socket.off('call:accepted', handleCallAccepted);
            socket.off('call:nego:needed', handleNegoNeedIncoming);
            socket.off('call:nego:final', handleNegoNeedFinal);
        }
    },
        [socket, handleUserJoined, handleIncomingCall, handleCallAccepted, handleNegoNeedIncoming, handleNegoNeedFinal]
    );

    // New function to end the call
    const endCall = useCallback(() => {
        if (myStream) {
            // Stop all media tracks in the local stream
            myStream.getTracks().forEach(track => track.stop());
            setMyStream(null);  // Clear local stream state
        }

        if (remoteStream) {
            // Stop all media tracks in the remote stream (if needed)
            remoteStream.getTracks().forEach(track => track.stop());
            setRemoteStream(null);  // Clear remote stream state
        }

        // Close the peer connection
        if (peer.peer) {
            peer.peer.close();
        }

        // Optionally, notify the remote peer about the end of the call
        if (remoteSocketId) {
            socket.emit('call:ended', { to: remoteSocketId });
        }

        // Reset remote socket id
        setRemoteSocketId(null);
    }, [myStream, remoteStream, remoteSocketId, socket]);

    useEffect(() => {
        socket.on('call:ended', ({ from }) => {
            console.log(`Call ended by ${from}`);
            // Handle cleanup here (stop streams, update UI, etc.)
            endCall(); // Call the function to clean up the call on the frontend
        });

        return () => {
            socket.off('call:ended');
        };
    }, [socket]);

    return (
        <div className="container py-4">
            <h1 className="mb-4">Room Page</h1>
            <h4>{remoteSocketId ? "Room Joined" : "Room is empty"}</h4>

            <div className="d-flex justify-content-center mt-4">
                {myStream &&
                    <button className="btn btn-primary mx-2" onClick={sendStreams}>Send Stream</button>
                }
                {remoteSocketId &&
                    <button className="btn btn-success mx-2" onClick={handleCallUser}>Call</button>
                }
                {myStream && remoteStream && (
                    // <div className="text-center mt-3">
                    <button className="btn btn-danger mx-2" onClick={endCall}>End Call</button>
                    // </div>
                )}
            </div>

            <div className="d-flex justify-content-center">
                {myStream &&
                    <div className="my-4 text-center border border-2 border-secondary">
                        <h2>My Video</h2>
                        <ReactPlayer playing muted width="100%" url={myStream} />
                    </div>
                }

                <div className="m-4 border border-3 border-secondary"></div>

                {remoteStream &&
                    <div className="my-4 text-center border border-2 border-secondary">
                        <h2>Remote Video</h2>
                        <ReactPlayer playing muted width="100%" url={remoteStream} />
                    </div>
                }
            </div>

            {/* End Call Button */}
            {/* {myStream && remoteStream && (
                <div className="text-center mt-3">
                    <button className="btn btn-danger" onClick={endCall}>End Call</button>
                </div>
            )} */}
        </div>
    );
}

export default RoomPage;
