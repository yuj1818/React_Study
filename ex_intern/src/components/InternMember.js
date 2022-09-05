import React from "react";

const InternMember = ({inf}) => {
    const {intern_number, intern_name, intern_duty, intern_age} = inf;
    return (
        <div>
            <p>{intern_number}</p>
            <p>{intern_name}</p>
            <p>{intern_duty}</p>
            <p>{intern_age}</p>
            <br/>
        </div>
    );
};

export default InternMember;