import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import DashProfile from './DashProfile';

export default function Dashboard() {

    const location = useLocation();
    const [tab, setTab] = useState('');
    useEffect(()=>{
        const urlParams = new URLSearchParams(location.search);
        const tabUrl = urlParams.get('tab')
        
        if(tabUrl){
            setTab(tabUrl)
        }
    }, [location.search])

  return (
    <div style={{display:'flex'}}>
        {/* <DashSide/> */}
        {
            tab === 'profile' && <DashProfile/> 
        }

    </div>
  )
}
