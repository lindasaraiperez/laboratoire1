function BlogDetails({ post, comments, onNewComment }) {
    return (
        <main className="container">
            <article className="blog-content">
                <div className="blog-image-container mb-4">
                    <img 
                        src="../assets/img/horizontal.jpg" 
                        alt={post.title} 
                        className="img-fluid rounded"
                        style={{ maxHeight: '400px', width: '100%', objectFit: 'cover' }}
                    />
                </div>
                
                <h1 className="blog-title mb-3">{post.title}</h1>
                <div className="blog-meta mb-4">
                    <p className="text-muted">
                        Par <span className="author-name">{post.author}</span>, le {' '}
                        {new Date(post.date).toLocaleDateString('fr-FR', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric'
                        })}
                    </p>
                </div>
                <div className="blog-text">
                    <p className="lead">{post.content}</p>
                </div>
            </article>

            <CommentList comments={comments} />
            <AddComment onCommentAdded={onNewComment} />
        </main>
    );
}