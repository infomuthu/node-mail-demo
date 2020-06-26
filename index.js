var express=require('express');
var nodemailer = require("nodemailer");
var app=express();
const cors = require('cors');
var smtpTransport = require('nodemailer-smtp-transport');
/*
	Here we are configuring our SMTP Server details.
	STMP is mail server which is responsible for sending and recieving email.
*/
app.use(express.json());
app.use(express.urlencoded({extended: true})); 
const corsOpts = {
  origin: '*',

  methods: [
    'GET',
    'POST',
  ],

  allowedHeaders: [
    'Content-Type',
  ],
};

app.use(cors(corsOpts));
var smtpTransport = nodemailer.createTransport({
    service: 'gmail',
    host: 'smtp.gmail.com',
    
    auth: {
        user: 'muthupandikcet@gmail.com',
        pass: 'Kowsaly@15'
    },
    tls: {rejectUnauthorized: false},
    debug:true
});


/*------------------SMTP Over-----------------------------*/

/*------------------Routing Started ------------------------*/
let port = process.env.PORT || 45555;
app.listen(port, () => {
  console.log('Express server listening on port', port)
});
app.get("/", (req, res) => {
  res.send(
    "<h1 style='text-align: center'>Wellcome to iAdaptime ivestors <br><br>😃👻😃👻😃👻😃👻😃</h1>"
  );
});
app.post('/investorLogin',function(req,res){
		 
		smtpTransport.sendMail({
			from: '"iAdaptime Support" <fbadmin@iadaptime.com>',
            to: 'muthu@iadaptime.com',
            subject: 'Welcome to iAdaptime',
            html: `
                <h4>Hi Paul,</h4>
                <h5>${req.body.title} ${req.body.name} has Logged on to iAdaptime investors webpage.</h5>
            `
        })
        .then(result => {
            console.log('successfully sent that mail', result);
            return res.status(200).json({
                success: true,
                message: 'email send successfully to the admin',
                result: result          
            });
        })
        .catch(error => {
            console.log('error occured',error);
            return res.status(500).json({
                success: false,
                message: 'email failed to send the admin',
                result: error  
            });
        });
	
});
app.post('/sendNda',function(req,res){

        console.log('req from NDA', req.body);
        smtpTransport.sendMail({
            from: '"iAdaptime Support" <fbadmin@iadaptime.com>',
            to: req.body.userEmail,
            subject: 'iAdaptime - Non-disclosure agreement',
            html: `
                <h4>Hi ${req.body.title}. ${req.body.name},</h4>
                <section>${req.body.nda}</section>
            `
        })
        .then(result => {
            console.log('successfully sent that mail', result);
            return res.status(200).json({
                success: true,
                message: 'NDA send successfully to the particular user',
                result: result                
            });
        })
        .catch(error => {
            console.log('error occured',error);
            return res.status(500).json({
                success: false,
                message: 'NDA send failed to the particular user',
                result: error  
            });
        });
		
});

app.post('/sendOtp',function(req,res){
		        
        console.log('req from OTP', req.body); 
        smtpTransport.sendMail({
            from: '"iAdaptime Support" <ajith@iadaptime.com>',
            to: req.body.userEmail,
            subject: 'iAdaptime - Your Authentication Code',
            html: `
                <h4>Hi ${req.body.title}. ${req.body.name},</h4>
                <p>Your verification code - <span style="color:blue; border-bottom:1px solid blue;">${req.body.otpmsg}</span></p>
            `
        })
        .then(result => {
            console.log('successfully sent that mail', result);
            return res.status(200).json({
                success: true,
                message: 'OTP send successfully to the particular user',
                result: result                
            });
        })
        .catch(error => {
            console.log('error occured',error);
            return res.status(500).json({
                success: false,
                message: 'OTP send failed to the particular user',
                result: error  
            });
        });
});
/*--------------------Routing Over----------------------------*/

