import React from 'react';

interface CouponItemProps {
    coupon: {
        brand: string;
        discount: string;
        cost: number;
        image: string;
    };
}

const CouponItem: React.FC<CouponItemProps> = ({ coupon }) => (
    <div className="flex items-center justify-center bg-[#FF864180] p-4 rounded-lg shadow-md h-24">
        <img src={coupon.image} alt={coupon.brand} className="w-16 h-16" />
        <div className="border-r border-dashed border-black h-full mx-4"></div>
        <div className="text-center mt-2 flex flex-col justify-center">
            <div className="text-xl font-bold">{coupon.discount}</div>
            <div className="text-sm flex items-center justify-center mx-[20px]">
                <img src="/ottercoin.svg" alt="Coin" className="inline w-4 h-4 mr-2" />
                <span className="mt-1">{coupon.cost}</span>
            </div>
        </div>
    </div>
);

export default CouponItem;
