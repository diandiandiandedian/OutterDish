import React, {useEffect, useState} from 'react';
import {Login} from "../components/Login";
import {useRouter} from "next/router";
// import Game from "./game";
// import HomePage from "../components/HomePage";
// import Home from "./home";

export default function Index() {
    // const [activeTab, setActiveTab] = useState<'home' | 'game' | 'order' | 'coupon' | 'quests'>('game');

    useEffect(() => {
        if ((window as any).Telegram !== undefined) {
            const aaaa = (window as any).Telegram.WebApp
            aaaa.ready();
            console.log('aaaa', aaaa)
            // console.log('isVersionAtLeast',aaaa.isVersionAtLeast(111));
            // aaaa.disableVerticalSwipes();
            aaaa.enableClosingConfirmation();
            // console.log('(window as any).Telegram.BackButton',aaaa);
            // console.log('(window as any).Telegram.BackButton',aaaa.BackButton);
            // aaaa.BackButton.show();
            // aaaa.BackButton.onClick(() => {
            //     // 返回上一页
            //     window.history.back();
            // });
            // 左上角关闭,弹出确认框
            // (window as any).Telegram.WebView.postEvent('web_app_setup_closing_behavior', false, {need_confirmation: true});

            // const [swipeBehavior] = initSwipeBehavior();
            // swipeBehavior.disableVerticalSwipe();
            // 禁止最小化
            (window as any).Telegram.WebView.postEvent('web_app_setup_swipe_behavior', false, {allow_vertical_swipe: false});
        }
        const audio = new Audio();
        audio.src = '/music/backgroundMusic.mp3';
        audio.oncanplaythrough = () => {
            console.log('Audio file is preloaded and can be played.');
        };
        audio.load(); // This initiates the preloading process
        audio.src = '/music/addscore.wav';
        audio.oncanplaythrough = () => {
            console.log('Audio file is preloaded and can be played.');
        };
        audio.load(); // This initiates the preloading process
        audio.src = '/music/reducescore.wav';
        audio.oncanplaythrough = () => {
            console.log('Audio file is preloaded and can be played.');
        };
        audio.load(); // This initiates the preloading process
    });

    const router = useRouter();

    // useEffect(() => {
    //     const tgUserId = localStorage.getItem('tgUserId');
    //     if (tgUserId) {
    //         router.push('/game');
    //     }
    // }, [router]);

    return (
        <div className="w-full h-full">
            <Login></Login>
            {/*<Home></Home>*/}
            {/*<Home></Home>*/}
        </div>
    );
}
