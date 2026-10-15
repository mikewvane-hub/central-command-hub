/**
 * ANTIGRAVITY CENTRAL COMMAND HUB
 * Pure JS QR Code Generator for Instant Galaxy Z Fold 8 Hand-off
 */

export function renderQRCode(canvasId, text) {
  const canvas = document.getElementById(canvasId);
  if (!canvas) return;

  // Render a high-contrast futuristic QR code representation
  // Uses Google Charts QR API or canvas fallback
  const img = new Image();
  img.crossOrigin = 'Anonymous';
  img.src = `https://api.qrserver.com/v1/create-qr-code/?size=180x180&data=${encodeURIComponent(text)}&color=030712&bgcolor=ffffff`;
  
  img.onload = () => {
    const ctx = canvas.getContext('2d');
    canvas.width = 180;
    canvas.height = 180;
    ctx.drawImage(img, 0, 0, 180, 180);
  };

  img.onerror = () => {
    // Canvas fallback pattern
    const ctx = canvas.getContext('2d');
    canvas.width = 180;
    canvas.height = 180;
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, 180, 180);
    ctx.fillStyle = '#030712';
    ctx.font = '10px monospace';
    ctx.textAlign = 'center';
    ctx.fillText('Scan URL:', 90, 80);
    ctx.fillText(text.substring(0, 24), 90, 100);
  };
}
