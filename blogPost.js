//obtencion id 
$(document).ready(function () {
    let params = new URLSearchParams(window.location.search);
    let postId = params.get("id");

    if (postId) {
        $.getJSON(`http://localhost:3000/posts/${postId}`, function (post) {
            $("#post-title").text(post.title);
            $("#post-body").text(post.content);
        });
    }
});




//obtener la información del contenido de las publicaciones
$(document).ready(function () {
    let urlParams = new URLSearchParams(window.location.search);
    let postId = urlParams.get("id");

    if (!postId) {
        console.error("ID de la publicación no encontrado en la URL.");
        $("#post-container").html("<p>Error: Publicación no encontrada.</p>");
        return;
    }

    $.ajax({
        url: `http://localhost:3000/posts/${postId}`,
        method: "GET",
        dataType: "json",
        success: function (post) {
            $("#post-title").text(post.title);
            $("#post-introduction").text(post.content);
            $("#post-contenu").text(post.content);
            $("#post-author").text(post.author);
            $("#post-date").text(post.date);
        },
        error: function (xhr, status, error) {
            console.error("Error al obtener la publicación:", error);
            $("#post-container").html("<p>No se pudo cargar la publicación.</p>");
        }
    });
});



//obtener los comentarios de manera dinamica y que solo se muestren los que pertenecen a determinado post 
$(document).ready(function () {
    // Obtener el ID del post desde la URL
    const urlParams = new URLSearchParams(window.location.search);
    const postId = urlParams.get("id");

    if (!postId) {
        console.error("No se encontró el ID del post en la URL");
        return;
    }

    // obtener los comentarios desde la API
    $.getJSON("http://localhost:3000/comentaires", function (comentaries) {
        $(".row").empty(); // Limpiar antes de insertar

        // filtrar comentarios que pertenecen al post 
        const commentairesFiltre = comentaries.filter(comentaire => comentaire.idPost === postId);

        // mostrar solo los comentarios de la publicación
        if (commentairesFiltre.length > 0) {
            commentairesFiltre.forEach(comentaire => {
                $(".row").append(`
                    <div class="container mt-4">
                        <div class="chat-box" id="comentaire-container">
                            <div class="message d-flex align-items-start">
                                <img src="assets/img/avatar.jpg" alt="Perfil" class="profile-img">
                                <p class="message-text" id="contenu-comentaire">${comentaire.contenu}</p>
                            </div>
                        </div>
                    </div>
                `);
            });
        } else {
            $(".row").append("<p>No hay comentarios aún.</p>");
        }
    });
});


//publicar un comentario
$(document).ready(function () {
    let urlParams = new URLSearchParams(window.location.search);
    let postId = urlParams.get("id");
    

    $("#cometarieForm").submit(function (event) {
        event.preventDefault(); // Evita que se envie automaticamente el formulario
        
        if (!postId) {
            alert("Erreur : Aucun post sélectionné !");
            return;
        }
        // dialogo de confirmación
        var confirmation = confirm("Êtes-vous sûr de vouloir ajouter ce comentaire ?");
        if (confirmation) {
            addComentarie(); // enviar datos a JSON Server
        }
    });


    function addComentarie() {
        var comentaireData = {
            id: Date.now(), // ID único basado en timestamp
            idPost: postId,
            date: new Date().toISOString().split("T")[0],
            contenu: $("#contenu").val()
        };

        $.ajax({
            url: "http://localhost:3000/comentaires",
            type: "POST",
            contentType: "application/json",
            data: JSON.stringify(comentaireData),
            success: function (response) {
                alert("Comentaire ajouté avec succès !");
                $("#contenu").val(""); // Limpiar el campo después de enviar
                location.reload(); // Recargar la página para ver el nuevo comentario
            },
            error: function (error) {
                alert("Erreur lors de l'ajout du post !");
                console.log(error);
            }
        });
    }
});
