import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import QuestItem from "./QuestItem";
import {BASE_URL, inviteScoreLevel1, inviteScoreLevel2, inviteScoreLevel3, playgame, tgScoreGift, xScoreGift} from "../config/constant";
import { useNotification } from "../context/NotificationContext";

const HomePage: React.FC = () => {
    const [balance, setBalance] = useState(0);
    const [rankings, setRankings] = useState('--');
    const [coupons, setCoupons] = useState(0);
    const [userName, setUserName] = useState("");
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

                setUserName(data.data.user['userName']);
                setBalance(data.data.user['gameScore']);
                // setRankings(data.data.user['gameScore'] < 2000 ? '--' : data.data['rank']);
                setRankings(data.data['rank']);
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
                        <h1 className="text-2xl">{userName}</h1>
                    </div>
                    <div className="flex space-x-4">
                        {/*<img src="/chat.svg" alt="Chat" className="w-8 h-8" />*/}
                        {/*<img src="/tg.svg" alt="Telegram" className="w-8 h-8" />*/}
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
                    imgSrc="/panter/startai.jpg"
                    title="Use StarAI"
                    description="Play StarAI for Airdrop"
                    points={playgame}
                    id="startAI"
                />
                <QuestItem
                    imgSrc="/chipigo.png"
                    title="Play Chipigo"
                    description="Play Outter‘s friend Chipigo‘s game"
                    points={playgame}
                    id="Chipigo"
                />

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
                    description="Follow OutterDish‘s X"
                    points={xScoreGift}
                    id="x"
                />
                <QuestItem
                    imgSrc="/invite.svg"
                    title="Invite 1 fren"
                    description="Invite 1 fren to play OutterDish"
                    points={inviteScoreLevel1}
                    id="invite1"
                />
                <QuestItem
                    imgSrc="/invite.svg"
                    title="Invite 3 frens"
                    description="Invite 3 frens to play OutterDish"
                    points={inviteScoreLevel2}
                    id="invite2"
                />
                <QuestItem
                    imgSrc="/invite.svg"
                    title="Invite 10 frens"
                    description="Invite 10 frens to play OutterDish"
                    points={inviteScoreLevel3}
                    id="invite3"
                />


                <div className='h-[100px]'></div>
            </div>
        </div>
    );
};

export default HomePage;
