import { Outlet, useNavigate } from 'react-router-dom';
import { useContext, useEffect, useCallback } from 'react';
import { UNSAFE_NavigationContext as NavigationContext } from 'react-router-dom';

const Layout = () => {
    function useBlocker(blocker, when = true) {
        const { navigator } = useContext(NavigationContext);

        useEffect(() => {
            if(!when) return;

            const unblock = navigator.block((tx) => {
                const autoUnblockingTx = {
                    ...tx,
                    retry() {
                        unblock();
                        tx.retry();
                    },
                };
                blocker(autoUnblockingTx);
            });
            return unblock;
        }, [navigator, blocker, when]);
    }


    function usePrompt(message, when = true) {
        const blocker = useCallback((tx) => {
            //   eslint-disable-next-line no-alert
            if(window.confirm(message)) tx.retry();
        }, [message]);

        useBlocker(blocker, when);
    }

    const navigate = useNavigate();
    
    const goBack = () => {
        navigate(-1);
    };
    
    const goArticles = () => {
        navigate('/articles', {replace:true});
    };

    usePrompt('현재 페이지를 벗어나시겠습니까?', true);

    return (
        <div>
            <header style = {{ background: 'lightgray', padding: 16, fontSize: 24}}>
                <button onClick={goBack}>뒤로가기</button>
                <button onClick={goArticles}>게시글 목록</button>
            </header>
            <main>
                <Outlet />
            </main>
        </div>
    );
};

export default Layout;