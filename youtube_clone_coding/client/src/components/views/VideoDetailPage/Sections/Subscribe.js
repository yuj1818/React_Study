import React, { useState, useEffect } from 'react';
import axios from "axios";

function Subscribe(props) {

    const [SubscribeNumber, setSubscribeNumber] = useState(0);

    useEffect(() => {

        let variable = { userTo:props.userTo }
        axios.get('/api/subscribe/subscribeNumber', {params: variable})
            .then( response => {
                if(response.data.success) {
                    setSubscribeNumber(response.data.subscribeNumber)
                } else {
                    alert('구독자 수 정보 받아오기 실패')
                }
            })
        let subscribedVariable = { userTo:props.userTo, userFrom:localStorage.getItem('userId') }
        axios.get('/api/subscribe/subscribed', {params: subscribedVariable})
            .then(response => {
                if(response.data.success) {

                } else {
                    alert('정보 받아오기 실패')
                }
            })
    }, []);


    return (
        <div>
            <button
                style={{backgroundColor:'#CC0000', borderRadius:'4px',
                color:'white', padding:'10px 16px',
                fontWeight:'500', fontSize:'1rem', textTransform:'uppercase'
                }}
                onClick
            >
                0 Subscribe
            </button>
        </div>
    );
}

export default Subscribe;