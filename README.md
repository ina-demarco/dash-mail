# dash-mail
<b>Press your Amazon Dash Button to send a mail with Nodemailer over Gmail.</b><br/>
How it works: On button press, the Amazon Dash Button connects to the Wi-Fi to get ready for placing an order. It sends an UPD or ARP packet (depending on the model) to the network to ensure that no other device uses it's IP address. This packet can be discovered by other devices in this network (for example a Raspberry Pi), which then can react to the button press. This code uses Nodemailer (a Node.js module) to send a mail. 

<b>Prerequisites</b><br/>
Node.js <br/>
Node.js modules: Nodemailer (https://nodemailer.com/about/) and node-dash-button (https://github.com/hortinstein/node-dash-button)

1. Clone this code to the desired destination on the device you want to run the Node.js code on (eg. Raspberry Pi or computer)

2. Configure the Amazon dash button's Wi-Fi credentials with the Amazon Shopping App 
(Step 5 on https://www.amazon.com/gp/help/customer/display.html?nodeId=201746340&language=en_GB), but do not select a product. Instead close the Amazon Shopping App. 

3. Check the Dash Button's MAC Address by using Wireshark (or similar). Rename the config.json.sample to "config.json" and write the MAC in the config.json file

4. Credentials for sending mails with Nodemailer over Gmail (this uses preconfigured OAuth2.0 tokens, but you can also modify the code to get them during runtime, use a different mail provider or use a password instead), for detailed instructions also see http://masashi-k.blogspot.de/2013/06/sending-mail-with-gmail-using-xoauth2.html
<br>Set up a Gmail account to send the mails from (or use your own)
<br>Create a project via Google API Developer Console (https://console.developers.google.com/apis/) and configure the OAuth2.0 credentials. Download your credentials and name them "client_secret.json". 
<br>Get the AOuth2.0 Access Token and Refresh Token by visiting the Redirect URL and add the tokens to the config.json. 

5. Prepare the device you want to run the server on
<br/>Install Node.js on the device
<br/>Install Node Package Manager for easy installation of Node.js modules
<br/>Switch to the destination folder
<br/>Install nodemailer and node-dash-button with the Node Package Manager:
<br/>npm install nodemailer
<br/>npm install node-dash-button (requirement: libpcap, for installation details also see https://github.com/hortinstein/node-dash-button)

6. Check the rest of your config.json (mail subject, body, recipient)

7. Run server.js code:
<br>node server.js


-----
<b> Credits to: </b>
<br>Ashutosh Sanzgiri https://github.com/sanzgiri/dash-sms
<br>Alex Hortin https://github.com/hortinstein/node-dash-button
