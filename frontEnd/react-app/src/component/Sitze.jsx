


// rafc
import React, { useEffect, useState } from 'react'

export const Sitze = ({ item, setStatus }) => {

     const [statusToggle, setStatusToggle] = useState(false)
 
    const handleClickStatusToggle = (e) => {
        // *!
      item.Status = !item.Status 

        /* setStatusToggle(!statusToggle)  */    // * hier löscht er nicht ab und an die db_Daten.json
        // *!  
        setStatusToggle(!item.Status)  

        /*    useEffect(() => { */
       fetch('https://kino-backend.onrender.com/api/v1/putPost', { // https://kino-backend.onrender.com/api/v1/getPost
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            /*                 body: JSON.stringify(item)   */
            body: JSON.stringify({ id: item.Sitzplatznummer_ID })
        })
             .then(() => {
             fetch('https://kino-backend.onrender.com/api/v1/getEmail' )   // https://kino-backend.onrender.com/api/v1/getPost  http://localhost:9999/api/v1/getEmail
                    .then(res => res.json())
                    .then(data => {console.log(data) //?
                    // *! übers backEnd
                    setStatus(prev => !prev) })
            }) 
            .catch( err => console.log(err))

    }
    /*         },[statusToggle])
     */




return (
    <section className='sitze'>

        <button onClick={handleClickStatusToggle}
            status={item.Status} /* style= {{...item.style  }}  */
            style={{ backgroundColor: item.Status === true ? 'red' : 'green' }}

        > {item.Sitzplatznummer_ID} </button>

    </section>
)
}

