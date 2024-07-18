import React from 'react';
import QuestItem from '../components/QuestItem';
import { BASE_URL, tgScoreGift, xScoreGift } from "../config/constant";
import { useNotification } from "../context/NotificationContext";

const QuestsPage: React.FC = () => {

    return (
        <div className="flex flex-col justify-center items-center h-screen text-center bg-[url('/bg.svg')] bg-cover">
            <div className="w-full p-4 overflow-y-auto">
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
                    description="Follow OutterDish‘s X"
                    points={xScoreGift}
                    id="x"
                />
                <QuestItem
                    imgSrc="/twitter.svg"
                    title="Invite Your Friend"
                    description="Invite Your Friend"
                    points={xScoreGift}
                    id="invite"
                />
                <div className='h-[100px]'></div>
            </div>
        </div>
    );
};

export default QuestsPage;
