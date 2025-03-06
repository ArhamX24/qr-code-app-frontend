import React, { useEffect } from "react";
import { Html5QrcodeScanner } from "html5-qrcode";

const QRCodeScanner = ({ onScanSuccess, onScanError }) => {
  useEffect(() => {
    const scanner = new Html5QrcodeScanner("qr-reader", {
      fps: 10, 
      qrbox: 300, 
    });

    scanner.render(
      (decodedText) => {
        console.log("Scanned QR Code:", decodedText);
        if (onScanSuccess) onScanSuccess(decodedText); 
      },
      (error) => {
        console.error("Scanning failed:", error);
        if (onScanError) onScanError(error); 
      }
    );

    return () => {
      scanner.clear().catch((err) => {
        console.error("Error during scanner cleanup:", err);
      });
    };
  }, [onScanSuccess, onScanError]);

  return <div id="qr-reader" style={{ width: "100%" }}></div>;
};

export default QRCodeScanner;
