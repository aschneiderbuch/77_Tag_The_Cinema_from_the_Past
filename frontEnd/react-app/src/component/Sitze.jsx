


// rafc
import React, { useEffect, useState } from 'react'

export const Sitze = ( {item , status} ) => {

    const [statusToggle, setStatusToggle] = useState(false)

    const handleClickStatusToggle = (e) => {
        e.preventDefault();
         console.log(e.target)
        console.log(item.Status)
        item.Status = !item.Status
        console.log(item.Status) //?
        console.log(item) 
         /* setStatusToggle(!statusToggle)  */    // * hier löscht er nicht ab und an die db_Daten.json
         setStatusToggle(item.Status) 
   
     /*    useEffect(() => { */
            fetch('http://localhost:9999/api/v1/putPost' , {
                method: 'PUT',
                headers: { 'Content-Type' : 'application/json'},
/*                 body: JSON.stringify(item)   */    
                body: JSON.stringify({id: item.Sitzplatznummer_ID})
              
            })
/*         },[statusToggle])
 */
    }



  return (
    <section className='sitze'>
        
        <button onClick={handleClickStatusToggle}
                status={item.Status} /* style= {{...item.style  }}  */ 
        style={{backgroundColor: item.Status === true ? 'red' : 'green' }}
        
        > {item.Sitzplatznummer_ID} </button>

    </section>
  )
}

