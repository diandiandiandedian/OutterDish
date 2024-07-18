import React, { useEffect } from 'react';
import LayoutWithTabs from '../components/LayoutWithTabs';
import QuestsPage from '../components/QuestsPage';

const Quests: React.FC = () => {
    useEffect(() => {
        document.body.style.overflow = 'auto'; // 确保恢复滚动
    }, []);

    return (
        <LayoutWithTabs fromLogin="0">
            <QuestsPage />
        </LayoutWithTabs>
    );
};

export default Quests;
