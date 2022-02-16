import React from 'react'

const Login = (props) => {

    const { user, handleInputs, setHomeText, getRecordData, setToken, setLogout, setUser } = props;

    const loginData = async (e) => {
        e.preventDefault()

        const { lemail, lpassword } = user;

        const res = await fetch('/users/login', {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                email: lemail,
                password: lpassword
            })
        })

        const data = await res.json()

        if (data.error) {
            window.alert(data.error)
        } else if (!data) {
            window.alert('Cannot Login')
        } else {
            window.alert('Login Successful')
            setToken(data.token)
            setTimeout(() => {
                getRecordData(data.token)
            }, 5000)
            setHomeText('Welcome back!!! ' + data.user.name)
            setLogout(false)
            setUser({ lemail: "", lpassword: "" })
        }
    }

    return (
        <div className='login'>
            {/* Login Modal  */}
            <div className="modal fade" id="loginModal" aria-labelledby="loginModalLabel">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="loginModalLabel">Login to Jeevan</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form method='POST'>
                                <div className="form-group">
                                    <label htmlFor="lemail">Email</label>
                                    <input type="email" className="form-control"
                                        name='lemail' id="lemail"
                                        placeholder="enter email"
                                        value={user.lemail || ""}
                                        onChange={handleInputs}
                                    />
                                    <small id="email-info" className="form-text text-muted">We'll never share your email with anyone
                                        else.</small>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="lpassword">Password</label>
                                    <input type="password" className="form-control"
                                        name='lpassword' id="lpassword"
                                        placeholder="enter password"
                                        onChange={handleInputs}
                                        value={user.lpassword || ""}
                                    />
                                </div>
                                <button type="submit" className="btn btn-primary" data-bs-dismiss="modal" onClick={loginData}>Submit</button>
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login