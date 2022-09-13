import React from "react";
import Comment from "./Comment";

const comments = [
    {
        name: "으아악",
        comment: "안녕하세요, 으아악입니다.",
    },
    {
        name: "히히히",
        comment: "리액트 어려워요!",
    },
    {
        name: "하하하핳",
        comment: "잠온다요",
    },
];


function CommentList(props) {
    return (
        <div>
            {comments.map((comment) => {
                return (
                    <Comment name={comment.name} comment={comment.comment} />
                );
            })}
        </div>
    );
}

export default CommentList;