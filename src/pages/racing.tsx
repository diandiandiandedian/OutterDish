import React, { useEffect } from 'react';
import LayoutWithTabs from '../components/LayoutWithTabs';
import OrderPage from '../components/OrderPage';
import RacingPage from "../components/RacingPage";

const Order: React.FC = () => {
    useEffect(() => {
        document.body.style.overflow = 'auto'; // 确保恢复滚动
    }, []);

    return (
        <LayoutWithTabs fromLogin="0">
            <RacingPage />
        </LayoutWithTabs>
    );
};

export default Order;
