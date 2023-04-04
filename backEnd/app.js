/** ****************************************************************
 * 
 * * ************* imports
 * 
 *** ****************************************************************/
import express from 'express';      // zum bauen des Servers                        content-type: application/json
import './config.js';               // für die Umgebungsvariablen zum sichern Wegspeichern von Passwörtern API Keys etc.
import morgan from 'morgan';        // für die Ausgabe von Log-Informationen
import cors from 'cors';            // für die Verwendung von CORS Sicherheit
import multer from 'multer';        // für die Verwendung von Multer für Bilder    und Form Übertragungen  content-type: multipart/form-data
import { fileTypeFromBuffer } from 'file-type' // für die Verwendung von file-type für Bilder   zum speichern im Buffer / Memory
import fs from 'fs';                // zum speichern auf der Festplatte
import { v4 as uuidv4 } from 'uuid' // zum generieren von UUIDs für Map oder Bilder ID oder Dateinamen ID
import express_validator from 'express-validator' // zum validieren von Daten
import nodemailer from 'nodemailer' // zum senden von Emails


// *** import          files und funktionen
import { loadFile, saveFile, appendFile } from './funktionen.js';




/** ****************************************************************
 * 
 * * ************* Variablen
 *                  * PORT ist in .env Datei  unleserlich    sowie API_KEY
 *                      * .env in .gitignore rein nehmen
 * 
 *** ****************************************************************/
// ** durch .env ist PORT unleserlich und kann von außen verändert werden
const PORT = process.env.PORT || 9998
const app = express()
const PORT_FRONTEND_REACT = process.env.PORT_FRONTEND_REACT || 3000
// * PORT vorn und hinten groß
// * wenn auf server hochladen, dann VITE_ davor noch hin, 
// * sonst weiß der server nicht, dass es eine Umgebungsvariable ist die er bauen soll

const DB_PATH = process.env.DB_PATH  //  || './db_Daten.json'





/** ****************************************************************
 * 
 * * **** für Bilder
 * 
 *** ****************************************************************/
const upload = multer({           // * beim FrontEnd content-type: multipart/form-data
    storage: multer.memoryStorage(),      // zum filtern und auslesen der der Magic Bites 
    limits: { fileSize: 200000 }          // zum begrenzen der Dateigröße
})

// zulässige Bilderformate
const BILD_FORMAT_1 = 'jpg'
const BILD_FORMAT_2 = 'jpeg'
const BILD_FORMAT_3 = 'png'



/** ****************************************************************
 * 
 * * **** für Emails
 *    * https://nodemailer.com/
 *    * https://mailtrap.io/    Testing Dashboard
 *     * unten dann Route für Email  GET / POST
 * 
 *** ****************************************************************/
// * Einstellungen die wir bekommen 
const transport = nodemailer.createTransport({
    host: process.env.EMAIL_HOST, //?
    port: process.env.EMAIL_PORT,
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }

})



/** ****************************************************************
 * 
 * * ************* Middelleware
 * 
 *** ****************************************************************/
// **** logger
app.use(morgan('dev'))

// **** CORS Sicherheit
app.use(cors({ origin: `http://localhost:${PORT_FRONTEND_REACT}` }))

// **** React HEAD BODY JSON Parser
app.use(express.json())             // zum lesen von JSON Daten    
// * in FrontEnd     content-type: application/json



/** ****************************************************************
 * 
 * * ************** static Routes 
 * 
 *** ****************************************************************/
// **** images                      // wenn Bilder hochgeladen und im fs. weggespeichert werden sollen
app.use('/images', express.static('./images'))
// **** admin Seite und Detail Seite usw. müssen über FrontEnd Routen gehen





/** ****************************************************************
 * 
 * * **** für Emails   GET  fetch
 *          * https://mailtrap.io/    Testing Dashboard
 * 
 *** ****************************************************************/
