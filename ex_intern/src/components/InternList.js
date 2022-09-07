import React, {useEffect, useState} from "react";
import InternMember from "./InternMember";
import axios from 'axios';

axios.defaults.withCredentials = true;

const InternList = () => {
    const [info, setInfo] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchData = async() => {
            setLoading(true);
            try{
                const response = await axios.get(
                    '/osd_intern_board'
                );
                setInfo(response.data['data'])
            } catch(err) {
                console.log(err)
            }
            setLoading(false);
        }
        fetchData();
    },[])

    if(loading){
        return <div>대기중...</div>;
    }

    if(!info){
        return null;
    }

    return(
        <div>
            {info.map((inf) => (
                <InternMember key={inf.intern_number} inf={inf} />
            ))}
        </div>
    );
}

export default InternList;