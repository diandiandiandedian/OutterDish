import React, {useEffect, useState} from 'react';
import {BASE_URL} from "../config/constant";
import {useNotification} from "../context/NotificationContext";
import {useRouter} from 'next/router';
import {getOS} from '../utils/detectOS'; // 导入工具函数


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
        console.log('(window as any).Telegram', (window as any).Telegram)
        const tgUserId = localStorage.getItem('tgUserId');
        const token = localStorage.getItem('token');
        setTgUserId(tgUserId);
        setToken(token);
    }, []);

    const handleJoinClick = async () => {
        const os = getOS();
        // alert(os)
        if (id === 'tg') {
            window.location.href = 'https://t.me/OutterDishGang';
        } else if (id === 'x') {
            if (os === 'iOS') {
                window.location.href = 'https://x.com/outterdish';
            } else if (os === 'Android') {
                window.open("twitter://user?screen_name=OutterDish", "_blank");
            }
            // window.location = '';
            localStorage.setItem('xFollowed', 'true');
        } else if (id.indexOf('invite') !== -1) {
            const text = encodeURIComponent(`I'm earning money on Telegram with just tapping, come and join us: t.me/OutterDish_bot/Main?startapp=` + tgUserId);
            // window.open(`https://telegram.me/share/url?text=` + text, '_blank');
            (window as any).Telegram.WebApp.openTelegramLink(
                `https://t.me/share/url?url=${text}`
            );
        } else if (id === 'noton') {
            localStorage.setItem('noton', 'true');
            window.location.href = 'https://t.me/NotonOffice_bot/game';
        } else if (id === 'TapPop') {
            localStorage.setItem('TapPop', 'true');
            window.location.href = 'https://t.me/tappopbot?start=7432874170';
        }
    };

    const handleClaimClick = async () => {
        const xFollowed = localStorage.getItem('xFollowed');
        if (id === 'x' && !xFollowed) {
            showError('You must follow on X before claim');
            return;
        }
        const noton = localStorage.getItem('noton');
        if (id === 'noton' && !noton) {
            showError('You must play noton before claim');
            return;
        }
        const startAI = localStorage.getItem('TapPop');
        if (id === 'TapPop' && !startAI) {
            showError('You must play TapPop before claim');
            return;
        }

        setClaimLoading(true);
        let tgOrX = 2;
        if (id === 'x') {
            tgOrX = 3
        } else if (id === 'invite1') {
            tgOrX = 5
        } else if (id === 'invite2') {
            tgOrX = 6
        } else if (id === 'invite3') {
            tgOrX = 7
        } else if (id === 'noton') {
            tgOrX = 8
        } else if (id === 'TapPop') {
            tgOrX = 9
        }

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

    // function shareTG() {
    //     const text = encodeURIComponent(`Invite your friend to earn more $DISH! t.me/OutterDish_bot/Main?startapp=` + tgUserId);
    //     // window.open(`https://telegram.me/share/url?text=` + text, '_blank');
    //     (window as any).Telegram.WebApp.openTelegramLink(
    //         `https://t.me/share/url?url=${text}`
    //     );
    //     // window.open(`tg://msg?text=Invite your friend to earn more points! t.me/DISHSOON_bot?start=`+tgUser['id'], '_blank');
    // }

    return (
        <div className="bg-[#FFBF59] p-4 rounded-lg shadow-md mb-4">
            <div className="flex items-center justify-between mb-2">
                <img src={imgSrc} alt={title} className="w-10 h-10"/>
                <div className="flex-1 mx-4 text-left">
                    <div className="text-base">{title}</div>
                    {description !== "" &&<div className="text-xs text-[#6A6A6A] mt-2 text-left">{description}</div>}
                </div>
                <div className="flex flex-col">
                    <div className="text-xs mb-2 flex items-center">
                        <img src="/ottercoin.svg" alt="Coin" className="inline w-4 h-4 mr-1"/>
                        <span className="mt-1">{points}</span>
                    </div>
                    <div className="flex flex-col">
                        <button className="bg-[#41BAFF] text-sm text-white px-2 py-1 rounded-full mb-1" onClick={handleJoinClick}>
                            {joinLoading ? (<span className="loading loading-spinner loading-sm"></span>) : id.indexOf('invite') !== -1 ? 'Share' : (id === 'noton' || id === 'TapPop') ? 'Play' : 'Follow'}
                        </button>
                        <button className="bg-[#FFE541] text-sm text-black px-2 py-1 rounded-full" onClick={handleClaimClick}>
                            {claimLoading ? (<span className="loading loading-spinner loading-sm"></span>) : 'Claim'}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default QuestItem;
