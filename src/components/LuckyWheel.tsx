import React, {useRef, useEffect, useState} from 'react';
import {LuckyWheel, LuckyGrid} from 'lucky-canvas'
import {BASE_URL} from "../config/constant";
import {router} from "next/client";


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
            padding: '47px',
            imgs: [{
                src: '/spin-bg.png',
                width: '100%',
                height: '100%'
            }]
        },
    ])
    const prizeImg = {
        src: '/egg1.jpg',
        width: '40%',
        top: '40%'
    }
    const prizeImg2 = {
        src: '/egg2.jpg',
        width: '40%',
        top: '40%'
    }

    const prizeImg3 = {
        src: '/egg3.jpeg',
        width: '40%',
        top: '40%'
    }
    const myLuckyRef = useRef<HTMLDivElement | null>(null);
    const [showConfirmRedeem, setShowConfirmRedeem] = useState<boolean>(false);
    const [pinPrize, setPinPrize] = useState<string>("");

    const prizeList = ["2元现金", "谢谢惠顾", '0.5元现金', '0.1元现金', '15000积分', '价值0.1元的奖品', '再抽一次', '直接提现']
    const prizeFontSize = "10px"
    const [prizes] = useState([
        {background: '#F8F0A0', fonts: [{text: '2元现金', fontSize: prizeFontSize}], imgs: [prizeImg]},
        {background: '#ffffff', fonts: [{text: '谢谢惠顾', fontSize: prizeFontSize}], imgs: [prizeImg3]},
        {background: '#F8F0A0', fonts: [{text: '0.5元现金', fontSize: prizeFontSize}], imgs: [prizeImg]},
        {background: '#ffffff', fonts: [{text: '0.1元现金', fontSize: prizeFontSize}], imgs: [prizeImg2]},
        {background: '#F8F0A0', fonts: [{text: '15000积分', fontSize: prizeFontSize}], imgs: [prizeImg3]},
        {background: '#ffffff', fonts: [{text: '价值0.1元的奖品', fontSize: prizeFontSize}], imgs: [prizeImg2]},
        {background: '#F8F0A0', fonts: [{text: '再抽一次', fontSize: prizeFontSize}], imgs: [prizeImg]},
        {background: '#ffffff', fonts: [{text: '直接提现', fontSize: prizeFontSize}], imgs: [prizeImg3]},
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
                    let index = prizeList.findIndex((i) => i === resResult.data)
                    console.log('index', index, resResult)
                    myLucky.stop(index);
                },
                end: (prize: any) => {
                    console.log(prize)
                    if (prize.fonts && prize.fonts.length > 0) {
                        setPinPrize(prize.fonts[0].text)
                        setShowConfirmRedeem(true);
                        // alert('恭喜你抽到 ' + prize.fonts[0].text);
                    } else {
                        // alert('恭喜你抽到一个奖品');
                    }
                }
            })
        }
    }, []);
    // const myLucky = useRef()
    return <div className="flex flex-col justify-center h-full w-full items-center bg-[url('/bg.svg')] object-cover bg-cover">
        <div className="overflow-y-auto">
            <div className="flex items-center">You’ve earned <img className="mx-2" src="/ton.svg" alt=""/> {tonValue} </div>
            <div className="relative w-full">
                {/*进度条*/}
                <span className="absolute z-10 mt-1 shadow-sm bg-white w-4 h-4 rounded-full"></span>
                <span className="absolute z-10 mt-1 bg-white w-4 h-4 rounded-full origin-center	-translate-x-1/2 -translate-y-1/2"></span>
                <span className="absolute z-10 mt-1 bg-white w-4 h-4 rounded-full right-0"></span>
                <progress className=" progress progress-success mb-4 h-[30px] [&::-webkit-progress-value]:bg-[#FFBF59] bg-transparent [&::-moz-progress-bar]:bg-[#FFB641] border border-[#000000] w-[85%]" value={1} max={5}></progress>
            </div>

            <div ref={myLuckyRef}></div>

            <div className="w-[100%] mx-auto rounded-lg overflow-hidden shadow-lg">
                {transactions.map((transaction, index) => (
                    <div
                        key={transaction.id}
                        className={`flex justify-between items-center p-4 ${
                            index % 2 === 0 ? 'bg-[#FFBF59]' : 'bg-[#FFB388]'
                        }`}
                    >
                        <span className="text-black font-bold">{transaction.username}</span>
                        <span className="text-black">{transaction.action}</span>
                        <div className="flex items-center">
                            <img src="/ton.svg" alt="Icon" className="w-6 h-6 mr-2"/>
                            <span className="text-black font-bold">{transaction.amount}</span>
                        </div>
                    </div>
                ))}
            </div>

            {showConfirmRedeem && (
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-black bg-opacity-30 flex justify-center items-center z-50 w-[80%] rounded-lg">
                    <div className="bg-[#FFBF59] p-6 rounded-lg text-center mx-auto w-[100%] ">
                        <div className="mb-4">🎉Congrats! You get {pinPrize}!</div>
                        {/*<div className="mb-4">Play Game to earn another spin!</div>*/}
                        <div className="flex justify-around">
                            <button className="bg-[#FFE541] text-black p-2 rounded-full w-full" onClick={() => setShowConfirmRedeem(false)}>
                                Start Spin
                            </button>
                            {/*<button className="bg-[#FFE541] text-black p-2 rounded-full w-full" onClick={() => router.push(`/game`)}>*/}
                            {/*    Play*/}
                            {/*</button>*/}

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
