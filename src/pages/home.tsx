import React, { useEffect } from 'react';
import LayoutWithTabs from '../components/LayoutWithTabs';
import HomePage from '../components/HomePage';

const Home: React.FC = () => {
    useEffect(() => {
        document.body.style.overflow = 'auto'; // 确保恢复滚动
    }, []);

    return (
        <LayoutWithTabs fromLogin="0">
            <HomePage />
        </LayoutWithTabs>
    );
};

export default Home;
