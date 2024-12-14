import React, { useState } from "react";
import './App.css';  // Import file CSS

function App() {
  const [plaintext, setPlaintext] = useState("");
  const [key, setKey] = useState("");
  const [ciphertext, setCiphertext] = useState("");
  const [decryptedText, setDecryptedText] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleEncrypt = async () => {
    try {
      const response = await fetch("https://web-production-add1.up.railway.app/encrypt", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          plaintext: plaintext,
          key: key,
        }),
      });

      const data = await response.json();

      if (data.encrypted) {
        setCiphertext(data.encrypted);
        setErrorMessage("");
      } else {
        setErrorMessage(data.error || "Error during encryption");
        setCiphertext("");
      }
    } catch (error) {
      setErrorMessage("An error occurred while encrypting.");
      setCiphertext("");
    }
  };

  const handleDecrypt = async () => {
    try {
      const response = await fetch("https://web-production-add1.up.railway.app/decrypt", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ciphertext: ciphertext,
          key: key,
        }),
      });

      const data = await response.json();

      if (data.decrypted) {
        setDecryptedText(data.decrypted);
        setErrorMessage("");
      } else {
        setErrorMessage(data.error || "Error during decryption");
        setDecryptedText("");
      }
    } catch (error) {
      setErrorMessage("An error occurred while decrypting.");
      setDecryptedText("");
    }
  };

  return (
    <div className="App">
      <div className="left-panel">
        <h2>Nama Kelompok</h2>
        <ul>
          <li>Adikara Alif Nurrahman 2125250093</li>
          <li>Agha Setya Pratama 2125250072</li>
          <li>Muhammad Mauladi 2125250046</li>
        </ul>
      </div>
      
      <div className="right-panel">
        <h1>Vigenère Cipher</h1>

        <div className="form-container">
          <div className="input-group">
            <label htmlFor="plaintext">Plaintext</label>
            <input
              type="text"
              id="plaintext"
              value={plaintext}
              onChange={(e) => setPlaintext(e.target.value)}
              placeholder="Enter plaintext"
            />
          </div>

          <div className="input-group">
            <label htmlFor="key">Key</label>
            <input
              type="text"
              id="key"
              value={key}
              onChange={(e) => setKey(e.target.value)}
              placeholder="Enter key"
            />
          </div>

          <div className="button-group">
            <button className="button" onClick={handleEncrypt}>
              Encrypt
            </button>
            <button className="button" onClick={handleDecrypt}>
              Decrypt
            </button>
          </div>

          {errorMessage && (
            <div className="error-message">
              <h3>Error</h3>
              <p>{errorMessage}</p>
            </div>
          )}

          {ciphertext && (
            <div className="output-container">
              <h3>Encrypted Text</h3>
              <p>{ciphertext}</p>
            </div>
          )}

          {decryptedText && (
            <div className="output-container">
              <h3>Decrypted Text</h3>
              <p>{decryptedText}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
