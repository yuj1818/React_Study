import React, { useState, useEffect } from 'react';
import axios from "axios";

function Subscribe(props) {

    const [SubscribeNumber, setSubscribeNumber] = useState(0);
    const [Subscribed, setSubscribed] = useState(false);

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
        let subscribedVariable = { userTo:props.userTo, userFrom:props.userFrom }
        axios.get('/api/subscribe/subscribed', {params: subscribedVariable})
            .then(response => {
                if(response.data.success) {
                    setSubscribed(response.data.subscribed)
                } else {
                    alert('정보 받아오기 실패')
                }
            })
    }, []);

    const onSubscribe = () => {

        const isUser = localStorage.getItem('userId')

        let subscribedVariable = {
            userTo: props.userTo,
            userFrom: props.userFrom
        }

        if (isUser){
            // //본인의 게시물인 경우
            // if (props.userTo === localStorage.getItem('userId')) {
            //     return alert('본인은 구독할 수 없습니다.')
            // }
            //이미 구독 중이라면
            if (Subscribed) {
                axios.post('/api/subscribe/unSubscribe', subscribedVariable)
                    .then(response => {
                        if(response.data.success) {
                            setSubscribeNumber(SubscribeNumber - 1)
                            setSubscribed(!Subscribed)
                        } else {
                            alert('구독 취소 실패')
                        }
                    })
            } else {    //아직 구독중이 아니라면
                axios.post('/api/subscribe/subscribe', subscribedVariable)
                    .then(response => {
                        if(response.data.success) {
                            setSubscribeNumber(SubscribeNumber + 1)
                            setSubscribed(!Subscribed)
                        } else {
                            alert('구독 실패')
                        }
                    })
            }
        } else {
            alert('로그인 후 구독해주세요')
        }
    }

    return (
        <div>
            <button
                style={{backgroundColor: `${Subscribed ? '#AAAAAA' : '#CC0000'}`, borderRadius:'4px',
                color:'white', padding:'10px 16px',
                fontWeight:'500', fontSize:'1rem', textTransform:'uppercase'
                }}
                onClick={onSubscribe}
            >
                {SubscribeNumber} {Subscribed ? 'Subscribed' : 'Subscribe'}
            </button>
        </div>
    );
}

export default Subscribe;