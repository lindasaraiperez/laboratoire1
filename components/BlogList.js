function BlogList() {
    const [posts, setPosts] = React.useState([]);

    React.useEffect(() => {
        const fetchPosts = async () => {
            try {
                const response = await fetch('http://localhost:3000/posts');
                if (!response.ok) {
                    throw new Error('Error al cargar los posts');
                }
                const data = await response.json();
                setPosts(data.slice(0, 9)); 
            } catch (err) {
                console.error('Error fetching posts:', err);
            }
        };

        fetchPosts();
    }, []);

    return (
        <div className="row">
            {posts.map(post => (
                <BlogCard key={post.id} post={post} />
            ))}
        </div>
    );
}