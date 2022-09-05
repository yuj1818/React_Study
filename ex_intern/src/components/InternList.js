import React from "react";
import InternMember from "./InternMember";
import axios from 'axios';
import usePromise from "../lib/usePromise";

const InternList = () => {
    const [loading, response, error] = usePromise(() => {
        return axios.get(
            `/osd_intern_board`
        );
    }, []);

    if(loading) {
        return <div>대기 중...</div>
    }

    if(!response) {
        return null;
    }

    if(error) {
        return <div>에러 발생!</div>
    }

    const {info} = response.data;
    return (
        <div>
            {info.map(inf => (
                <InternMember key={inf.intern_number} inf={inf}/>
            ))}
        </div>
    );
};

export default InternList;