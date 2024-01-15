import React, { useState } from 'react';
import QRCode from 'qrcode.react';

const Base64ToQRCode = () => {
  const [base64Text, setBase64Text] = useState('');
  const [qrCodeData, setQRCodeData] = useState('');

  const handleInputChange = (event) => {
    const inputText = event.target.value;
    setBase64Text(inputText);
  };

  const generateQRCode = () => {
    // Puedes ajustar la configuración del código QR según tus necesidades
    const options = {
      level: 'L',
      margin: 5,
      scale: 4,
      width: 256,
      color: {
        dark: '#000000',
        light: '#ffffff',
      },
    };

    // Genera el código QR a partir del texto base64
    setQRCodeData(base64Text);
  };

  return (
    <div>
      <h2>Convertir Texto Base64 a Código QR</h2>
      <textarea
        rows="4"
        cols="50"
        placeholder="Inserta el texto base64 aquí"
        onChange={handleInputChange}
      ></textarea>
      <br />
      <button onClick={generateQRCode}>Generar Código QR</button>
      <br />
      {qrCodeData && <QRCode value={qrCodeData} renderAs="svg" />}
    </div>
  );
};

export default Base64ToQRCode;
