import React, { Component } from "react";

class HistorySample extends Component {

    handleGoBack = () => {
        this.props.navigate(-1);
    };

    handleGoHome = () => {
        this.props.navigate('/');
    };

    //block prompt 구현해야함
    //https://denislistiadi.medium.com/react-router-v6-preventing-transitions-2389806e8556
    //https://velog.io/@ksmfou98/React-Router-v6-%EC%97%85%EB%8D%B0%EC%9D%B4%ED%8A%B8-%EC%A0%95%EB%A6%AC
    componentDidMount() {
        this.unblock = this.props.history.block('정말 떠나실 건가요?');
    }

    componentWillUnmount() {
        if (this.unblock){
            this.unblock();
        }
    }

    render() {
        return (
            <div>
                <button onClick={this.handleGoBack}>뒤로</button>
                <button onClick={this.handleGoHome}>홈으로</button>
            </div>
        );
    }
}

export default HistorySample;