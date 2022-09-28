import React, { useState, useEffect } from 'react'
import { FaCode } from "react-icons/fa";
import { Card, Avatar, Col, Typography, Row } from "antd";
import axios from "axios";
import {useNavigate} from "react-router-dom";

import moment from "moment";

const { Title } = Typography;
const { Meta } = Card;

function LandingPage() {

    const [Video, setVideo] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        axios.get('/api/video/getVideos')
            .then(response => {
                if(response.data.success){
                    console.log(response.data)
                    setVideo(response.data.videos)
                } else {
                    alert('비디오 가져오기 실패')
                }
            })
    }, []);

    const renderCards = Video.map((video, index) => {

        const userId = localStorage.getItem('userId')

        let minutes = Math.floor(video.duration/60);
        let seconds = Math.floor((video.duration - minutes*60));

        let variable = {
            videoId: video._id,
            views: video.views + 1
        }

        const onViewUp = () => {
            if(video.writer._id !== userId) {
                axios.post('/api/video/upView', variable)
                    .then(response => {
                        if (response.data.success) {
                            console.log('조회수 DB 저장 성공')
                        } else {
                            alert('조회수 DB 저장 실패')
                        }
                    })
            }
            navigate(`/video/${video._id}`)
        }

        if(video.privacy === 0) {
            if(video.writer._id === userId) {
                return (
                    <Col lg={6} md={8} xs={24}>
                        <div style={{ position:'relative' }}>
                            <a onClick={onViewUp}>
                                <img style={{ width:'100%' }} src={`http://localhost:5000/${video.thumbnail}`} alt="thumbnail" />
                                <div className="duration">
                                    <span>{minutes} : {seconds}</span>
                                </div>
                            </a>
                        </div>
                        <br />
                        <Meta
                            avatar={
                                <Avatar src={video.writer.image} />
                            }
                            title={video.title}
                            description=""
                        />
                        <span style={{ marginLeft:'3rem' }}>{video.writer.name} </span><br />
                        <span style={{ marginLeft:'3rem' }}>{video.views} views</span> - <span>{moment(video.createdAt).format("MMM Do YY")}</span>
                    </Col>
                )
            }
        } else {
            return (
                <Col lg={6} md={8} xs={24}>
                    <div style={{ position:'relative' }}>
                        <a onClick={onViewUp}>
                            <img style={{ width:'100%' }} src={`http://localhost:5000/${video.thumbnail}`} alt="thumbnail" />
                            <div className="duration">
                                <span>{minutes} : {seconds}</span>
                            </div>
                        </a>
                    </div>
                    <br />
                    <Meta
                        avatar={
                            <Avatar src={video.writer.image} />
                        }
                        title={video.title}
                        description=""
                    />
                    <span style={{ marginLeft:'3rem' }}>{video.writer.name} </span><br />
                    <span style={{ marginLeft:'3rem' }}>{video.views} views</span> - <span>{moment(video.createdAt).format("MMM Do YY")}</span>
                </Col>
            )
        }

    })

    return (
        <div style={{ width:'85%', margin:'3rem auto'}}>
            <Title level={2} > Recommend </Title>
            <hr />
            <Row gutter={[16, 16]}>
                {renderCards}
            </Row>
        </div>
    )
}

export default LandingPage
