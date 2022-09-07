import React from "react";

const InternMember = ({inf}) => {
    const {intern_number, intern_name, intern_duty, intern_age} = inf;
    return (
        <div>
            <li>
                {intern_number} - {intern_name} ({intern_duty} / {intern_age})
            </li>
        </div>
    );
};

export default InternMember;