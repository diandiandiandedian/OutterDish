import React, {useEffect, useState} from 'react';
import {Login} from "../components/Login";
import {useRouter} from "next/router";
import Game from "./game";
import HomePage from "../components/HomePage";
import Home from "./home";
import {validate} from "@telegram-apps/init-data-node";

export default function Index() {
    const [activeTab, setActiveTab] = useState<'home' | 'game' | 'order' | 'coupon' | 'quests'>('game');

    useEffect(() => {
        // const secretToken = '5768337691:AAH5YkoiEuPk8-FZa32hStHTqXiLPtAEhx8';
        // const initData =
        //     'query_id=AAHdF6IQAAAAAN0XohDhrOrc' +
        //     '&user=%7B%22id%22%3A279058397%2C%22first_name%22%3A%22Vladislav%22%2C%22last_name%22%3A%22Kibenko%22%2C%22username%22%3A%22vdkfrost%22%2C%22language_code%22%3A%22ru%22%2C%22is_premium%22%3Atrue%7D' +
        //     '&auth_date=1662771648' +
        //     '&hash=c501b71e775f74ce10e377dea85a7ea24ecd640b223ea86dfe453e0eaed2e2b2';
        //
        // validate(initData, secretToken);





        // console.log('(window as any).Telegram', (window as any).Telegram)
        // console.log('(window as any).Telegram.WebApp',(window as any).Telegram.WebApp)
        if ((window as any).Telegram !== undefined) {
            const aaaa = (window as any).Telegram.WebApp
            aaaa.ready();
            // console.log('isVersionAtLeast',aaaa.isVersionAtLeast(111));
            // aaaa.disableVerticalSwipes();
            // aaaa.enableClosingConfirmation();
            // console.log('(window as any).Telegram.BackButton',aaaa);
            // console.log('(window as any).Telegram.BackButton',aaaa.BackButton);
            // aaaa.BackButton.show();
            // aaaa.BackButton.onClick(() => {
            //     // 返回上一页
            //     window.history.back();
            // });
            (window as any).Telegram.WebView.postEvent('web_app_setup_closing_behavior', false, {need_confirmation: true});

            // const [swipeBehavior] = initSwipeBehavior();
            // swipeBehavior.disableVerticalSwipe();
            (window as any).Telegram.WebView.postEvent('web_app_setup_swipe_behavior', false, {allow_vertical_swipe: false});
        }
    });

    const router = useRouter();

    useEffect(() => {
        const tgUserId = localStorage.getItem('tgUserId');
        if (tgUserId) {
            router.push('/game');
        }
    }, [router]);

    return (
        <div className="w-full h-full">
            <Login></Login>
            {/*<Home></Home>*/}
            {/*<Home></Home>*/}
        </div>
    );
}
