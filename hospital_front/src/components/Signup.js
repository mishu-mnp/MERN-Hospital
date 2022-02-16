import React from 'react'

const Signup = (props) => {

    const { user, handleInputs, setHomeText, setUser } = props;

    const signUpData = async (e) => {
        e.preventDefault()

        const { name, semail, spassword, phone, token } = user;
        // console.log("User", user)

        const res = await fetch('/user', {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                name: name,
                email: semail,
                password: spassword,
                phone: phone,
                token: token
            })
        })

        const data = await res.json();
        // console.log(data)

        if (data.error) {
            window.alert(data.error)
        } else if (!data) {
            window.alert('Sorry! You are not Registered try again')
            console.log('Sorry! You are not Registered try again')
        } else {
            window.alert('You registered successfully')
            console.log('You registered successfully')
            setHomeText('Welcome to Jeevan!!! ' + name)
            setUser({ name: "", semail: "", spassword: "", phone: "" })
        }
    }

    return (
        <div className='signup'>
            {/* SignUp Modal  */}
            <div className="modal fade" id="signupModal" aria-labelledby="signupModalLabel">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="signupModalLabel">Create an account on Jeevan</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form method='POST'>
                                <div className="form-group">
                                    <label htmlFor="name">Name</label>
                                    <input type="text" className="form-control"
                                        name="name" id="name"
                                        value={user.name || ""}
                                        onChange={handleInputs}
                                        placeholder="Name" />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="semail">Email</label>
                                    <input type="email" className="form-control"
                                        name="semail" id="semail"
                                        value={user.semail || ""}
                                        onChange={handleInputs}
                                        placeholder="enter email" />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="spassword">Password</label>
                                    <input type="password" className="form-control"
                                        name='spassword' id="spassword"
                                        value={user.spassword || ""}
                                        onChange={handleInputs}
                                        placeholder="enter password" />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="phone">Phone</label>
                                    <input type="tel" className="form-control"
                                        name='phone' id="phone"
                                        value={user.phone || ""}
                                        onChange={handleInputs}
                                        placeholder="enter phone no." />
                                </div>
                                <button type="submit" className="btn btn-primary" onClick={signUpData}>Submit</button>
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

export default Signup