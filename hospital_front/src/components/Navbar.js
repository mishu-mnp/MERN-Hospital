import React from 'react';
import './navbar.css';


const Navbar = ({ token, setLogout }) => {

    const handleLogout = async () => {
        const res = await fetch('/user/logout', {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${token}`
            }
        })

        const data = await res.json()

        if (res.status === 500 || res.status === 501 || !data) {
            return window.alert(data.error)
        }

        setLogout(true)
    }

    return (
        <>
            {/* Navigation Bar  */}
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                <div className="container-fluid">
                    <a className="navbar-brand" href="/">Jeevan</a>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse"
                        data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false"
                        aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <div className="mx-2 btn-right">
                            <button className="btn btn-success" data-bs-toggle="modal" data-bs-target="#loginModal">Login</button>
                            <button className="btn btn-success" data-bs-toggle="modal" data-bs-target="#signupModal">SignUp</button>
                            <button className="btn btn-success" data-bs-toggle="modal" data-bs-target="#recordModal">Create Record</button>
                            <button className="btn btn-danger" onClick={handleLogout}>Logout</button>
                        </div>
                    </div>
                </div>
            </nav>
        </>
    )
}

export default Navbar