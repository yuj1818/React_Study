import React, { useState, useEffect } from 'react';
import { Tooltip } from "antd";
import { LikeOutlined } from "@ant-design/icons";
import { DislikeOutlined } from "@ant-design/icons";
import { LikeFilled } from "@ant-design/icons";
import { DislikeFilled } from "@ant-design/icons";
import axios from "axios";

function LikeDislikes(props) {

    const [Likes, setLikes] = useState(0);
    const [Dislikes, setDislikes] = useState(0);
    const [LikeAction, setLikeAction] = useState(null);
    const [DislikeAction, setDislikeAction] = useState(null);

    let variable = {}

    if(props.video) {
        variable =  {videoId: props.videoId, userId: props.userId}
    } else {
        variable = { commentId: props.commentId, userId: props.userId}
    }



    useEffect(() => {
        axios.get('/api/like/getLikes', {params:variable})
            .then(response => {
                if(response.data.success) {
                    //얼마나 많은 좋아요를 받았는지
                    setLikes(response.data.likes.length)
                    //내가 이미 그 게시물의 좋아요를 눌렀는지
                    response.data.likes.map(like => {
                        if(like.userId === props.userId) {
                            setLikeAction('liked')
                        }
                    })
                } else {
                    alert('Likes 정보 가져오기 실패')
                }
            })

        axios.get('/api/like/getDislikes', {params:variable})
            .then(response => {
                if(response.data.success) {
                    //얼마나 많은 싫어요를 받았는지
                    setDislikes(response.data.dislikes.length)
                    //내가 이미 그 게시물의 싫어요를 눌렀는지
                    response.data.dislikes.map(dislike => {
                        if(dislike.userId === props.userId) {
                            setDislikeAction('disliked')
                        }
                    })
                } else {
                    alert('Dislikes 정보 가져오기 실패')
                }
            })
    }, []);

    const onLike = () => {

        const isUser = localStorage.getItem('userId')

        if(isUser) {
            if(props.userTo === isUser) {
                alert('자신의 게시물에는 좋아요를 누를 수 없습니다.')
            }
            else if(LikeAction === null) {
                axios.post('/api/like/upLike', variable)
                    .then(response => {
                        if(response.data.success) {
                            setLikes(Likes + 1)
                            setLikeAction('liked')

                            if(DislikeAction !== null) {
                                setDislikeAction(null)
                                setDislikes(Dislikes - 1)
                            }
                        } else {
                            alert('Like 올리기 실패')
                        }
                    })
            } else {
                axios.post('/api/like/unLike', variable)
                    .then(response => {
                        if(response.data.success) {
                            setLikes(Likes - 1)
                            setLikeAction(null)
                        } else {
                            alert('Like 내리기 실패')
                        }
                    })
            }
        } else {
            alert('로그인 후 이용해주세요')
        }
    }

    const onDislike = () => {

        const isUser = localStorage.getItem('userId');

        if(isUser) {
            if(props.userTo === isUser) {
                alert('자신의 게시물에는 싫어요를 누를 수 없습니다.')
            }
            else if(DislikeAction === null) {
                axios.post('/api/like/upDislike', variable)
                    .then(response => {
                        if(response.data.success) {
                            setDislikes(Dislikes + 1)
                            setDislikeAction('disliked')

                            if(LikeAction !== null) {
                                setLikeAction(null)
                                setLikes(Likes - 1)
                            }
                        } else {
                            alert('Dislike 올리기 실패')
                        }
                    })
            } else {
                axios.post('/api/like/unDislike', variable)
                    .then(response => {
                        if(response.data.success) {
                            setDislikes(Dislikes - 1)
                            setDislikeAction(null)
                        } else {
                            alert('Dislike 내리기 실패')
                        }
                    })
            }
        } else {
            alert('로그인 후 사용해주세요')
        }
    }
    
    return (
        <div>
            <span key="comment-basic-like">
                <Tooltip title="Like">
                    {LikeAction === 'liked' ? <LikeFilled onClick={onLike} /> : <LikeOutlined onClick={onLike} /> }
                </Tooltip>
                <span style={{ paddingLeft:'8px', cursor:'auto' }}>{Likes}</span>
            </span>&nbsp;&nbsp;

            <span key="comment-basic-dislike">
                <Tooltip title="Dislike">
                    {DislikeAction === 'disliked' ? <DislikeFilled onClick={onDislike} /> : <DislikeOutlined onClick={onDislike} /> }
                </Tooltip>
                <span style={{ paddingLeft:'8px', cursor:'auto' }}>{Dislikes}</span>
            </span>&nbsp;&nbsp;
        </div>
    );
}

export default LikeDislikes;