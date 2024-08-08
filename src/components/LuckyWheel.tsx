import React, {useRef, useEffect, useState} from 'react';
import {LuckyWheel, LuckyGrid} from 'lucky-canvas'
import {BASE_URL} from "../config/constant";
import {useNotification} from "../context/NotificationContext";
import {useRouter} from "next/router";


const LuckyWheelComponent: React.FC<{ fromLogin2?: string }> = ({fromLogin2}) => {


    interface Transaction {
        id: number;
        username: string;
        action: string;
        amount: number;
    }

    const transactions: Transaction[] = [
        {id: 1, username: 'Pamela Willis', action: 'just got', amount: 2},
        {id: 2, username: 'pop absolute', action: 'just withdraw', amount: 5},
        {id: 3, username: 'xaong Li', action: 'just got', amount: 0.5},
        {id: 4, username: 'Fred', action: 'just got', amount: 0.1},
    ];


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
        src: '/ton.svg',
        width: '30%',
        top: '40%'
    }
    const prizeImgTon2 = {
        src: '/ton.svg',
        width: '30%',
        top: '40%'
    }

    const prizeImg2 = {
        src: '/spin/goodluck-gift2.svg',
        width: '30%',
        top: '40%'
    }

    const prizeImg3 = {
        src: '/ottercoin.svg',
        width: '30%',
        top: '40%'
    }

    const prizeImg4 = {
        src: '/spin/auto-tappper-gift2.svg',
        width: '35%',
        top: '40%'
    }

    const prizeImg5 = {
        src: '/spinTab.svg',
        width: '30%',
        top: '40%'
    }

    const prizeImg6 = {
        src: '/spin/withdrwa-gift2.svg',
        width: '30%',
        top: '50%'
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
    const [spinRemainTime, setSpinRemainTime] = useState<number>(0);
    const [userPoint, setUserPoint] = useState<number>(0);
    const [showTag, setShowTag] = useState<string>("");
    const {showSuccess, showError} = useNotification();
    const router = useRouter();  // 获取router对象
    const [tonValue, setTonValue] = useState(0);
    const [claimLoading, setClaimLoading] = useState(false);
    const [claimLoading2, setClaimLoading2] = useState(false);
    const [claimLoading3, setClaimLoading3] = useState(false);
    const [loginPlay, setLoginPlay] = useState(false);
    const spinRemainTimeRef = useRef(spinRemainTime);
    const userPointRef = useRef(userPoint);
    const tonValueRef = useRef(tonValue);

    const {fromLogin} = router.query;

    useEffect(() => {
        spinRemainTimeRef.current = spinRemainTime;
    }, [spinRemainTime]);

    useEffect(() => {
        userPointRef.current = userPoint;
    }, [userPoint]);

    useEffect(() => {
        tonValueRef.current = tonValue;
    }, [tonValue]);


    const prizeList = ["0.1", "2", 'Free Spin', 'Directly Withdraw', '0.5', 'Auto-tapper', '15000', 'Good luck']
    const prizeFontSize = "10px"
    const [prizes] = useState([
        {background: '#ffffff', fonts: [{text: '0.1', fontSize: prizeFontSize, fontStyle: "KGTenThousandReasons"}], imgs: [prizeImg]},
        {background: '#F8F0A0', fonts: [{text: '2', fontSize: prizeFontSize, fontStyle: "KGTenThousandReasons"}], imgs: [prizeImg]},
        {background: '#ffffff', fonts: [{text: 'Free Spin', fontSize: prizeFontSize, fontStyle: "KGTenThousandReasons"}], imgs: [prizeImg5]},
        {background: '#F8F0A0', fonts: [{text: 'Directly Withdraw', fontSize: prizeFontSize, fontStyle: "KGTenThousandReasons"}], imgs: [prizeImg6]},
        {background: '#ffffff', fonts: [{text: '0.5', fontSize: prizeFontSize, fontStyle: "KGTenThousandReasons"}], imgs: [prizeImg]},
        {background: '#F8F0A0', fonts: [{text: 'Auto-tapper', fontSize: prizeFontSize, fontStyle: "KGTenThousandReasons"}], imgs: [prizeImg4]},
        {background: '#ffffff', fonts: [{text: '15000', fontSize: prizeFontSize, fontStyle: "KGTenThousandReasons"}], imgs: [prizeImg3]},
        {background: '#F8F0A0', fonts: [{text: 'Good luck', fontSize: prizeFontSize, fontStyle: "KGTenThousandReasons"}], imgs: [prizeImg2]},
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
                    setLoginPlay(true)
                    // console.error('spinRemainTime,spinRemainTime', spinRemainTimeRef)
                    // console.error('spinRemainTime,spinRemainTime', spinRemainTimeRef.current)
                    if (spinRemainTimeRef.current === 0) {
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
                        showError(resResult['msg'])
                        setShowMoreSpinDialog(true)
                        myLucky.stop(-1);
                        return
                    }
                    let index = prizeList.findIndex((i) => i === resResult.data)
                    // console.log('index', index, resResult)
                    myLucky.stop(index);
                },
                end: (prize: any) => {
                    // console.log(prize)
                    if (prize.fonts && prize.fonts.length > 0) {
                        setPinPrize(prize.fonts[0].text)
                        setShowConfirmRedeem(true);
                        setShowTag(prize.fonts[0].text)
                        if (prize.fonts[0].text === "2" || prize.fonts[0].text === "0.5" || prize.fonts[0].text === "0.1") {
                            setTonValue(tonValueRef.current + parseFloat(prize.fonts[0].text))
                        }
                        if (prize.fonts[0].text === "15000") {
                            setUserPoint(userPointRef.current + 15000)
                        }
                        console.log('spinRemainTimeRef.current end ', spinRemainTimeRef.current)
                        setSpinRemainTime(spinRemainTimeRef.current - 1)
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

    useEffect(() => {
        console.log(fromLogin)

        if (fromLogin === "1") {
            setShowConfirmRedeem(true)
        }
    }, [fromLogin]);

    async function buySpin() {
        try {
            const tgUserId = localStorage.getItem('tgUserId');
            const token = localStorage.getItem('token');
            if (!tgUserId || !token) {
                console.error('Username or token not found in local storage');
                return;
            }
            setClaimLoading(true);
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
            setClaimLoading(false);
        } catch (error) {
            setClaimLoading(false);
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
            setClaimLoading3(true);
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
            setClaimLoading3(false);
        } catch (error) {
            setClaimLoading3(false);
            console.error('Error fetching user data:', error);
        }
    }

    function inviteUser() {
        const tgUserId = localStorage.getItem('tgUserId');
        const text = encodeURIComponent(`I'm earning money on Telegram with just tapping, come and join us: t.me/OutterDish_bot/Main?startapp=` + tgUserId);
        // window.open(`https://telegram.me/share/url?text=` + text, '_blank');
        (window as any).Telegram.WebApp.openTelegramLink(
            `https://t.me/share/url?url=${text}`
        );
    }

    // const myLucky = useRef()
    // const progress = 50; // 当前进度
    const milestones = [20, 50, 100]; // 里程碑位置
    function closeAndOpen() {
        setShowConfirmRedeem(false)
        setShowMoreSpinDialog(true)
    }

    return <div className="flex flex-col justify-center h-full w-full items-center bg-[url('/bg.svg')] object-cover bg-cover">
        <div className="overflow-y-auto">
            <div className="flex items-center mt-6">
                <div className="text-[12px]">Invite <span className="text-[#FF8641] text-[18px]">2</span> Friends to get a free spin!</div>
                <div>
                    <button className="bg-[#41BAFF] rounded-full text-white text-[12px] shadow-[0px_4px_4px_0px_#FEA75CDE;] px-3 py-1 ml-6" onClick={() => inviteUser()}>Invite Now</button>
                </div>
            </div>
            <div className="mt-4 flex">
                <div className="flex ">
                    <img src="/spinTab.svg" alt="Spin" className="w-[20px] h-[20px] mr-2"/>
                    <span>{spinRemainTime}</span>
                </div>
                <div className="flex ml-4">
                    <img src="/ottercoin.svg" alt="Spin" className="w-[20px] h-[20px] mr-2"/>
                    <span>{userPoint}</span>
                </div>
            </div>
            <div className="flex items-center mt-4">You’ve earned <img className="mx-2" src="/ton.svg" alt=""/> {tonValue} </div>
            <div className="relative w-full mt-4 mb-6">
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
            <div className="text-[14px] mb-4 mt-4">
                <div className="flex items-center">You are only <img className="mx-2" src="/ton.svg" alt=""/> {Math.max(Number((5 - tonValue).toFixed(2)), 0)} away from withdraw</div>
            </div>

            <div ref={myLuckyRef}></div>

            <div className="absolute top-[44%] right-[10px] transform -translate-y-1/2">
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
                        className={`flex justify-start items-center p-2 ${index % 2 === 0 ? 'bg-[#FFBF59]' : 'bg-[#FFB388]'}`}
                    >
                        <div className="flex w-full gap-4">
                            <span className="text-black font-bold text-left pl-6 w-[40%]">{transaction.username}</span>
                            <span className="text-black text-left w-[40%]">{transaction.action}</span>
                            <div className="flex items-center text-left w-[20%]">
                                <img src="/ton.svg" alt="Icon" className="w-6 h-6 mr-2"/>
                                <span className="text-black font-bold">{transaction.amount}</span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {showConfirmRedeem && (
                <div className="fixed inset-0 flex items-center justify-center z-50">
                    {/* 半透明黑色背景层 */}
                    <div className="absolute inset-0 bg-black opacity-50"></div>

                    {/* 弹出框 */}
                    <div className="relative bg-[#FFBF59] px-[20px] w-[80%] rounded-lg text-[12px] pt-4 z-10">
                        <button className=" text-black" onClick={() => setShowConfirmRedeem(false)}>
                            <img src="/x.svg" alt=""/>
                        </button>
                        <div className="bg-[#FFBF59] p-6 rounded-lg text-center mx-auto w-[100%] ">
                            {showTag === 'Good luck' ? <div className="mb-4"> {pinPrize}!</div> : showTag === '15000' ? <div className="mb-4">🎉 Congrats! You get {pinPrize}!</div> :
                                showTag === 'getFree' ? <div className="mb-4">🎉 Congrats! <br/> You get a free spin!</div> :
                                    showTag === '2' || showTag === '0.5' || showTag === '0.1' ? <div className="mb-4">🎉You get <br/>
                                            <div className="flex items-center justify-center mt-2"><img className="mr-2" src="/ton.svg" alt=""/>{showTag}</div>
                                        </div> :
                                        <div className=""></div>}
                            {
                                (fromLogin === "1" && !loginPlay) && <div className="mb-4">🎉 Congrats! You get a free spin!</div>
                            }
                            {
                                (fromLogin === "1" && loginPlay) && <div className="mb-4">Play Game to earn another spin!</div>
                            }
                            <div className="flex justify-around">
                                {(fromLogin !== "1" && loginPlay) && (showTag === 'getFree' ? <button className="bg-[#FFE541] text-black p-2 rounded-full w-full" onClick={() => setShowConfirmRedeem(false)}>
                                        Start Spin
                                    </button> :
                                    spinRemainTime > 0 ? <button className="bg-[#FFE541] text-black p-2 rounded-full w-full" onClick={() => setShowConfirmRedeem(false)}>
                                            Spin again
                                        </button> :

                                        <button className="bg-[#FFE541] text-black p-2 rounded-full w-full" onClick={() => closeAndOpen()}>
                                            get more spins
                                        </button>)
                                }
                                {
                                    (fromLogin === "1" && !loginPlay) && <button className="bg-[#FFE541] text-black p-2 rounded-full w-full" onClick={() => setShowConfirmRedeem(false)}>
                                        Start Spin
                                    </button>
                                }
                                {
                                    (fromLogin === "1" && loginPlay) && <button className="bg-[#FFE541] text-black p-2 rounded-full w-full" onClick={() => router.push({
                                        pathname: '/game',
                                        query: {fromLogin: '1'}  // 示例参数
                                    })}>
                                        Play
                                    </button>
                                }
                            </div>
                        </div>
                    </div>
                </div>
            )}
            {showMoreSpinDialog && (
                <div className="fixed inset-0 flex items-center justify-center z-50">
                    {/* 半透明黑色背景层 */}
                    <div className="absolute inset-0 bg-black opacity-50"></div>

                    {/* 弹出框 */}
                    <div className="relative bg-[#FFBF59] px-[20px] w-[80%] rounded-lg text-[12px] pt-4 z-10">
                        <div className="">
                            <button className=" text-black" onClick={() => setShowMoreSpinDialog(false)}>
                                <img src="/x.svg" alt=""/>
                            </button>
                            <h2 className="text-2xl mb-4 mt-4">Get More Spins</h2>
                            <div className="flex items-center justify-between mb-4">
                                <img src="/ottercoin.svg" alt="Coin" className="w-8 h-8 mr-2"/>
                                <span className="flex-1 text-left">10,000 for daily 1 spin</span>
                                <button className="bg-[#FFE541] p-2 rounded-full text-black  text-[12px] shadow-[0px_4px_4px_0px_#FEA75CDE;] px-3 py-1" onClick={() => buySpin()}>{claimLoading ? (<span className="loading loading-spinner loading-sm"></span>) : 'Claim'}</button>
                            </div>
                            <div className="flex items-center justify-between mb-4">
                                <span className="flex-1 text-left">Invite 2 friends get 1 spin</span>
                                <button className="bg-[#FFE541] p-2 rounded-full text-black shadow-[0px_4px_4px_0px_#FEA75CDE;] text-[12px] px-3 py-1" onClick={() => inviteUser()}>{claimLoading2 ? (<span className="loading loading-spinner loading-sm"></span>) : 'Invite'}</button>
                            </div>
                            <div className="flex items-center justify-between mb-4">
                                <span className="flex-1 text-left">Daily Free Spin</span>
                                <button className="bg-[#FFE541] rounded-full text-black text-[12px] shadow-[0px_4px_4px_0px_#FEA75CDE;] px-3 py-1 ml-10" onClick={() => dailySpin()}>{claimLoading3 ? (<span className="loading loading-spinner loading-sm"></span>) : 'Claim'}</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
            <div className='h-[100px]'>
            </div>
        </div>
    </div>
};

export default LuckyWheelComponent;
