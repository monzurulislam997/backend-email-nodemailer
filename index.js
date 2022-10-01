const express = require("express");
const app = express()
const port = process.env.PORT || 5000;

const cors = require('cors')
const nodemailer = require("nodemailer");
require('dotenv').config()

app.use(cors())
app.use(express.json())


const sendEmail = async (subject, message, sent_to, sent_from, reply_to) => {
    const transPorter = nodemailer.createTransport({

        host: process.env.EMAIL_HOST,
        port: 587,
        auth: {

            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS,
        },
        tls: {
            rejectUnauthorized: false,
        }
    }
    )

    const options = {
        from: sent_from,
        to: sent_to,
        replyTo: reply_to,
        subject: subject,
        html: message
    }

    //send email
    transPorter.sendMail(options, function (err, info) {
        if (err) {
            console.log(err)
        }
        else {
            console.log(info)
        }
    })
}


app.get('/', (req, res) => {
    res.send("welcome")
})
// app.post('/sendemail', (req, res) => {
//     const { name, address } = req.body;
//     console.log(name, address)

// })


app.post('/sendemail', async (req, res) => {
    const { name, email, address } = req.body;

    try {

        const sent_to = email
        const sent_from = process.env.EMAIL_USER
        const reply_to = email
        const subject = "Online Order"

        const message = ` <h3> Hello, ${name} </h3>
           <p> Thank your for your order </p>
           <p> Your Order email is: ${email} </p>
           <p>Billing Address: ${address}</p> `

        await sendEmail(subject, message, sent_to, sent_from, reply_to);
        res.status(200).send({ success: "Email has been sent" })

    }
    catch (error) {
        res.send(error.message)
    }

})

app.listen(port, () => {
    console.log("server is running")
})