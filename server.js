let nodemailer = require("nodemailer");
const config = require('./config.json');
const client_secret = require('./client_secret.json');
const dash_button = require('node-dash-button');

//change the input params according to your desired settings
//first param: single mac or array of button mac addesses, second: network interface to listen (wlan0, en0,..), third: timeout between recognized presses, forth: type of package to listen for (all, udp, arp)
const dash = dash_button(config.button.id, 'en0', 2000, 'all');

console.log('waiting for dash button to be pressed...');
dash.on('detected', () => {
    console.log('Dash button press detected!');
    sendMail(config.mail.to, config.mail.from, config.mail.subject, config.mail.body)
});

function sendMail(to, from, subject, message) {
    console.log("trying to send mail")

    //create a transport with the given credentials
    //instead of configuring the tokens beforehand, it is also possible to get them at runtime, see https://developers.google.com/gmail/api/quickstart/nodejs
    let transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
            type: 'OAuth2',
            user: from,
            clientId: client_secret.web.client_id,
            clientSecret: client_secret.web.client_secret,
            refreshToken: config.mail.refreshtoken,
            accessToken: config.mail.accesstoken,
        }
    });


    var mailOptions = {
        from: from,
        to: to,
        subject: subject,
        generateTextFromHTML: true,
        html: "<b>" + config.mail.body + "</b>"
    };

    transporter.sendMail(mailOptions, function (error, response) {
        if (error) {
            console.log("ERROR: " +error);
        } else {
            console.log(response);
        }
        transporter.close();
    });
}