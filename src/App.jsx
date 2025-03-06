import { useState , useEffect} from 'react'
import './App.css'
import LoginPage from './Components/LoginPage'
import QRCodeScanner from './Components/QRCodeScanner';
import { data, useNavigate } from 'react-router-dom';
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
    try {
      // Make the API request
      const response = await axios.post(
        "https://qr-code-app-backend.onrender.com/qr/scan-qr",
        { scannedCode },
        {
          headers: { email: user?.email },
          withCredentials: true,
        }
      );
  
      // Get the response data
      const data = response?.data;
  
      // SweetAlert for both success and false cases
      if (data.result) {
        Swal.fire({
          title: "Good job!",
          text: "QR Successfully Scanned",
          icon: "success",
        });
      } else {
        Swal.fire({
          title: "QR Already Scanned",
          text: "This QR code has already been scanned.",
          icon: "warning", // Use a warning icon for already-scanned QR codes
        });
      }
    } catch (error) {
      // Handle HTTP errors (e.g., 400 Bad Request)
      if (error.response) {
        Swal.fire({
          title: "Error!",
          text: error.response.data.message || "Something went wrong while scanning.", // Show the server's error message (if available)
          icon: "error",
        });
      } else {
        // Handle network or unexpected errors
        Swal.fire({
          title: "Network Error!",
          text: "Unable to connect to the server. Please try again later.",
          icon: "error",
        });
      }
  
      console.error("Error during QR scanning:", error); // Log the error for debugging
    }
  };
  
  
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
