import { useState } from 'react';
import './App.css';
import CreateRecord from './components/CreateRecord';
import Home from './components/Home';
import Login from './components/Login';
import Navbar from './components/Navbar';
import Signup from './components/Signup';

function App() {

  const [user, setUser] = useState({
    name: "", lemail: "", semail: "", lpassword: "", spassword: "", phone: "", token: ""
  })

  const [createRec, setCreateRec] = useState({
    name: "", affectedDate: "", recoveredDate: "", notes: ""
  })

  const [homeText, setHomeText] = useState('Login and Signup Hospital Record Data')
  const [records, setRecords] = useState([])
  const [token, setToken] = useState("")
  const [logout, setLogout] = useState(false)

  let resName, resValue;

  const handleInputs = (e) => {
    resName = e.target.name;
    resValue = e.target.value;

    setUser({ ...user, [resName]: resValue })
  }

  const getRecordData = async (token) => {
    const res = await fetch('/records/me', {
      method: 'GET',
      headers: {
        "Authorization": `Bearer ${token}`
      }
    })

    const data = await res.json()
    // console.log(data)
    if (data.error) {
      return window.alert(data.error)
    }
    setRecords(data)
  }


  return (
    <div className="App">
      <Navbar token={token} setLogout={setLogout} logout={logout} />

      {/* Login */}
      <Login
        user={user}
        handleInputs={handleInputs}
        setHomeText={setHomeText}
        getRecordData={getRecordData}
        setToken={setToken}
        setLogout={setLogout}
        setUser={setUser}
      />

      {/* Signup */}
      <Signup user={user} handleInputs={handleInputs} setHomeText={setHomeText} setUser={setUser} />


      {/* Create Records */}
      <CreateRecord
        createRec={createRec}
        setCreateRec={setCreateRec}
        token={token}
      />


      <div className="home-text">
        <Home
          title={homeText}
          records={records}
          token={token}
          getRecordData={getRecordData}
          logout={logout}
        />
      </div>
    </div>
  );
}

export default App;
