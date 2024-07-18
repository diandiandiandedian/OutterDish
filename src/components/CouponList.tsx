import React from 'react';
import CouponItem from './CouponItem';
import { useNotification } from "../context/NotificationContext";

interface CouponListProps {
    coupons: Array<any>;
}

const CouponList: React.FC<CouponListProps> = ({ coupons }) => {
    const { showSuccess } = useNotification();

    const handleCopyCode = (code: string) => {
        navigator.clipboard.writeText(code);
        showSuccess("Coupon code copied to clipboard");
    };

    return (
        <div className="space-y-4 mb-8 flex flex-col items-center">
            {coupons.map(coupon => (
                <div key={coupon.id} className="bg-[#FF864180] p-4 rounded-lg shadow-md w-full">
                    <div className="flex items-center h-20">
                        <div className="flex items-center">
                            <img src={coupon.image} alt="Coupon" className="w-16 h-16 rounded-lg"/>
                        </div>
                        <div className="border-r border-dashed border-black h-full mx-4"></div>
                        <div className="text-2xl w-[70%] flex flex-col items-center justify-center">
                            <div className="text-sm text-center">{coupon.discount}</div>
                            <button onClick={() => handleCopyCode(coupon.code)} className="w-full p-2 rounded-full flex items-center justify-between">
                                <span className="flex-1 text-center">{coupon.code}</span>
                                <img src="/copy.svg" className="ml-2" alt=""/>
                            </button>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default CouponList;
