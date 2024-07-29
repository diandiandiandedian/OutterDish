import React from 'react';
import QuestItem from '../components/QuestItem';
import {BASE_URL, inviteScoreLevel1, inviteScoreLevel2, inviteScoreLevel3, tgScoreGift, xScoreGift} from "../config/constant";
import { useNotification } from "../context/NotificationContext";

const QuestsPage: React.FC = () => {

    return (
        <div className="flex flex-col justify-center items-center h-screen text-center bg-[url('/bg.svg')] bg-cover">
            <div className="w-full p-4 overflow-y-auto">
                <div className="text-2xl mb-4 text-left">Quests</div>
                <QuestItem
                    imgSrc="/chipigo.png"
                    title="Play Chipigo"
                    description="Play Outter‘s friend Chipigo‘s game"
                    points={inviteScoreLevel3}
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
