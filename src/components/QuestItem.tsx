import React, {useEffect, useState} from 'react';
import {BASE_URL} from "../config/constant";
import {useNotification} from "../context/NotificationContext";
import {useRouter} from 'next/router';

interface QuestItemProps {
    imgSrc: string;
    title: string;
    description: string;
    points: number;
    id: string; // 添加标记位
}

const QuestItem: React.FC<QuestItemProps> = ({imgSrc, title, description, points, id}) => {
    const {showSuccess, showError} = useNotification();
    const [claimLoading, setClaimLoading] = useState(false);
    const [joinLoading, setJoinLoading] = useState(false);
    const [tgUserId, setTgUserId] = useState<string | null>(null);
    const [token, setToken] = useState<string | null>(null);
    const router = useRouter();

    useEffect(() => {
        const tgUserId = localStorage.getItem('tgUserId');
        const token = localStorage.getItem('token');
        setTgUserId(tgUserId);
        setToken(token);
    }, []);

    const handleJoinClick = async () => {
        if (id === 'tg') {
            window.location.href = 'https://t.me/OutterDishGang';
        } else if (id === 'x') {
            window.location.href = 'https://x.com/outterdish?s=21&t=Ci4cl542w-9W6fnarwq5nA';
            localStorage.setItem('xFollowed', 'true');
        }
    };

    const handleClaimClick = async () => {
        const xFollowed = localStorage.getItem('xFollowed');
        if (id === 'x' && !xFollowed) {
            showError('You must follow on X before claim');
            return;
        }

        setClaimLoading(true);
        const tgOrX = id === 'tg' ? 2 : 3;

        if (tgUserId && token) {
            const response = await fetch(BASE_URL + '/tg/addGavePoint', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({tgUserId, token, tgOrX}),
            });
            //
            const resResult = await response.json();
            if (!resResult.success) {
                showError(resResult.msg);
            } else {
                showSuccess('Claim Success');
                setTimeout(() => {
                    window.location.reload();
                }, 1000);
            }
        } else {
            showError('Network Error');
        }
        setClaimLoading(false);
    };

    function shareTG() {
        const text = encodeURIComponent(`Invite your friend to earn more points! t.me/afdafadf_bot/fewrreqw?inviter=` + tgUserId);
        // window.open(`https://telegram.me/share/url?text=` + text, '_blank');
        (window as any).Telegram.WebApp.openTelegramLink(
            `https://t.me/share/url?url=${text}`
        );
        // window.open(`tg://msg?text=Invite your friend to earn more points! t.me/DISHSOON_bot?start=`+tgUser['id'], '_blank');
    }

    return (
        <div className="bg-[#FFBF59] p-4 rounded-lg shadow-md mb-4">
            <div className="flex items-center justify-between mb-2">
                <img src={imgSrc} alt={title} className="w-10 h-10"/>
                <div className="flex-1 mx-4 text-left">
                    <div className="text-base mb-2">{title}</div>
                    <div className="text-xs text-[#6A6A6A] text-left">{description}</div>
                </div>
                <div className="flex flex-col">
                    <div className="text-xs mb-2 flex items-center">
                        <img src="/ottercoin.svg" alt="Coin" className="inline w-4 h-4 mr-1"/>
                        <span className="mt-1">{points}</span>
                    </div>
                    {id !== 'invite'?(
                        <div>
                        <button className="bg-[#41BAFF] text-sm text-white px-2 py-1 rounded-full mb-1" onClick={handleJoinClick}>
                        {joinLoading ? (<span className="loading loading-spinner loading-sm"></span>) : 'Follow'}
                    </button>
                    <button className="bg-[#FFE541] text-sm text-black px-2 py-1 rounded-full" onClick={handleClaimClick}>
                        {claimLoading ? (<span className="loading loading-spinner loading-sm"></span>) : 'Claim'}
                    </button></div>):(<button className="bg-[#FFE541] text-sm text-black px-2 py-1 rounded-full" onClick={shareTG}>
                        {claimLoading ? (<span className="loading loading-spinner loading-sm"></span>) : 'Invite'}
                    </button>)}
                </div>
            </div>
        </div>
    );
};

export default QuestItem;
