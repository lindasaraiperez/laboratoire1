function Comment({ content, date }) {  // ← Prop renombrada
    return (
        <div className="card mb-3">
            <div className="card-body">
                <p>{content}</p>  {/* ← Usa content */}
                <small className="text-muted">
                    {new Date(date).toLocaleDateString('fr-FR')}
                </small>
            </div>
        </div>
    );
}