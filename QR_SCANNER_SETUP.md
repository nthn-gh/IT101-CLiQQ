# QR Scanner Setup Guide

## Overview
The QR Scanner feature uses the device camera to scan QR codes for payments and transfers in the CLiQQ Wallet app.

## ✅ HTTPS with Trusted Certificates!

The project uses **mkcert** to generate locally-trusted SSL certificates. No browser warnings on your development machine!

### Accessing the App

#### Local Development
- **HTTPS**: `https://localhost:3000`
- **No security warnings!** The certificate is trusted by your system

#### Network Access (via IP)
1. Find your computer's IP address:
   - Windows: Run `ipconfig` in terminal, look for IPv4 Address
   - Mac/Linux: Run `ifconfig` or `ip addr`

2. Access from other devices on the same network:
   - `https://YOUR_IP_ADDRESS:3000` (e.g., `https://192.168.0.25:3000`)

3. **Mobile devices**: You'll need to install the mkcert CA on your mobile device:
   - See "Mobile Device Setup" section below for instructions

### Using the QR Scanner

1. Navigate to the **Wallet** tab
2. Click **"Scan QR Code"**
3. Allow camera permissions when prompted
4. Point your camera at a QR code
5. The scanner will automatically detect and process the code

### Finding Your IP Address

**Windows (PowerShell/CMD):**
```bash
ipconfig
```
Look for "IPv4 Address" under your active network adapter (usually starts with 192.168.x.x or 10.x.x.x)

**Mac/Linux:**
```bash
ifconfig
# or
ip addr show
```

## Browser Compatibility

### ✅ Fully Supported
- **Chrome/Edge** (Desktop & Mobile) - Recommended
- **Safari** (iOS 11+, macOS)
- **Firefox** (Desktop & Mobile)
- **Samsung Internet** (Mobile)

### Camera Requirements
- Device must have a working camera
- Camera must not be in use by another application
- Browser must have permission to access the camera

## Troubleshooting

### "Camera access denied"
**Solution:**
1. Click the camera/lock icon in your browser's address bar
2. Set Camera permission to "Allow"
3. Refresh the page

### "Unable to access camera"
**Possible causes:**
- Camera is being used by another app (close other apps)
- Browser doesn't have camera permission
- Camera drivers need updating (Windows)

**Try:**
- Close other applications using the camera
- Restart your browser
- Check Windows Privacy Settings (Settings → Privacy → Camera)

### Mobile Device Setup (iOS/Android)

To access from mobile devices **without certificate warnings**, install the mkcert CA on your mobile device:

#### Method 1: Manual Installation
1. On your development machine, run:
   ```bash
   mkcert -CAROOT
   ```
   This shows the location of the CA root certificate

2. Copy the `rootCA.pem` file to your mobile device (via email, AirDrop, cloud storage, etc.)

3. Install on your mobile device:
   - **iOS**: Open the file → Settings → Profile Downloaded → Install → Enter passcode → Install
     - Then: Settings → General → About → Certificate Trust Settings → Enable trust for mkcert
   - **Android**: Settings → Security → Install from storage → Select the certificate file

#### Method 2: Accept Certificate (Quick Testing)
For quick testing without CA installation, you can accept the certificate warning on mobile browsers:
- Open `https://YOUR_IP:3000` and follow browser prompts to accept the risk

### QR Code Not Scanning
**Tips:**
- Ensure good lighting
- Hold camera steady
- Keep QR code centered in the frame
- Don't get too close (15-30cm distance is ideal)
- Make sure QR code is not blurred or damaged

## QR Code Format

The scanner accepts standard QR codes. For CLiQQ payments, the expected format is:
```json
{
  "type": "payment",
  "recipient": "Juan dela Cruz",
  "amount": 100.00
}
```

For testing, you can generate QR codes at: https://www.qr-code-generator.com/

## Certificate Management

### Regenerating Certificates
If you change your IP address or need to add more domains:
```bash
mkcert -key-file certs/localhost-key.pem -cert-file certs/localhost-cert.pem localhost 127.0.0.1 ::1 YOUR_NEW_IP
```

### Finding CA Location
To find where the CA certificate is stored (for mobile installation):
```bash
mkcert -CAROOT
```

## Security Notes
- Camera feed is processed locally in the browser
- No video data is transmitted to servers
- QR codes are validated before processing
- mkcert certificates are trusted only on machines where the CA is installed
- Use proper SSL certificates from a trusted CA in production
