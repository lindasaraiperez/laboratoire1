function Header() {
    return (
        <>
            <header className="header">
                <nav className="navbar navbar-expand-lg custom-navbar">
                    <div className="container">
                        <a className="navbar-brand" href="index.html">
                            <img src="../assets/img/logo.jpg" alt="Logo" className="logo" />
                        </a>
                        <button 
                            className="navbar-toggler" 
                            type="button" 
                            data-bs-toggle="collapse"
                            data-bs-target="#navbarSupportedContent" 
                            aria-controls="navbarSupportedContent"
                            aria-expanded="false" 
                            aria-label="Toggle navigation"
                        >
                            <span className="navbar-toggler-icon"></span>
                        </button>
                        <div className="collapse navbar-collapse" id="navbarSupportedContent">
                            <ul className="navbar-nav mx-auto mb-2 mb-lg-0">
                                <li className="nav-item">
                                    <a className="nav-link" href="#">Accueil</a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link" href="#">Articles</a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link" href="#">Services</a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link" href="#">Contact</a>
                                </li>
                            </ul>
                            <ul className="navbar-nav ms-auto">
                                <li className="nav-item">
                                    <a className="nav-link" href="#">
                                        <i className="bi bi-person-circle icon-user"></i>
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </nav>
            </header>
            
            <main className="container">
                <div className="search-sort d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center">
                    <input 
                        type="text" 
                        className="form-control search-bar w-100 w-md-50 mb-2 mb-md-0" 
                        placeholder="Rechercher..." 
                    />
                    <div className="sort d-flex align-items-center gap-2 w-100 w-md-50">
                        <label htmlFor="sort" className="mb-0 w-25 text-end">Trier par :</label>
                        <select id="sort" className="form-select w-75 custom-select">
                            <option value="recent">Récent</option>
                            <option value="populaire">Populaire</option>
                        </select>
                    </div>
                </div>
            </main>
        </>
    );
}