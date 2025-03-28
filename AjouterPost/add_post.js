$(document).ready(function () {
    $("#postForm").submit(function (event) {
        event.preventDefault(); // Evita que se envíe automáticamente el formulario

        // Diálogo de confirmación
        var confirmation = confirm("Êtes-vous sûr de vouloir ajouter ce post ?");
        if (confirmation) {
            addPost(); // Enviar datos a JSON Server
        }
    });

    function addPost() {
        var postData = {
            id: Date.now(), // ID único basado en timestamp
            title: $("#title").val(),
            author: $("#author").val(),
            date: new Date().toISOString().split("T")[0],
            content: $("#content").val()
        };

        $.ajax({
            url: "http://localhost:3000/posts",
            type: "POST",
            contentType: "application/json",
            data: JSON.stringify(postData),
            
            success: function (response) {
                console.log("Redirigiendo a index.html..."); 
                window.location.href = "index.html"; 
                alert("Post ajouté avec succès !");
            },
            error: function (error) {
                alert("Erreur lors de l'ajout du post !");
                console.log(error);
            }
        });
    }
});
