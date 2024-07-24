import React, {useRef, useEffect, useState} from 'react';
import {LuckyWheel, LuckyGrid} from 'lucky-canvas'


const LuckyWheelComponent = () => {
    const [blocks] = useState([
        {
            padding: '100px',
            imgs: [{
                src: '/wheel-bg.png',
                width: '100%',
                height: '100%'
            }]
        },
    ])
    const prizeImg = {
        src: '/egg1.jpg',
        width: '40%',
        top: '10%'
    }
    const prizeImg2 = {
        src: '/egg2.jpg',
        width: '40%',
        top: '10%'
    }

    const prizeImg3 = {
        src: '/egg3.jpeg',
        width: '40%',
        top: '10%'
    }
    const myLuckyRef = useRef<HTMLDivElement | null>(null);

    const [prizes] = useState([
        {background: '#F8F0A0', fonts: [{text: '礼物'}], imgs: [prizeImg]},
        {background: '#ffffff', fonts: [{text: '谢谢参与'}], imgs: [prizeImg3]},
        {background: '#F8F0A0', fonts: [{text: '红包'}], imgs: [prizeImg]},
        {background: '#ffffff', fonts: [{text: '再抽一次'}], imgs: [prizeImg2]},
        {background: '#F8F0A0', fonts: [{text: '谢谢参与'}], imgs: [prizeImg3]},
        {background: '#ffffff', fonts: [{text: '红包'}], imgs: [prizeImg2]},
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
                src: '/start.png',
                width: '100%',
                top: '-130%'
            }]
        }
    ])
    useEffect(() => {
        if (myLuckyRef.current) {
            const myLucky = new LuckyWheel(myLuckyRef.current, {
                width: '500px',
                height: '500px',
                blocks: blocks,
                prizes: prizes,
                buttons: buttons,
                start: () => {
                    myLucky.play();
                    setTimeout(() => {
                        const index = Math.floor(Math.random() * prizes.length);
                        myLucky.stop(index);
                    }, 2500);
                },
                end: (prize: any) => {
                    if (prize.fonts && prize.fonts.length > 0) {
                        alert('恭喜你抽到 ' + prize.fonts[0].text + ' 号奖品');
                    } else {
                        alert('恭喜你抽到一个奖品');
                    }
                }
            })
        }
    }, []);
    // const myLucky = useRef()
    return <div className="flex justify-center h-full items-center">
        <div ref={myLuckyRef}></div>

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
