import React from 'react';
import QuestItem from '../components/QuestItem';
import {BASE_URL, inviteScoreLevel1, inviteScoreLevel2, inviteScoreLevel3, playgame, tgScoreGift, xScoreGift} from "../config/constant";
import {useRouter} from "next/router";

const QuestsPage: React.FC = () => {
    const router = useRouter();  // 获取router对象

    const handleExploreClick = () => {
        router.push('/wheel');
    };
    return (
        <div className="flex flex-col justify-center items-center h-screen text-center bg-[url('/bg.svg')] bg-cover">
            <div className="w-full p-4 overflow-y-auto">
                <div className="text-2xl mb-4 text-left">Quests</div>
                <div className="cursor-pointer mb-4" onClick={() => handleExploreClick()}>
                    <div className="flex flex-col text-white font-bold text-[15px] bg-black bg-opacity-50 bg-[url('/QuestBanner.jpg')] rounded-xl bg-cover">
                        <div className="ml-6 mt-4">
                            <div className="text-left">Outter Family Racing</div>
                            <div className="text-left">Season 1</div>
                        </div>
                        <div className="text-[40px]">
                            <div className="mt-8">100,000 Ton</div>
                            <div className="mb-6 mt-2">Giveaway</div>
                        </div>
                    </div>
                </div>
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

export default QuestsPage;