/* app.get('/api/v1/getEmail', (req, res) => {
//     console.log(req)
    // * Inhalt der Email
    const message = {
        from: 'test_kino_email_versand@test_email.de',
        to: 'test_admin_email_empfang@test_admin_email.de',
        subject: 'Test Email Versand mit Kino Sitzplatz Reservierung',
        text: ' Sie haben den Sitzplatz ...  im Kino reserviert, er kostet ... €',
        html: '<p> Sie haben den Sitzplatz ...  im Kino reserviert, er kostet ... € </p>'
    }

    // * Email senden
     transport.sendMail(message, (err, info) => {
        if (err) res.status((595))
            .json({ Error__: err.message })
        else res.status(295)
            .json({ message: 'Email wurde versendet', info })

            .res.end()  // * damit Thunder Client nicht nur 200 anzeigt 
    })
    
 }) */








/** ****************************************************************
 * 
 * * **** GET       fetch       ALLE  Post
 *                      * immer /api/v1/  damit es nicht mit anderen API's kollidiert  
 *                      * bzw. neue Sachen einfach bei /api/v2 eingebunden werden und die alten Sachen noch gehen
 * 
 *                    * WebHosting mit www.render.com
 * 
 *** ****************************************************************/
app.get('/api/v1/getPost', (req, res) => {

    loadFile()
        .then(data => { res.json(data) })

        .catch(err => {
            res.status(599)
                .json({ message: err.message })
        })
})












/** ****************************************************************
 * 
 * * **** POST          fetch
 *  ! sollte ID haben wenn er kommt, zwecks Detail Seite    Route :id und mit param 
 * 
 *** ****************************************************************/
app.post('/api/v1/postPost', (req, res) => {

    const data = req.body

    // ** jetzt ganze data in Datei schreiben
    appendFile(data)
        .then(newData => { res.json(newData) })
        .catch(err => {
            res.status(591)
                .json({ message: err.message })
        })

})


/** ****************************************************************
 * 
 * * **** PUT          fetch     sucht mit find() nach ID und überschreibt    
 *                                * gibt nur ein Erbebnis zurück
 *     findet den Post mit der ID   dann wird der Status von false auf true gesetzt  
 *      dann wird es in der db_Daten.jsson Datei geändert und gespeichert 
 *    und dann wird es zurückgegeben
 *** ****************************************************************/
app.put('/api/v1/putPost', (req, res) => {

    const data = req.body
    const ID = req.body.id
/*     console.log(data)
 */    loadFile()
        .then(data => {
            console.log(data)
            const index = data?.findIndex(item => item?.id == ID && typeof item?.Status == 'boolean')

            // *! übers backEnd
            // *! data[Number(ID)-1].Status = !data[Number(ID)-1].Status
            console.log(data)
            if (index >= 0) {
                // *!
                data[index].Status = true
                // * Togglen des Statuses von true auf false und false auf true
                // *!
                data[index].Status = !data[index].Status

                // * {flag: 'w'}  damit die Datei überschrieben wird und nicht nur angehängt wird
                fs.writeFile(DB_PATH, JSON.stringify(data, null, 2),/*  { flag: 'w' },  */(err) => {
                    if (err) console.log(err)
                })
                res.json(data[index])
            } else {
                res.status(404)
                    .json({ message: `Post mit ID ${ID} nicht gefunden bzw schon auf reserviert` })
            }
        })

    /*     // ** jetzt ganze data in Datei schreiben
        fs.saveFile(data) //?
            .then(newData => { res.json(newData) })
            .catch(err => {
                res.status(592)
                    .json({ message: err.message })
            }) */

})










/** ****************************************************************
 * 
 * * ************* Server Port
 *              * Server starten mit      npm run dev   
 *                  *  in package.json  "dev": "nodemon app.js"
 * 
 *** ****************************************************************/
app.listen(PORT, () => {
    console.log("Server läuft auf Port: " + PORT)
})
