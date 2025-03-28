function Comment({ content, date }) {  
    return (
        <div className="card mb-3">
            <div className="card-body">
                <p>{content}</p>
                <small className="text-muted">
                    {new Date(date).toLocaleDateString('fr-FR')}
                </small>
            </div>
        </div>
    );
}