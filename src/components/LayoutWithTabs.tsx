import React, {useState, useEffect} from 'react';
import {useRouter} from 'next/router';

const TABS = {
    home: 'home',
    game: 'game',
    order: 'order',
    quests: 'quests',
    coupons: 'coupons',
    spin: 'wheel',
};

const LayoutWithTabs: React.FC<{ children: React.ReactNode,fromLogin:string }> = ({children, fromLogin}) => {
    const router = useRouter();
    const [activeTab, setActiveTab] = useState(router.pathname.replace('/', '') || TABS.home);

    console.log('fromLogin',fromLogin)
    useEffect(() => {
        if (router.pathname.replace('/', '') !== activeTab) {
            router.push(`/${activeTab}`, undefined, {shallow: true});
        }
    }, [activeTab]);

    return (
        <div className="flex flex-col h-screen">
            <div className="flex-1">{children}</div>
            {/* 增加底部填充以避免与导航栏重叠 */}
            {fromLogin === "1"?<div></div>:
                <div className="fixed bottom-6 left-0 right-0 bg-[#FFE541AD] text-black flex justify-around rounded-t-lg text-xs">
                <button
                    onClick={() => setActiveTab(TABS.home)}
                    className={`flex-1 text-center ${activeTab === TABS.home ? 'bg-[#FFB641]' : ''}`}
                >
                    <img src="/homeicon.svg" alt="Home" className="w-8 h-8 mx-auto"/>
                    Main
                </button>
                <button
                    onClick={() => setActiveTab(TABS.game)}
                    className={`flex-1 text-center ${activeTab === TABS.game ? 'bg-[#FFB641]' : ''}`}
                >
                    <img src="/gameicon.svg" alt="Game" className="w-8 h-8 mx-auto"/>
                    Game
                </button>
                <button
                    onClick={() => setActiveTab(TABS.spin)}
                    className={`flex-1 text-center ${activeTab === TABS.order ? 'bg-[#FFB641]' : ''}`}
                >
                    <img src="/spinTab.svg" alt="Game" className="w-14 h-14 mx-auto"/>
                    {/*Order*/}
                </button>
                {/*先注释*/}
                {/*<div className="relative flex-1 text-center">*/}
                {/*    <button*/}
                {/*        onClick={() => setActiveTab(TABS.order)}*/}
                {/*        className={`absolute transform translate-y-[-25%] translate-x-[-85%] ${activeTab === TABS.order ? '' : ''}`}*/}
                {/*        style={{ borderRadius: '50%' }}*/}
                {/*    >*/}
                {/*        <img src="/ordericon.svg" alt="Order" className="w-16 h-16 mx-auto max-w-[2000%] " />*/}
                {/*    </button>*/}
                {/*    /!*<span className="block text-center mt-12">Order</span>*!/*/}
                {/*</div>*/}
                {/*先注释*/}
                <button
                    onClick={() => setActiveTab(TABS.quests)}
                    className={`flex-1 text-center ${activeTab === TABS.quests ? 'bg-[#FFB641]' : ''}`}
                >
                    <img src="/questsicon.svg" alt="Quests" className="w-8 h-8 mx-auto"/>
                    Quests
                </button>
                <button
                    onClick={() => setActiveTab(TABS.coupons)}
                    className={`flex-1 text-center ${activeTab === TABS.coupons ? 'bg-[#FFB641]' : ''}`}
                >
                    <img src="/couponicon.svg" alt="Coupons" className="w-8 h-8 mx-auto"/>
                    Coupon
                </button>
            </div>}
        </div>
    );
};

export default LayoutWithTabs;
