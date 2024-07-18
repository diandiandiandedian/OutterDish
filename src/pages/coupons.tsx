import React, { useEffect } from 'react';
import LayoutWithTabs from '../components/LayoutWithTabs';
import CouponsPage from '../components/CouponsPage';

const Coupons: React.FC = () => {
    useEffect(() => {
        document.body.style.overflow = 'auto'; // 确保恢复滚动
    }, []);

    return (
        <LayoutWithTabs fromLogin="0">
            <CouponsPage />
        </LayoutWithTabs>
    );
};

export default Coupons;
