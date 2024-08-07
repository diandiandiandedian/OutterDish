import React, {useRef, useEffect, useState} from 'react';
import {LuckyWheel, LuckyGrid} from 'lucky-canvas'
import {BASE_URL} from "../config/constant";
import {useNotification} from "../context/NotificationContext";
import {useRouter} from "next/router";


const LuckyWheelComponent = () => {

    interface Transaction {
        id: number;
        username: string;
        action: string;
        amount: number;
    }

    const transactions: Transaction[] = [
        {id: 1, username: 'Daniel001', action: 'just got', amount: 5},
        {id: 2, username: 'Daniel001', action: 'just withdraw', amount: 5},
        {id: 3, username: 'Daniel001', action: 'just got', amount: 5},
        {id: 4, username: 'Daniel001', action: 'just got', amount: 5},
    ];

    const [tonValue, setTonValue] = useState(0);

    const [blocks] = useState([
        {
            padding: '50px',
            imgs: [{
                src: '/spin-bg.png',
                width: '100%',
                height: '100%'
            }]
        },
    ])
    const prizeImg = {
        src: '/spin/ton-gift.svg',
        width: '40%',
        top: '40%'
    }
    const prizeImg2 = {
        src: '/spin/goodluck-gift.svg',
        width: '40%',
        top: '40%'
    }

    const prizeImg3 = {
        src: '/spin/point-gift.svg',
        width: '40%',
        top: '40%'
    }

    const prizeImg4 = {
        src: '/spin/auto-tappper-gift.svg',
        width: '40%',
        top: '40%'
    }

    const prizeImg5 = {
        src: '/spin/free-gift.svg',
        width: '40%',
        top: '40%'
    }

    const prizeImg6 = {
        src: '/spin/withdrwa-gift.svg',
        width: '40%',
        top: '40%'
    }


//    put("2", 0.001);
//    put("0.5", 0.003);
//    put("0.1", 0.05);
//    put("15000", 0.47);
//    put("Good luck", 0.47);
//    put("Auto-tapper", 0.007);
//    put("Free Spin", 0.002);
//    put("Directly Withdraw", 0.001);

    const myLuckyRef = useRef<HTMLDivElement | null>(null);
    const [showConfirmRedeem, setShowConfirmRedeem] = useState<boolean>(false);
    const [showMoreSpinDialog, setShowMoreSpinDialog] = useState<boolean>(false);
    const [pinPrize, setPinPrize] = useState<string>("");
    const [spinRemainTime, setSpinRemainTime] = useState<number>(2);
    const [userPoint, setUserPoint] = useState<number>(0);
    const [showTag, setShowTag] = useState<string>("");
    const {showSuccess, showError} = useNotification();
    const router = useRouter();  // 获取router对象


    const prizeList = ["2", "Good luck", '0.5', '0.1', '15000', 'Auto-tapper', 'Free Spin', 'Directly Withdraw']
    const prizeFontSize = "10px"
    const [prizes] = useState([
        {background: '#F8F0A0', fonts: [{text: '2', fontSize: prizeFontSize, fontStyle: "KGTenThousandReasons"}], imgs: [prizeImg]},
        {background: '#ffffff', fonts: [{text: 'Good luck', fontSize: prizeFontSize, fontStyle: "KGTenThousandReasons"}], imgs: [prizeImg2]},
        {background: '#F8F0A0', fonts: [{text: '0.5', fontSize: prizeFontSize, fontStyle: "KGTenThousandReasons"}], imgs: [prizeImg]},
        {background: '#ffffff', fonts: [{text: '0.1', fontSize: prizeFontSize, fontStyle: "KGTenThousandReasons"}], imgs: [prizeImg]},
        {background: '#F8F0A0', fonts: [{text: '15000', fontSize: prizeFontSize, fontStyle: "KGTenThousandReasons"}], imgs: [prizeImg3]},
        {background: '#ffffff', fonts: [{text: 'Auto-tapper', fontSize: prizeFontSize, fontStyle: "KGTenThousandReasons"}], imgs: [prizeImg4]},
        {background: '#F8F0A0', fonts: [{text: 'Free Spin', fontSize: prizeFontSize, fontStyle: "KGTenThousandReasons"}], imgs: [prizeImg5]},
        {background: '#ffffff', fonts: [{text: 'Directly Withdraw', fontSize: prizeFontSize, fontStyle: "KGTenThousandReasons"}], imgs: [prizeImg6]},
    ])
    const [buttons] = useState([
        // { radius: '40%', background: '#EC0A53' },
        // { radius: '40%', background: '#8A1A35' },
        // { radius: '35%', background: '#FCF1BD' },
        // {
        //     radius: '30%', background: '#CB366D',
        //     pointer: true,
        //     fonts: [{ text: '开始抽奖', top: '-10px' }]
        // }
        {
            radius: '45%',
            imgs: [{
                src: '/start2.png',
                width: '100%',
                top: '-130%'
            }]
        }
    ])
    useEffect(() => {
        if (myLuckyRef.current) {
            const myLucky = new LuckyWheel(myLuckyRef.current, {
                width: '300px',
                height: '300px',
                blocks: blocks,
                prizes: prizes,
                buttons: buttons,
                start: async () => {
                    if (spinRemainTime === 0) {
                        console.error('spinRemainTime,spinRemainTime', spinRemainTime)
                        setShowMoreSpinDialog(true)
                        return
                    }
                    myLucky.play();
                    // myLucky.stop(1);
                    // setTimeout(() => {
                    //     const index = Math.floor(Math.random() * prizes.length);
                    //     myLucky.stop(index);
                    // }, 2500);
                    const tgUserId = localStorage.getItem('tgUserId');
                    const token = localStorage.getItem('token');
                    if (!tgUserId || !token) {
                        console.error('Username or token not found in local storage');
                        return;
                    }
                    const response = await fetch(BASE_URL + '/spin/play', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({tgUserId: tgUserId, token}),
                    });
                    if (!response.ok) {
                        throw new Error('Failed to save score');
                    }
                    const resResult = await response.json();
                    if (resResult.success === false) {
                        // showError(resResult['msg'])
                        setShowMoreSpinDialog(true)
                        myLucky.stop(-1);
                        return
                    }
                    let index = prizeList.findIndex((i) => i === resResult.data)
                    console.log('index', index, resResult)
                    myLucky.stop(index);
                },
                end: (prize: any) => {
                    console.log(prize)
                    if (prize.fonts && prize.fonts.length > 0) {
                        setPinPrize(prize.fonts[0].text)
                        setShowConfirmRedeem(true);
                        setShowTag(prize.fonts[0].text)
                        setSpinRemainTime(spinRemainTime - 1)
                        // alert('恭喜你抽到 ' + prize.fonts[0].text);
                    } else {
                        // alert('恭喜你抽到一个奖品');
                    }
                }
            })
        }
    }, []);


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
                    body: JSON.stringify({tgUserId: tgUserId, token}),
                });

                const data = await response.json();
                setTonValue(data.data.user['tonValue'])
                setSpinRemainTime(data.data.user['spinRemainTime']);
                setUserPoint(data.data.user['gameScore']);

            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        };
        fetchData();
    }, []);

    async function buySpin() {
        try {
            const tgUserId = localStorage.getItem('tgUserId');
            const token = localStorage.getItem('token');
            if (!tgUserId || !token) {
                console.error('Username or token not found in local storage');
                return;
            }
            const response = await fetch(BASE_URL + '/spin/buySpin', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({tgUserId: tgUserId, token}),
            });
            const data = await response.json();
            console.log('data', data)
            if (data.success === false) {
                // 没成功
                showError(data['msg'])
            } else {
                setShowMoreSpinDialog(false)
                showSuccess("claim success")
                setSpinRemainTime(data.data['spinRemainTime']);
                setUserPoint(data.data['gameScore'])
            }
        } catch (error) {
            console.error('Error fetching user data:', error);
        }
    }

    async function dailySpin() {
        try {
            const tgUserId = localStorage.getItem('tgUserId');
            const token = localStorage.getItem('token');
            if (!tgUserId || !token) {
                console.error('Username or token not found in local storage');
                return;
            }
            const response = await fetch(BASE_URL + '/spin/dailySpin', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({tgUserId: tgUserId, token}),
            });
            const data = await response.json();
            if (data.success === false) {
                showError(data['msg'])
            } else {
                // 可以免费玩一次
                setShowMoreSpinDialog(false)
                setShowConfirmRedeem(true)
                setShowTag('getFree')
                setSpinRemainTime(data.data['spinRemainTime']);
            }
        } catch (error) {
            console.error('Error fetching user data:', error);
        }
    }

    // const myLucky = useRef()
    // const progress = 50; // 当前进度
    const milestones = [20, 50, 100]; // 里程碑位置
    return <div className="flex flex-col justify-center h-full w-full items-center bg-[url('/bg.svg')] object-cover bg-cover">
        <div className="overflow-y-auto">
            <div className="mt-4 flex">
                <div className="flex ">
                    <img src="/spinTab.svg" alt="Spin" className="w-[20px] h-[20px] mr-2"/>
                    <span>{spinRemainTime}</span>
                </div>
                <div className="flex ml-6">
                    <img src="/spin/point-gift.svg" alt="Spin" className="w-[20px] h-[20px] mr-2"/>
                    <span>{userPoint}</span>
                </div>
            </div>
            <div className="flex items-center mt-6">You’ve earned <img className="mx-2" src="/ton.svg" alt=""/> {tonValue} </div>
            <div className="relative w-full mt-6 mb-6">
                <div className="relative w-full h-6 bg-transparent rounded-full border-2 border-black">
                    <div
                        className="absolute top-0 left-0 h-full bg-[#FFBF59] rounded-full"
                        style={{width: `${Math.min(tonValue / 5.0 * 100, 100)}%`}}
                    ></div>
                    {milestones.map((milestone, index) => (
                        <div key={index} className="absolute transform -translate-y-2/3 translate-y-1/2 flex flex-col items-center"
                             style={{left: `${milestone}%`, transform: milestone === 100 ? 'translateX(-100%) translateY(5%)' : 'translateY(5%)'}}>
                            <div className="bg-white rounded-full h-4 w-4 border-2 border-gray-400"></div>
                            <span className="text-sm mt-2">{milestone}%</span>
                        </div>
                    ))}
                </div>
            </div>

            <div ref={myLuckyRef}></div>

            <div className="absolute top-[30%] right-[10px] transform -translate-y-1/2">
                <button onClick={() => setShowMoreSpinDialog(true)}>
                    <div className="relative flex flex-col items-center">
                        {/* 使用图片作为按钮背景 */}
                        <img src="/morespin.svg" alt="More Spin" className="w-14 h-14"/>
                    </div>
                </button>
            </div>

            <div className="w-[100%] mx-auto rounded-lg overflow-hidden shadow-lg text-[12px]">
                {transactions.map((transaction, index) => (
                    <div
                        key={transaction.id}
                        className={`flex justify-between items-center p-2 ${
                            index % 2 === 0 ? 'bg-[#FFBF59]' : 'bg-[#FFB388]'
                        }`}
                    >
                        <span className="text-black font-bold pl-6">{transaction.username}</span>
                        <span className="text-black">{transaction.action}</span>
                        <div className="flex items-center pr-6">
                            <img src="/ton.svg" alt="Icon" className="w-6 h-6 mr-2"/>
                            <span className="text-black font-bold">{transaction.amount}</span>
                        </div>
                    </div>
                ))}
            </div>

            {showConfirmRedeem && (
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-black bg-opacity-30 flex justify-center items-center z-50 w-[80%] rounded-lg">
                    <div className="bg-[#FFBF59] p-6 rounded-lg text-center mx-auto w-[100%] ">
                        {showTag === 'Good luck' ? <div className="mb-4">🎉Congrats! You get {pinPrize}!</div> :
                            showTag === 'getFree' ? <div className="mb-4">🎉Congrats! <br/> You get a free spin!</div> :
                                showTag === '2' || showTag === '0.5' || showTag === '0.1' ? <div className="mb-4">🎉You get <br/>
                                        <div className="flex items-center justify-center mt-2"><img className="mr-2" src="/ton.svg" alt=""/>{showTag}</div>
                                    </div> :
                                    <div className="mb-4">Play Game to earn another spin!</div>}
                        <div className="flex justify-around">
                            {showTag === 'getFree' ? <button className="bg-[#FFE541] text-black p-2 rounded-full w-full" onClick={() => setShowConfirmRedeem(false)}>
                                    Start Spin
                                </button> :
                                spinRemainTime > 0 ? <button className="bg-[#FFE541] text-black p-2 rounded-full w-full" onClick={() => setShowConfirmRedeem(false)}>
                                        Spin again
                                    </button> :
                                    <button className="bg-[#FFE541] text-black p-2 rounded-full w-full" onClick={() => router.push(`/game`)}>
                                        Play
                                    </button>
                            }

                        </div>
                    </div>
                </div>
            )}
            {showMoreSpinDialog && (
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-[#FFBF59] px-[20px] z-50 w-[80%] rounded-lg text-[12px] pt-4">
                    <div className="">
                        <button className=" text-black" onClick={() => setShowMoreSpinDialog(false)}>
                            <img src="/x.svg" alt=""/>
                        </button>
                        <h2 className="text-2xl mb-4 mt-4">Get More Spins</h2>
                        <div className="flex items-center justify-between mb-4">
                            <img src="/ottercoin.svg" alt="Coin" className="w-8 h-8 mr-2"/>
                            <span className="flex-1 text-left">50,000 for daily 1 spin</span>
                            <button className="bg-[#FFE541] p-2 rounded-full text-black  text-[12px] shadow-[0px_4px_4px_0px_#FEA75CDE;] px-3 py-1" onClick={() => buySpin()}>Claim</button>
                        </div>
                        <div className="flex items-center justify-between mb-4">
                            <span className="flex-1 text-left">Invite 2 friends get 1 spin</span>
                            <button className="bg-[#FFE541] p-2 rounded-full text-black shadow-[0px_4px_4px_0px_#FEA75CDE;] text-[12px] px-3 py-1">Invite</button>
                        </div>
                        <div className="flex items-center justify-between mb-4">
                            <span className="flex-1 text-left">Daily Free Spin</span>
                            <button className="bg-[#FFE541] rounded-full text-black text-[12px] shadow-[0px_4px_4px_0px_#FEA75CDE;] px-3 py-1 ml-10" onClick={() => dailySpin()}>Claim</button>
                        </div>
                    </div>
                </div>
            )}
            <div className='h-[100px]'>


            </div>
        </div>
        {/*<LuckyWheel*/}
        {/*    ref={myLucky}*/}
        {/*    width="600px"*/}
        {/*    height="600px"*/}
        {/*    blocks={blocks}*/}
        {/*    prizes={prizes}*/}
        {/*    buttons={buttons}*/}
        {/*    onStart={() => { // 点击抽奖按钮会触发star回调*/}
        {/*        myLucky.current.play()*/}
        {/*        setTimeout(() => {*/}
        {/*            const index = Math.random() * 6 >> 0*/}
        {/*            myLucky.current.stop(index)*/}
        {/*        }, 2500)*/}
        {/*    }}*/}
        {/*    onEnd={prize => { // 抽奖结束会触发end回调*/}
        {/*        alert('恭喜你抽到 ' + prize.fonts[0].text + ' 号奖品')*/}
        {/*    }}*/}
        {/*/>*/}
    </div>
};

export default LuckyWheelComponent;
