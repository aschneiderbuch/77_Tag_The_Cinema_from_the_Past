


// rafc
import React from 'react'
import { NavLink } from 'react-router-dom'

export const AdminPage = () => {

    




  return (
    <section className='adminPage'>
        <h1>Admin Seite</h1>

<NavLink to='/'  style={ ( { isActive } ) => ( {
    backgroundColor: isActive ? 'green' : 'yellow' } ) } 
      > Zurück  </NavLink>

    </section>
  )
}
