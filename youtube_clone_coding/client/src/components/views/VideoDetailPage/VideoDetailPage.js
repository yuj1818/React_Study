import React, { useEffect, useState } from 'react';
import { Row, Col, List, Avatar } from 'antd';
import axios from "axios";
import { useParams } from "react-router-dom";
import SideVideo from "./Sections/SideVideo";
import Subscribe from "./Sections/Subscribe";
import Comment from "./Sections/Comment";
import LikeDislikes from "./Sections/LikeDislikes";

function VideoDetailPage() {

    const params = useParams();
    const videoId = params.videoId
    const variable = { videoId: videoId }

    const [VideoDetail, setVideoDetail] = useState([]);
    const [Comments, setComments] = useState([]);

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

        axios.get('/api/comment/getComments', {params: variable})
            .then(response => {
                if (response.data.success) {
                    setComments(response.data.comments)
                    console.log(response.data.comments)
                } else {
                    alert('코멘트 정보 가져오기 실패')
                }
            })
    }, []);

    const refreshFunction = (newComment) => {
        setComments(Comments.concat(newComment))
    }

    if(VideoDetail.writer) {

        const subscribeButton = VideoDetail.writer._id !== localStorage.getItem('userId') && <Subscribe userTo={VideoDetail.writer._id} userFrom={localStorage.getItem('userId')}/>

        return (
            <Row gutter={[16,16]}>
                <Col lg={18} xs={24}>
                    <div style={{ width:'100%', padding:'3rem 4rem' }}>
                        <video style={{ width:'100%'}} src={`http://localhost:5000/${VideoDetail.filePath}`} controls></video>

                        <List.Item
                            actions={[ <LikeDislikes video userTo={VideoDetail.writer._id} userId={localStorage.getItem('userId')} videoId={videoId}/> ,subscribeButton ]}
                        >
                            <List.Item.Meta
                                avatar={<Avatar src={VideoDetail.writer && VideoDetail.writer.image} />}
                                title={VideoDetail.title}
                                description={VideoDetail.description}
                            />
                        </List.Item>
                        {/*comment part*/}
                        <Comment refreshFunction={refreshFunction} commentLists={Comments} videoId={videoId}/>
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