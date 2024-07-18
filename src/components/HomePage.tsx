import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import QuestItem from "./QuestItem";
import { BASE_URL, tgScoreGift, xScoreGift } from "../config/constant";
import { useNotification } from "../context/NotificationContext";

const HomePage: React.FC = () => {
    const [balance, setBalance] = useState(0);
    const [rankings, setRankings] = useState('--');
    const [coupons, setCoupons] = useState(0);
    const { showSuccess, showError } = useNotification();
    const router = useRouter();


    useEffect(() => {
        const fetchData = async () => {
            try {
                const tgUserId = localStorage.getItem('tgUserId');
                const token = localStorage.getItem('token');
                if (!tgUserId || !token) {
                    console.error('Username or token not found in local storage');
                    return;
                }

                const response = await fetch(BASE_URL + '/tg/queryScoreAndRank', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ tgUserId: tgUserId, token }),
                });

                const data = await response.json();

                setBalance(data.data.user['gameScore']);
                setRankings(data.data.user['gameScore'] < 2000 ? '--' : data.data['rank']);
                setCoupons(data.data['coupon'].length);

            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        };

        fetchData();
    }, []);

    const handleCouponsClick = () => {
        router.push('/coupons?myCoupons=true');
    };

    return (
        <div className="flex flex-col justify-center items-center h-screen text-center bg-[url('/bg.svg')] object-cover bg-cover">
            <div className="w-full p-4 overflow-y-auto">
                <div className="flex justify-between items-center mb-4">
                    <div className="flex items-center">
                        <img src="/ottercoin.svg" alt="Logo" className="w-16 h-16 mr-4" />
                        <h1 className="text-2xl">OutterDish</h1>
                    </div>
                    <div className="flex space-x-4">
                        <img src="/chat.svg" alt="Chat" className="w-8 h-8" />
                        <img src="/tg.svg" alt="Telegram" className="w-8 h-8" />
                    </div>
                </div>
                <div className="bg-[#FF8641] p-4 rounded-lg shadow-md mb-4">
                    <div className="text-base text-left">Balance</div>
                    <div className="text-4xl font-bold">{balance}</div>
                </div>
                <div className="flex justify-between mb-4">
                    <div className="bg-[#FFBF59] p-4 rounded-lg shadow-md w-[45%]">
                        <div className="text-base mb-4">Rankings</div>
                        <div className="text-2xl font-bold">{rankings}</div>
                    </div>
                    <div className="bg-[#FFBF59] p-4 rounded-lg shadow-md w-[45%] cursor-pointer" onClick={handleCouponsClick}>
                        <div className="text-base mb-4">My Coupons</div>
                        <div className="text-2xl font-bold">{coupons}</div>
                    </div>
                </div>
                <div className="text-2xl mb-4 text-left">Quests</div>
                <QuestItem
                    imgSrc="/tg.svg"
                    title="Join OutterDish Chat"
                    description="Join the OutterDish Telegram channel"
                    points={tgScoreGift}
                    id="tg"
                />
                <QuestItem
                    imgSrc="/twitter.svg"
                    title="Follow OutterDish on X"
                    description="Join the OutterDish Twitter channel"
                    points={xScoreGift}
                    id="x"
                />
                <div className='h-[100px]'></div>
            </div>
        </div>
    );
};

export default HomePage;
