import React, {useState} from 'react';
import {useRouter} from 'next/router';
import CouponItem from '../components/CouponItem';
import {BASE_URL, defaultCoupons} from "../config/constant";
import {useNotification} from "../context/NotificationContext";
import CouponList from "../components/CouponList";
import {any} from "prop-types";

interface Coupon {
    id: number;
    brand: string;
    discount: string;
    cost: number;
    image: string;
    code: string;
}

const CouponsPage: React.FC = () => {
    const router = useRouter();
    const [selectedCouponId, setSelectedCouponId] = useState<number | null>(null);
    const [showConfirmation, setShowConfirmation] = useState<boolean>(false);
    const [confirmLoading, setConfirmLoading] = useState(false);
    const [myCoupons, setMyCoupons] = useState<Coupon[]>([]);
    const {showSuccess, showError} = useNotification();

    const handleConfirm = async () => {
        const tgUserId = localStorage.getItem('tgUserId');
        const token = localStorage.getItem('token');

        if (!selectedCouponId) {
            alert("Please select a coupon");
            return;
        }
        setConfirmLoading(true)
        const response = await fetch(BASE_URL + '/coupon/save', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({tgUserId, token, coupon: selectedCouponId, isInit: 1}),
        });
        const resResult = await response.json()
        if (!resResult.success) {
            showError(resResult.msg)
        } else {
            const matchedCoupon = defaultCoupons.find((defaultCoupon: Coupon) => defaultCoupon.id === selectedCouponId);
            if (matchedCoupon) {
                setMyCoupons([matchedCoupon]);
                setShowConfirmation(true);
            } else {
                showError("Coupon not found");
            }
            setShowConfirmation(true);
        }
        setConfirmLoading(false)
    };

    const handleCouponClick = (couponId: number) => {
        setSelectedCouponId(couponId);
    };

    const handleExploreClick = () => {
        router.push('/home');
    };

    return (
        <div className="relative flex flex-col justify-center items-center h-screen text-center bg-[url('/bg.svg')] object-cover bg-cover">
            <h1 className="text-2xl mb-8 leading-relaxed mx-2">Now, claim your first exclusive coupon with $SOON</h1>
            <div className="space-y-4 mb-8">
                {defaultCoupons.map(coupon => (
                    <div
                        key={coupon.id}
                        onClick={() => handleCouponClick(coupon.id)}
                        className={`cursor-pointer border-2 border-[#FF864180] rounded-xl  ${selectedCouponId === coupon.id ? ' !border-yellow-500' : ''}`}
                    >
                        <CouponItem coupon={coupon}/>
                    </div>
                ))}
            </div>
            <button className="bg-[#FFE541B2] text-black p-4 rounded-full text-xl w-3/5 shadow-[0px_4px_4px_0px_#FEA75CDE]" onClick={handleConfirm}>
                {confirmLoading ? (<span className="loading loading-spinner loading-sm"></span>) : ('Confirm')}
            </button>

            {showConfirmation && (
                <div className="fixed inset-0 flex justify-center items-center z-10">
                    <div className="absolute inset-0 bg-black bg-opacity-50"></div>
                    <div className="bg-white p-6 rounded-lg text-center z-20 bg-opacity-100">
                        <div className="text-2xl mb-4">Your Coupon</div>
                        <CouponList coupons={myCoupons}/>
                        <div className="text-lg mb-4 text-black">has been saved to your wallet</div>
                        <div className="text-sm mb-8 text-black">You can check it anytime in 'Main' - 'Coupon'</div>
                        <button
                            className="bg-[#D9D9D9] text-black p-4 rounded-full text-xl w-full"
                            onClick={handleExploreClick}
                        >
                            Explore OutterDish
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default CouponsPage;
