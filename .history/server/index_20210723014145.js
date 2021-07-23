const express = require('express');
const path = require('path');
const app = express();

var cors = require('cors');
// Use cors for localhost
app.use(cors()) ;

// Have Node serve the files for our built React app
app.use(express.static(path.resolve(__dirname, '../client/build')));

app.get('/getEmailCrm', (req, res) => {
    var imaps = require('imap-simple');
    const simpleParser = require('mailparser').simpleParser;
    const _ = require('lodash');

    var config = {
        imap: {
            // user: 'demo7486@gmail.com',
            // password: 'admin123$',
            // host: 'imap.gmail.com',
            // port: 993,
            // tls: false,
            // authTimeout: 3000

            user: 'kbh1',
            password: 'kbh12075',
            host: '192.168.114.83',
            port: 143,
            tls: false,
            authTimeout: 3000
        }
    };

    imaps.connect(config).then(function (connection) {
        return connection.openBox('INBOX').then(function () {
            var searchCriteria = ['1:5'];
            var fetchOptions = {
                bodies: ['HEADER', 'TEXT', ''],
            };
            return connection.search(searchCriteria, fetchOptions).then(function (messages) {
                const recieveDatas = [];
                messages.forEach(function (item) {
                    var all = _.find(item.parts, { "which": "" })
                    var id = item.attributes.uid;
                    var idHeader = "Imap-Id: "+id+"\r\n";
                    simpleParser(idHeader+all.body, (err, mail) => {
                        const mailData = {subject: mail.subject, date: mail.date, from: mail.from.text, text: mail.text};
                        recieveDatas.push(mailData);
                        if(messages.length === recieveDatas.length){
                            console.log(recieveDatas);
                            res.send(recieveDatas);
                        }
                    });
                });
            });
        });
    });
});

app.get("/*", function(req, res) {
    res.sendFile(path.join(__dirname, "../client/build/index.html"));
});

app.listen(8080);
