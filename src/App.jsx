import { useState } from "react";
import { QRCodeCanvas } from "qrcode.react";

function App() {
  const [text, setText] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [qrGenerated, setQrGenerated] = useState(false);

  const handleInputChange = (e) => {
    setText(e.target.value);
    setQrGenerated(false);
  };

  const generateQR = () => {
    if (!text.trim()) {
      alert("Please enter some text or URL");
      return;
    }
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setQrGenerated(true);
    }, 1000); // Simulate loading for 1 second
  };

  const downloadQRCode = () => {
    const canvas = document.querySelector("canvas");
    const url = canvas.toDataURL("image/png");
    const link = document.createElement("a");
    link.href = url;
    link.download = "qrcode.png";
    link.click();
  };

  return (
    <div className="container">
      <h1>QR Code Generator</h1>
      <input
        type="text"
        placeholder="Enter text or URL"
        value={text}
        onChange={handleInputChange}
      />
      <button onClick={generateQR}>Generate QR Code</button>
      <div className="qrcode">
        {isLoading ? (
          <p>Loading...</p>
        ) : (
          qrGenerated && <QRCodeCanvas value={text} size={200} />
        )}
      </div>
      {qrGenerated && (
        <div className="qr-info">
          <p><strong>QR Code for:</strong> {text}</p>
          <button onClick={downloadQRCode}>Download QR Code</button>
        </div>
      )}
      <footer>Made with ❤️ by Luis Vasquez</footer>
    </div>
  );
}

export default App;
