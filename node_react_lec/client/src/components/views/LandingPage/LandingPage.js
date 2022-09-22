import React from 'react'
import axios from "axios";
import { useNavigate } from "react-router-dom";

function LandingPage() {
    const navigate = useNavigate();

    const onClickHandler = () => {
        axios.get('/api/users/logout')
            .then(response => {
                if(response.data.success) {
                    navigate('/login')
                } else {
                    alert('로그아웃 실패')
                }
            })
    }

    return (
        <div style={{
            display: 'flex', justifyContent: 'center', alignItems: 'center',
            width: '100%', height: '100vh'
        }}>
            랜딩 페이지
            <button onClick={onClickHandler}>
                로그아웃
            </button>
        </div>
    )
}

export default LandingPage