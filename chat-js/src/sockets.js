module.exports = (io) =>{

    let nickNames = [];

    io.on("connection", socket => {
        console.log("[+] User connected");

        socket.on("enviarMensaje", (datos) =>{
            io.sockets.emit("nuevoMensaje", {
                msg:datos,
                username:socket.nickname
            });
        });

        socket.on("nuevoUsuario", (datos, callback) =>{
            if(nickNames.indexOf(datos) != -1){
                callback(false);
            } else {
                callback(true);
                socket.nickname = datos;
                nickNames.push(socket.nickname);


                io.sockets.emit("nombreUsuario", nickNames);
            }

            socket.emit("usuarioSeConecto", {
                username: socket.nickname
            });

        });

        socket.on("disconnect", datos =>{
            console.log("[-] User disconnected");
            if(!socket.nickname){
                return;
            } else {
                nickNames.splice(nickNames.indexOf(socket.nickname), 1);
                io.sockets.emit("nombreUsuario", nickNames);
                io.sockets.emit("usuarioDesconectado", {
                    username:socket.nickname
                });
            }
        });
    })
}