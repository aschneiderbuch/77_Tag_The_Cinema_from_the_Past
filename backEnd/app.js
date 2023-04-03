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