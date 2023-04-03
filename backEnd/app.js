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


// *** import          files und funktionen
import {      } from './functions.js';




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



/** ****************************************************************
 * 
 * * **** für Bilder
 * 
 *** ****************************************************************/
const upload = multer ( {           // * beim FrontEnd content-type: multipart/form-data
    storage: multer.memoryStorage(),      // zum filtern und auslesen der der Magic Bites 
    limits: { fileSize: 200000 }          // zum begrenzen der Dateigröße
})

// zulässige Bilderformate
const BILD_FORMAT_1 = 'jpg'
const BILD_FORMAT_2 = 'jpeg'
const BILD_FORMAT_3 = 'png'



/** ****************************************************************
 * 
 * * ************* Middelleware
 * 
 *** ****************************************************************/
// **** logger
app.use(morgan('dev'))

// **** CORS Sicherheit
app.use(cors( { origin: `http://localhost:${PORT_FRONTEND_REACT}`})) 

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
 * * **** GET       fetch       ALLE  Post
 *                      * immer /api/v1/  damit es nicht mit anderen API's kollidiert  
 *                      * bzw. neue Sachen einfach bei /api/v2 eingebunden werden und die alten Sachen noch gehen
 * 
 *** ****************************************************************/













/** ****************************************************************
 * 
 * * **** POST          fetch
 *  ! sollte ID haben wenn er kommt, zwecks Detail Seite    Route :id und mit param 
 * 
 *** ****************************************************************/










/** ****************************************************************
 * 
 * * ************* Server Port
 *              * Server starten mit      npm run dev   
 *                  *  in package.json  "dev": "nodemon app.js"
 * 
 *** ****************************************************************/
app.listen(PORT, () => {
    console.log("Server läuft auf Port: " + PORT )
})