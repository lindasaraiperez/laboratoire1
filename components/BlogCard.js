function BlogCard({ post }) {
    const handleClick = () => {
        window.location.href = `blog.html?id=${post.id}`;;
    };

    return (
        <div className="col-md-4 mb-4">
            <div className="card blog-card">
                <img src="../assets/img/horizontal.jpg" alt="Blog image" className="card-img-top" />
                <div className="card-body">
                    <button 
                        className="btn blog-button ver-post" 
                        onClick={handleClick}
                    >
                        {post.title}
                    </button>
                    <p className="card-text blog-description">
                        {post.content.substring(0, 100)}...
                    </p>
                </div>
            </div>
        </div>
    );
}