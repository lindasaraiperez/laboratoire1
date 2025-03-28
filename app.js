function App() {
    return (
        <>
            <Header />
            <main className="container">
                <BlogList />
            </main>
            <Footer />
        </>
    );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);