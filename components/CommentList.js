function CommentList({ postId }) {
    const [comments, setComments] = React.useState([]);
    const [loading, setLoading] = React.useState(true);
    const [error, setError] = React.useState(null);

    React.useEffect(() => {
        const fetchComments = async () => {
            try {
                const response = await fetch(`http://localhost:3000/comentaires?idPost=${postId}`);
                if (!response.ok) throw new Error("Erreur de chargement des commentaires");
                const data = await response.json();
                setComments(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        if (postId) fetchComments();
    }, [postId]);

    if (loading) return <div className="text-center my-3">Chargement...</div>;
    if (error) return <div className="alert alert-danger">{error}</div>;

    return (
        <section className="mt-4">
            <h2>Commentaires ({comments.length})</h2>
            {comments.length === 0 ? (
                <p className="text-muted">Aucun commentaire</p>
            ) : (
                comments.map(comment => (
                    <Comment 
                        key={comment.id} 
                        content={comment.contenu}  
                        date={comment.date}
                    />
                ))
            )}
        </section>
    );
}

