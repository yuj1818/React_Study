import React, { useEffect, useState } from 'react';
import { Row, Col, List, Avatar } from 'antd';
import axios from "axios";
import { useParams } from "react-router-dom";
import SideVideo from "./Sections/SideVideo";
import Subscribe from "./Sections/Subscribe";

function VideoDetailPage() {

    const params = useParams();
    const videoId = params.videoId
    const variable = { videoId: videoId }

    const [VideoDetail, setVideoDetail] = useState([]);

    useEffect(() => {
        axios.get('/api/video/getVideoDetail', {params: variable})
            .then(response => {
                if(response.data.success) {
                    console.log(response.data)
                    setVideoDetail(response.data.videoDetail)
                } else {
                    alert('비디오 정보 가져오기 실패')
                }
            })
    }, []);


    if(VideoDetail.writer) {
        return (
            <Row gutter={[16,16]}>
                <Col lg={18} xs={24}>
                    <div style={{ width:'100%', padding:'3rem 4rem' }}>
                        <video style={{ width:'100%' }} src={`http://localhost:5000/${VideoDetail.filePath}`} controls></video>

                        <List.Item
                            actions={[<Subscribe userTo={Video.writer._id} />]}
                        >
                            <List.Item.Meta
                                avatar={<Avatar src={VideoDetail.writer && VideoDetail.writer.image} />}
                                title={VideoDetail.title}
                                description={VideoDetail.description}
                            />
                        </List.Item>
                        {/*comment part*/}
                    </div>
                </Col>
                <Col lg={6} xs={24}>
                    <SideVideo />
                </Col>
            </Row>
        )
    } else {
        return (
            <div>Loading...</div>
        )
    }
}

export default VideoDetailPage;