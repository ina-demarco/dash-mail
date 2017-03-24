
let nodemailer = require("nodemailer");


const config = require('./config.json');
const client_secret = require('./client_secret.json');
const dash_button = require('node-dash-button');
// TODO: accept and register an array of button MACs
const dash = dash_button(config.button.id, 'en0',2000, 'all');
const util = require('util');
const _ = require('lodash');
const when = require('when');


function sendMail (to, from, message) {
    console.log("in send mail")

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
        subject: "Dash Button Test",
        generateTextFromHTML: true,
        html: "<b>"+config.mail.body+"</b>"
    };

    transporter.sendMail(mailOptions, function(error, response) {
        if (error) {
            console.log(error);
        } else {
            console.log(response);
        }
        transporter.close();
    });
}


console.log('waiting for dash button to be pressed...');


dash.on('detected', () => {
    console.log('Dash button detected!');
    // for now we can ignore the promise as it handles any logging and we've no need to care about when it resolves or rejects
    sendMail(config.mail.to, config.mail.from, config.mail.body)
});



