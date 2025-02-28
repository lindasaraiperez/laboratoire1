$(document).ready(function () {
    // Obtener publicaciones desde la API
    $.getJSON("http://localhost:3000/posts", function (posts) {
        $(".row").empty(); // Limpiar antes de insertar
        posts.slice(0, 9).forEach(post => { // Mostrar solo 9 publicaciones
            $(".row").append(`
                <div class="col-md-4 mb-4">
                    <div class="card blog-card">
                        <img src="assets/img/horizontal.jpg" alt="Blog image" class="card-img-top">
                        <div class="card-body">
                            <button class="btn blog-button ver-post" data-id="${post.id}">${post.title}</button>
                            <p class="card-text blog-description">${post.content.substring(0, 100)}...</p>
                        </div>
                    </div>
                </div>
            `);
        });

        // Evento para capturar el clic en los botones de los posts
        $(".ver-post").on("click", function () {
            let postId = $(this).data("id");
            window.location.href = `blogPost.html?id=${postId}`;
        });
    });
});






