import React, { useEffect } from 'react';
import LayoutWithTabs from '../components/LayoutWithTabs';
import FallingEggsGame from '../components/FallingEggsGame';
import {useRouter} from "next/router";

const Game: React.FC = () => {
    useEffect(() => {
        document.body.style.overflow = 'hidden'; // 禁用页面滚动
        return () => {
            document.body.style.overflow = 'auto'; // 组件卸载时恢复滚动
        };
    }, []);

    const router = useRouter();
    const {fromLogin}: any = router.query;
    // console.log('fromLogin', fromLogin)

    return (
        <LayoutWithTabs fromLogin={fromLogin}>
            <FallingEggsGame fromLogin={fromLogin}/>
        </LayoutWithTabs>
    );
};

export default Game;
