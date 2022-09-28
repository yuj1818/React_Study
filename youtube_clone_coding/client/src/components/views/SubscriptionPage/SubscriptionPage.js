import React, { useState, useEffect } from 'react'
import { FaCode } from "react-icons/fa";
import { Card, Avatar, Col, Typography, Row } from "antd";
import axios from "axios";

import moment from "moment";

const { Title } = Typography;
const { Meta } = Card;

function SubscriptionPage(props) {
    const [Video, setVideo] = useState([]);

    useEffect(() => {

        const subscriptionVariables = {
            userFrom: localStorage.getItem('userId')
        }

        axios.get('/api/video/getSubscriptionVideos', {params: subscriptionVariables})
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
        let minutes = Math.floor(video.duration/60);
        let seconds = Math.floor((video.duration - minutes*60));

        if(video.privacy === 1) {
            return (
                <Col lg={6} md={8} xs={24}>
                    <div style={{ position:'relative' }}>
                        <a href={`/video/${video._id}`}>
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
            <Title level={2} > Subscription </Title>
            <hr />
            <Row gutter={[16, 16]}>
                {renderCards}
            </Row>
        </div>
    )
}

export default SubscriptionPage;