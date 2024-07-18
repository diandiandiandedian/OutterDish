import React, {useEffect, useState} from 'react';
import {useRouter} from 'next/router';
import CouponItem from '../components/CouponItem';
import {BASE_URL, defaultCoupons} from "../config/constant";
import {useNotification} from "../context/NotificationContext";
import CouponList from "./CouponList";

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
    const [coupons, setCoupons] = useState<Coupon[]>([]);
    const [balance, setBalance] = useState(0);
    const [selectedCoupon, setSelectedCoupon] = useState<any | null>(null);
    const [showConfirmRedeem, setShowConfirmRedeem] = useState<boolean>(false);
    const [swapLoading, setSwapLoading] = useState(false);
    const {showSuccess, showError} = useNotification();

    useEffect(() => {
        const {myCoupons} = router.query;
        const tgUserId = localStorage.getItem('tgUserId');
        const token = localStorage.getItem('token');

        if (!myCoupons){
            setCoupons(defaultCoupons);
        }

        if (tgUserId && token) {
            fetch(BASE_URL + '/tg/queryScoreAndRank', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({tgUserId, token}),
            })
                .then(response => response.json())
                .then(data => {
                    setBalance(data.data.user['gameScore']);
                    if (myCoupons) {
                        const userCoupons = data.data['coupon'].map((coupon: any) => {
                            const matchedCoupon = defaultCoupons.find(defaultCoupon => defaultCoupon.id === coupon.coupon);
                            return { ...coupon, ...matchedCoupon };
                        });
                        setCoupons(userCoupons);
                    }
                })
                .catch(error => {
                    console.error('Error fetching user coupons:', error);
                });
        }
    }, [router.query]);

    const handleCouponClick = (coupon: any) => {
        if (!router.query.myCoupons) {
            setSelectedCoupon(coupon);
            setShowConfirmRedeem(true);
        }
    };

    const confirmRedeem = async () => {
        const tgUserId = localStorage.getItem('tgUserId');
        const token = localStorage.getItem('token');

        setSwapLoading(true);
        const response = await fetch(BASE_URL + '/coupon/save', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({tgUserId, token, coupon: selectedCoupon.id, isInit: 0}),
        });

        const resResult = await response.json();
        if (!resResult.success) {
            showError(resResult.msg);
        } else {
            showSuccess("Swap Success");
        }
        setSwapLoading(false);

        setShowConfirmRedeem(false);
    };

    return (
        <div className="flex flex-col justify-center h-screen text-center bg-[url('/bg.svg')] bg-cover">
            <div className="text-left ml-8 mt-4">
                <h1 className="text-xl leading-relaxed mx-2">{router.query.myCoupons ? "My Coupons" : "Grab latest promo with your $DISH"}</h1>
                <h1 className="text-xl leading-relaxed mx-2">{router.query.myCoupons ? "" : "Balance: " + balance}</h1>
            </div>
            <div className="mt-4 px-4 overflow-y-auto space-y-4 mb-20">
                {router.query.myCoupons ? <CouponList coupons={coupons}/> :
                    coupons.map(coupon => (
                        <div key={coupon.id} onClick={() => handleCouponClick(coupon)} className="cursor-pointer max-w-[250px] mx-auto">
                            <CouponItem coupon={coupon}/>
                        </div>
                    ))}
            </div>

            {/*确认兑换框*/}
            {showConfirmRedeem && selectedCoupon && (
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-black bg-opacity-30 flex justify-center items-center z-50 w-[80%] rounded-lg">
                    <div className="bg-white p-6 rounded-lg text-center mx-auto w-[100%] ">
                        <div className="mb-4">Burn {selectedCoupon.cost} $DISH for {selectedCoupon.brand} {selectedCoupon.discount}</div>
                        <div className="flex justify-around">
                            <button
                                className="bg-red-500 text-white p-2 rounded-full"
                                onClick={() => setShowConfirmRedeem(false)}
                            >
                                Cancel
                            </button>
                            <button
                                className="bg-green-500 text-white p-2 rounded-full"
                                onClick={confirmRedeem}
                            >
                                {swapLoading ? (<span className="loading loading-spinner loading-sm"></span>) : ('Confirm')}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default CouponsPage;
