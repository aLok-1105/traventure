import React, { useEffect, useState } from 'react'
import axios from 'axios'
export default function Home() {
    const [data, setData] = useState(null);

    useEffect(() => {
        axios.get('http://localhost:8000/')
        .then(response => {
            console.log(response.data);
            setData(response.data);
        })
        .catch(error => {
            console.error('Error fetching data:', error);
        });
    }, []);
  return (
    <>
        {data}
    </>

  )
}
