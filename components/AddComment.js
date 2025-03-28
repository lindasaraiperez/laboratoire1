function AddComment({ postId, onCommentAdded }) {
    const [contenu, setContenu] = React.useState("");
    const [isSubmitting, setIsSubmitting] = React.useState(false);
    const [error, setError] = React.useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (!contenu.trim()) {
            setError("Le commentaire ne peut pas être vide");
            return;
        }

        if (!window.confirm("Confirmez-vous l'envoi de ce commentaire ?")) return;

        setIsSubmitting(true);
        setError(null);

        try {
            const newComment = {
                id: Date.now(),
                idPost: postId,
                date: new Date().toISOString().split("T")[0],
                contenu: contenu
            };

            const response = await fetch("http://localhost:3000/comentaires", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(newComment)
            });

            if (!response.ok) throw new Error("Erreur d'envoi");

            setContenu("");
            onCommentAdded(newComment); // Notificar al padre
        } catch (err) {
            setError(err.message);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <section className="mt-4">
            <h3>Ajouter un commentaire</h3>
            {error && <div className="alert alert-danger">{error}</div>}
            <form onSubmit={handleSubmit}>
                <textarea
                    className="form-control mb-2"
                    rows="4"
                    value={contenu}
                    onChange={(e) => setContenu(e.target.value)}
                    disabled={isSubmitting}
                />
                <button 
                    type="submit" 
                    className="btn btn-primary"
                    disabled={isSubmitting}
                >
                    {isSubmitting ? "Envoi en cours..." : "Envoyer"}
                </button>
            </form>
        </section>
    );
}