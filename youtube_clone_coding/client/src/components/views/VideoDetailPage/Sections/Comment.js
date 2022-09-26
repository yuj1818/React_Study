import React, {useState} from 'react';
import axios from "axios";
import { useSelector } from "react-redux";
import SingleComment from "./SingleComment";
import ReplyComment from "./ReplyComment";

function Comment(props) {

    const user = useSelector(state => state.user);
    const [commentValue, setCommentValue] = useState("");

    const handleClick = (event) => {
        setCommentValue(event.currentTarget.value)
    }

    const onSubmit = (event) => {
        event.preventDefault();

        const variables = {
            content: commentValue,
            writer: user.userData._id,
            postId: props.videoId
        }

        axios.post('/api/comment/saveComment', variables)
            .then(response => {
                if(response.data.success) {
                    setCommentValue("")
                    props.refreshFunction(response.data.result)
                } else {
                    alert('코멘트 저장 실패')
                }
            })
    }

    return (
        <div>
            <br />
            <p> Replies </p>
            <hr />

            {/*Comment Lists*/}
            {props.commentLists && props.commentLists.map((comment, index) => (
                (!comment.responseTo &&
                    <React.Fragment>
                        <SingleComment refreshFunction={props.refreshFunction} comment={comment} postId={props.videoId} />
                        <ReplyComment refreshFunction={props.refreshFunction} postId={props.videoId} parentCommentId={comment._id} commentLists={props.commentLists} />
                    </React.Fragment>
                )
            ))}

            {/*Root Comment Form*/}

            <form style={{ display:'flex' }} onSubmit={onSubmit} >
                <textarea
                    style={{ width:'100%', borderRadius:'5px' }}
                    onChange={handleClick}
                    value={commentValue}
                    placeholder="코멘트를 작성해주세요"
                />
                <br />
                <button style={{ width:'20%', height:'52px' }} onClick={onSubmit} >Submit</button>
            </form>
        </div>
    )
}

export default Comment;