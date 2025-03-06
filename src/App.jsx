import { useState , useEffect} from 'react'
import './App.css'
import LoginPage from './Components/LoginPage'
import QRCodeScanner from './Components/QRCodeScanner';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Swal from "sweetalert2"

function App() {

  const [user, setUser] = useState(null)

  useEffect(() => {
    let userinLS = JSON.parse(localStorage.getItem("UserData"));
    if (userinLS) {
      setUser(userinLS);
    }
  }, [])

    const handleScanSuccess = async (scannedCode) => {
      console.log(scannedCode);
      
      let response = await axios.post("https://qr-code-app-backend.onrender.com/qr/scan-qr", {scannedCode}, {headers: {"email" : user?.email}}, {withCredentials: true});
      
      console.log(response?.data);

      if (response.data.result) {
        Swal.fire({
          title: "Good job !",
          text: "Qr Successfuly Scanned",
          icon: "success"
        });
        }else {
        Swal.fire({
          title: "Qr Already Scanned",
          text: "Something went wrong!",
          icon: "error",
        })
      }
    }
  
    const handleScanError = (error) => {
      console.error("Error scanning QR Code:", error)
    }
  return (
    <>
    {
      !user ? <LoginPage/>
      :
    <div className='main-container flex justify-center items-center'>
      <div className='w-2xl border border-black px-10 py-5'>
        <h1 className='text-3xl font-bold text-center'>QR Code Scanner</h1>
        <QRCodeScanner onScanSuccess={handleScanSuccess} onScanError={handleScanError}/>
      </div>
    </div>
    }
    </>
  )
}

export default App
