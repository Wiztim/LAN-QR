# LAN-QR
This is a way to upload files from your computer to your phone across a LAN by a self hosted server.

## How to use
1. Clone the project
2. Run npm install in the project folder to get node modules
3. Run node server.js to start the server (defaults to port 8080)
4. Open a tab with your local ipv4 address at the specified port
5. Upload a file and submit
6. Scan the QR code with a phone

## Known issues
- The QR will sometimes be empty
  - Resubmit this a few times until it shows up
