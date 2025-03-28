function Blog() {
    const params = new URLSearchParams(window.location.search);
        const postId = params.get('id');
    
        const [post, setPost] = React.useState(null);
        const [comments, setComments] = React.useState([]);
        const [loading, setLoading] = React.useState(true);
        const [error, setError] = React.useState(null);
    
        React.useEffect(() => {
    
    
            if (!postId) {
                setError("ID de post manquant dans l'URL");
                setLoading(false);
                return;
            }
    
            const fetchData = async () => {
                try {
                    const [postRes, commentsRes] = await Promise.all([
                        fetch(`http://localhost:3000/posts/${postId}`),
                        fetch(`http://localhost:3000/comentaires?idPost=${postId}`)
                    ]);
    
                    if (!postRes.ok) throw new Error('Post non trouvé');
                    if (!commentsRes.ok) throw new Error('Erreur de chargement des commentaires');
    
                    const postData = await postRes.json();
                    const commentsData = await commentsRes.json();
    
                    setPost(postData);
                    setComments(commentsData);
                } catch (err) {
                    setError(err.message);
                } finally {
                    setLoading(false);
                }
            };
    
            fetchData();
        }, [postId]);
    
        const handleNewComment = async (contenu) => {
            try {
                const newComment = {
                    idPost: postId,
                    contenu,
                    date: new Date().toISOString().split("T")[0]
                };
    
                const response = await fetch("http://localhost:3000/comentaires", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(newComment)
                });
    
                if (!response.ok) throw new Error("Erreur d'envoi");
    
                const addedComment = await response.json();
                setComments([...comments, addedComment]);
            } catch (err) {
                console.error("Erreur:", err);
                alert("Erreur lors de l'ajout du commentaire");
            }
        };
    
        if (loading) return (
            <div className="text-center my-5">
                <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">Chargement...</span>
                </div>
            </div>
        );
    
        if (error) return (
            <div className="alert alert-danger my-5">
                {error}
            </div>
        );
    
        if (!post) return null;
    
        return (
            <>
                <Header />
                <main className="container">
                    <article className="blog-content">
                        <img 
                            src="../assets/img/horizontal.jpg" 
                            alt={post.title} 
                            className="img-fluid rounded mb-4"
                        />
                        <h1 className="blog-title mb-3 text-center">{post.title}</h1>
                        <p className="text-muted mb-4">
                            Par {post.author}, le {new Date(post.date).toLocaleDateString('fr-FR')}
                        </p>
                        <div className="blog-text">
                            <p>{post.content}</p>
                        </div>
                    </article>
    
                    <section className="mt-5">
                        <h2>Commentaires ({comments.length})</h2>
                        {comments.length === 0 ? (
                            <p className="text-muted">Aucun commentaire</p>
                        ) : (
                            <div className="mt-3">
                                {comments.map(comment => (
                                    <div key={comment.id} className="card mb-3">
                                        <div className="card-body">
                                            <p>{comment.contenu}</p>
                                            <small className="text-muted">
                                                {new Date(comment.date).toLocaleDateString('fr-FR')}
                                            </small>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </section>
    
                    <section className="mt-4">
                        <h3>Ajouter un commentaire</h3>
                        <form onSubmit={(e) => {
                            e.preventDefault();
                            const formData = new FormData(e.target);
                            const contenu = formData.get('contenu');
                            if (contenu.trim()) handleNewComment(contenu);
                            e.target.reset();
                        }}>
                            <textarea
                                name="contenu"
                                className="form-control mb-2"
                                rows="4"
                                required
                            />
                            <button type="submit" className="btn btn-primary">
                                Envoyer
                            </button>
                        </form>
                    </section>
                </main>
                <Footer />
            </>
        );
    }
    
    const root = ReactDOM.createRoot(document.getElementById('root'));
    root.render(<Blog />);
    
    