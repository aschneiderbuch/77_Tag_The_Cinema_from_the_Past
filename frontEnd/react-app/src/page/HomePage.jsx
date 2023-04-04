import { useState, useEffect } from 'react'
import { Sitze } from '../component/Sitze'



// rafc

export const HomePage = () => {
    const [sitze, setSitze] = useState([])
    const [status, setStatus] = useState() //?


    useEffect(() => {
        fetch('http://localhost:9999/api/v1/getPost')
            .then(res => res.json())
            .then(data => setSitze(data))
    }, [status])


    return (
        <section className='homePage'>
            <h1>Home Seite</h1>

            {sitze.map((item, index) => {

                return (
                    <Sitze key={index}
/*                         Sitzplatznummer_ID={item.Sitzplatznummer_ID}
                        Klasse={item.Klasse}
                        Preis={item.Preis}
                        Status={item.Status}
                        style={{
                            backgroundColor: item.Klasse === 'Loge' ? 'yellow' : 'green',
                            color: 'purple',
                            width: item.Status === true ? '200px' : '40px'
                        }} */
                        status={setStatus} //?
                        item={item} // * alles komplette Objekt durchschieben

                    >  </Sitze>
                )
            })}








        </section>
    )
}
