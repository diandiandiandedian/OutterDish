import React from 'react';
import { useRouter } from 'next/router';

const RacingPage: React.FC = () => {
    const router = useRouter();

    // 示例数据
    const users = [
        { id: 1, name: 'J. Paul', invites: 20, prize: '$40' },
        { id: 2, name: 'J. Paul', invites: 20, prize: '$40' },
        { id: 3, name: 'J. Paul', invites: 20, prize: '$40' },
        { id: 4, name: 'J. Paul', invites: 20, prize: '$40' },
        { id: 5, name: 'J. Paul', invites: 20, prize: '$40' },
        { id: 6, name: 'J. Paul', invites: 20, prize: '$40' },
        { id: 7, name: 'J. Paul', invites: 20, prize: '$40' },
    ];

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-[url('/bg.svg')] object-cover bg-cover">
            <button onClick={() => router.push('/previous-page')} className="absolute top-4 left-4">
                <img src="/back-icon.png" alt="Back" />
            </button>

            <h1 className="text-4xl font-bold mt-8">Outter Racing Season I</h1>
            <p className="mt-4 text-xl text-center">Invite your frens to join Outter Family and get total 100 USDT rewards!</p>

            <button className="bg-[#FFE541] p-4 rounded-full text-black mt-8 shadow-lg">
                Share Invite to Race
            </button>

            <div className="mt-8 bg-[#FFBF59] p-4 rounded-lg w-[90%] max-w-xl">
                <div className="flex justify-between mb-4">
                    <span className="font-bold text-center w-[30%]">Users</span>
                    <span className="font-bold">Invites</span>
                    <span className="font-bold">Prize</span>
                </div>
                {users.map((user, index) => (
                    <div key={user.id} className="relative flex items-center h-12 w-full bg-[#FFBF59] mb-2 rounded-lg">
                        {/* 用户的卡丁车图片 */}
                        <img
                            src="/racing/racing1.png"
                            alt="User Icon"
                            className="absolute left-0 h-full"
                            style={{ zIndex: 10, marginLeft: '-20px' }}
                        />

                        {/* 梯形背景，右边调整为直角 */}
                        <div
                            className="h-full w-full flex justify-between items-center text-white pl-28 pr-8"
                            style={{
                                clipPath: 'polygon(20% 0%, 100% 0%, 100% 100%, 0% 100%)',
                                background: `linear-gradient(-41deg, #FF0000 33.33%, #FF6347 33.33%, #FF6347 66.66%, #FF7F50 66.66%)`,
                                padding: '0 10px',
                            }}
                        >
                            <span className="text-xl w-[30%] text-center">{user.name}</span>
                            <span className="text-xl">{user.invites}</span>
                            <span className="text-xl">{user.prize}</span>
                        </div>
                    </div>
                ))}
            </div>

            <div className="mt-8 text-lg flex justify-between w-full max-w-xl">
                <span>278. You</span>
                <span>Invites: 10</span>
            </div>
        </div>
    );
};

export default RacingPage;
