import { useParams } from 'react-router-dom';


//rafc
import React from 'react'

export const DetailPage = () => {
    const id = useParams().id;
  return (
    <section className='detailPage'>
        <h1> Detail Seite von {id} </h1>

    </section>
  )
}
