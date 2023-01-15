$(function() {
    const socket = io();
    var nick = '';

    const messageForm = $("#messages-form");
    const messageBox = $("#message");
    const chat = $("#chat");

    const nickForm = $("#nick-form");
    const nickError = $("#nick-error");
    const nickName = $("#nick-name");

    const usernames = $("#usernames");

    messageForm.submit( e =>{
        e.preventDefault();
        socket.emit("enviarMensaje", messageBox.val());
        messageBox.val("");
    })

    socket.on("nuevoMensaje", function(datos){

        let color = "#f4f4f4";
        if(nick == datos.username){
            color = "#9ff4c5";
        }

        chat.append(`<div class="msg-area mb-2 d-flex" style="background-color:${color}"><b class="username_bold">${datos.username}: </b><p class="msg">${datos.msg}</p></div>`)
    });

    nickForm.submit( e =>{
        e.preventDefault();
        socket.emit("nuevoUsuario", nickName.val(), datos =>{
            if(datos){
                nick = nickName.val();
                $("#nick-wrap").hide();
                $("#content-wrap").show();
            } else {
                nickError.html('<div class="alert alert-danger">The user already exists</div>');
            }

            nickName.val("");
        });
    });

    socket.on("nombreUsuario", datos =>{
        let html = "";
        let color = "";
        let salir = "";

        for(let i = 0; i < datos.length; i++){
            if(nick == datos[i]){
                color = "#027f43";
                salir = '<a class="enlace-salir" href="/">Salir</a>';
            } else {
                color = "#000";
                salir = "";
            }

            html += `<p style="color: ${color}">${datos[i]} ${salir}</p>`;
            usernames.html(html);
        }
    });

    socket.on("usuarioDesconectado", datos =>{
        let color = "#878787";
        chat.append(`<div class="msg-area mb-2 d-flex" style="color:${color}"><p class="msg"><em><b>${datos.username}</b> disconnected</em></p></div>`)
    })

    socket.on("usuarioSeConecto", datos =>{
        let color = "#9ff4c5";
        chat.append(`<div class="msg-area mb-2 d-flex" style="color:${color}"><p class="msg"><em><b>${datos.username}</b> joined</em></p></div>`)
    });
})

