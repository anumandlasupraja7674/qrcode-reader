const resultElem = document.getElementById('result');
const html5QrCode = new Html5Qrcode("reader");

function onScanSuccess(decodedText) {
  resultElem.innerText = `Scanned Result: ${decodedText}`;
  html5QrCode.stop(); // stop camera after successful scan
}

function onScanFailure(error) {
  // Optionally handle scan errors
}

Html5Qrcode.getCameras().then(devices => {
  if (devices.length) {
    const cameraId = devices[0].id;
    html5QrCode.start(
      cameraId,
      { fps: 10, qrbox: 250 },
      onScanSuccess,
      onScanFailure
    );
  }
}).catch(err => {
  resultElem.innerText = "Camera access failed. You can upload an image instead.";
});

// File Upload Handling
document.getElementById('file-input').addEventListener('change', function (e) {
  if (e.target.files.length === 0) {
    return;
  }

  const file = e.target.files[0];

  html5QrCode.scanFile(file, true)
    .then(decodedText => {
      resultElem.innerText = `Scanned from Image: ${decodedText}`;
    })
    .catch(err => {
      resultElem.innerText = `Failed to scan QR code: ${err}`;
    });
});
