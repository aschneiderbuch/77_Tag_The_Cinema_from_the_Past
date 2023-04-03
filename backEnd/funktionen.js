/** ****************************************************************
 * 
 * * ************* imports
 * 
 *** ****************************************************************/
import fs from 'fs';
import { constants } from 'fs';      // für fs.access Prüfung
import './db_Daten.json'

const DB_PATH= process.env.DB_PATH || './db_Daten.js'



/** ****************************************************************
 * 
 * * **** loadFile              readFile
 * 
 *** ****************************************************************/
export const loadFile = () => {
    // Promise für fetch
    return new Promise ( ( resolve, reject ) => {
        // liest Datei ./db_Daten.json
        fs.readFile( DB_PATH, (err, data) => {
            if (err) reject(err)
            else {
                resolve(JSON.parse(data.toString()))
            }
        })
    })
}

/** ****************************************************************
 * 
 * * **** saveFile              writeFile
 * 
 *** ****************************************************************/
export const saveFile = (data) => {
    // Promise für fetch
    return new Promise ( ( resolve, reject ) => {
        // schreiben      null + 2 = Zeilenumbruch
        fs.writeFile( DB_PATH, JSON.stringify(data,null,2), (err) => {
            if(err) reject(err)
            else {
                resolve("Daten wurden erfolgreich gespeichert")
            }
        })
    })
}



/** ****************************************************************
 * 
 * * **** appendFile   hinzufügen       
 * 
 *  loadFile ()  dann -> saveFile ()
 * 
 *** ****************************************************************/
export const appendFile = (newPost) => {
    // Promise 
    return new Promise ( ( resolve, reject ) => {
        // loadFile() einlesen
        loadFile()
            .then( oldPost => {
                // * alte und neue Daten zusammenfügen
                const newData = [...oldPost, newPost]
                // * saveFile() speichern
                saveFile(newData)
                    .then( res => resolve(newData) )

                    .catch( err => reject(`--> Fehler saveFile: ${err}`))
            })
            .catch( err => reject(`--> Fehler loadFile: ${err}`))
    })
}

appendFile({id: 1, name: 'test'}) //?