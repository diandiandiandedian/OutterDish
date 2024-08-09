import React, {useState, useEffect} from 'react';
import {useRouter} from 'next/router';
import {BASE_URL} from '../config/constant';
import {useNotification} from "../context/NotificationContext";
import 'animate.css';

export const Login: React.FC = () => {
    const [step, setStep] = useState(1);
    // const [name, setName] = useState('');
    // const [tgUserId, setTgUserId] = useState('');
    const [loginLoading, setLoginLoading] = useState(false);
    const [loadFlag, setLoadFlag] = useState(false);
    const router = useRouter();
    // const [tgUser, setTgUser] = useState({id: '', username: ''});
    const {showSuccess, showError} = useNotification();


    // const handleNextStep = () => {
        // if (step === 2) {
        // showError("Please set name")
        // return
        // }
        // setStep(step + 1);
    // };

    useEffect(() => {
        const img = new Image();
        img.src = '/SquirrelChef.png';
        img.onload = () => {
        };
        const timer = setTimeout(() => {
            if (!loadFlag) {
                tgVerfiyAndLogin(true)
                setLoadFlag(true)
            }
        }, 800); // 延迟1秒
        return () => clearTimeout(timer); // 清除定时器
    });

    // useEffect(() => {
    //     const timer = setTimeout(() => {
    //         setStep(2);
    //     }, 1600); // 延迟1秒
    //     return () => clearTimeout(timer); // 清除定时器
    // },[]);

    async function tgVerfiyAndLogin(onlyVerfiy: boolean) {
        // console.log('telegramInitData', telegramInitData)
        if ((window as any).Telegram === undefined || (window as any).Telegram.WebApp.initDataUnsafe.user === undefined) {
            // console.log((window as any).Telegram.WebApp)
            // 获取 tgWebAppStartParam
            // const inviter = (window as any).Telegram.WebApp.initDataUnsafe.start_param
            // const user = (window as any).Telegram.WebApp.initDataUnsafe?.user;
            // setTgUser(user)
            // setName(user.username)
            // setTgUserId(user.id)
            // setLoadFlag(true)
            if (!onlyVerfiy) {
                showError("Failed to get information")
            }
            return
        }
        const telegramInitData = (window as any).Telegram.WebApp.initDataUnsafe

        setLoginLoading(true)
        try {
            const response = await fetch("/api/tg", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    // action: 'saveTgUser',
                    telegramInitData: telegramInitData,
                    user: telegramInitData.user
                })
            });
            const result = await response.json()
            setLoginLoading(false)
            if (result['result']) {
                // 验证通过
                // console.log('result[\'user\']',result['user'])
                if (result['user'] !== undefined && result['user'].id !== undefined) {
                    localStorage.setItem('token', result['user'].token);
                    localStorage.setItem('tgUserId', result['user']['tg_user_id']);
                    // 注册过了,跳转主页
                    router.push('/wheel');
                } else {
                    if (!onlyVerfiy) {
                        saveTgUser(telegramInitData.user.username, telegramInitData.user.id)
                    }
                }
            } else {
                showError("An authentication failure occurred")
                await fetch(BASE_URL + "/other/heartbeat", {method: 'POST', headers: {'Content-Type': 'application/json'},
                    body: JSON.stringify({error: "An authentication failure occurred"})
                });
            }
        } catch (e) {
            console.log(e)
        }
    }


    // const handleLogin = async () => {
    //     await saveTgUser(name);
    // };

    async function saveTgUser(name: string, tgId: string) {
        setLoginLoading(true)
        try {
            const response = await fetch(BASE_URL + "/tg/save", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    // action: 'saveTgUser',
                    address: "",
                    tgUserId: tgId,
                    userInfo: name,
                    userName: name
                })
            });
            const resResult = await response.json()
            if (!resResult.success) {
                showError(resResult.msg);
            } else {
                localStorage.setItem('username', name);
                localStorage.setItem('tgUserId', tgId);
                localStorage.setItem('token', resResult.data.token);
                router.push({
                    pathname: '/wheel',
                    query: {fromLogin: '1'}  // 示例参数
                });
            }
            setLoginLoading(false)
        } catch (e) {
            showError('network error')
            setLoginLoading(false)
        }
    }

    return (
        <div className="flex flex-col justify-center items-center h-screen bg-[url('/bg.svg')] bg-cover">
            {step === 1 && (
                <div className="flex flex-col justify-center items-center text-center animate__animated animate__fadeIn" style={{ animationDelay: '0.3s' }}>
                    <div className="text-2xl mb-10 ">Welcome to</div>
                    <h1 className="text-6xl mb-6">OutterDish</h1>
                    <p className="text-2xl mb-4">Order, play & earn</p>
                    {/*<button className="p-4 rounded-full" onClick={handleNextStep}>*/}
                    {/*    {loginLoading ? (<span className="loading loading-spinner loading-sm"></span>) : (<img src="/nextStep.svg" alt="Next" className="w-12 h-12"/>)}*/}
                    {/*</button>*/}
                    {/*<button className="p-4 rounded-full" onClick={() => tgVerfiyAndLogin(false)}>*/}
                    {/*    {loginLoading ? (<span className="loading loading-spinner loading-sm"></span>) : (<img src="/nextStep.svg" alt="Next" className="w-12 h-12"/>)}*/}
                    {/*</button>*/}
                    {/*<button className="p-4 rounded-full" onClick={handleNextStep}>*/}
                    {/*    {loginLoading ? (<span className="loading loading-spinner loading-sm"></span>) : (<img src="/nextStep.svg" alt="Next" className="w-12 h-12"/>)}*/}
                    {/*</button>*/}
                    {/*<button className="p-4 rounded-full" onClick={() => tgVerfiyAndLogin(false)}>*/}
                    {/*    {loginLoading ? (<span className="loading loading-spinner loading-sm"></span>) : (<img src="/nextStep.svg" alt="Next" className="w-12 h-12"/>)}*/}
                    {/*</button>*/}
                    {/*<button className="bg-[#FFE541] text-black p-2 rounded-full w-full" onClick={() => tgVerfiyAndLogin(false)}>*/}
                    {/*    {loginLoading ? (<span className="loading loading-spinner loading-sm"></span>) : (<img src="/nextStep.svg" alt="Next" className="w-12 h-12"/>)}*/}
                    {/*</button>*/}
                    <button className="bg-[#FFE541] text-black p-2 rounded-full w-[90%] mt-6" onClick={() => tgVerfiyAndLogin(false)}>
                        {loginLoading ? (<span className="loading loading-spinner loading-sm"></span>) : 'Earn Free Ton Now'}
                    </button>
                </div>
            )}

            {/*{step === 2 && (*/}
            {/*    <div className="flex flex-col justify-center items-center text-center">*/}
            {/*        <h2 className="text-2xl mb-2">First</h2>*/}
            {/*        <h2 className="text-2xl mb-6">what should we call you?</h2>*/}
            {/*        <input*/}
            {/*            type="text"*/}
            {/*            className="p-2 mb-4 rounded-lg text-xl shadow-[0px_4px_4px_0px_#00000040] bg-white focus:outline-none"*/}
            {/*            placeholder=""*/}
            {/*            value={name}*/}
            {/*            onChange={(e) => setName(e.target.value)}*/}
            {/*        />*/}
            {/*        <button className="p-4 rounded-full" onClick={handleNextStep}>*/}
            {/*            <img src="/nextStep.svg" alt="Next" className="w-12 h-12"/>*/}
            {/*        </button>*/}
            {/*    </div>*/}
            {/*)}*/}

            {step === 2 && (
                <div className="flex flex-col justify-center items-center text-center">
                    <h2 className="text-3xl mb-4">Help Chef Otter to collect more food!</h2>
                    <img src="/SquirrelChef.png" alt="Chef Squirrel" className="mb-4"/>
                    <button className="p-4 rounded-full" onClick={() => tgVerfiyAndLogin(false)}>
                        {loginLoading ? (<span className="loading loading-spinner loading-sm"></span>) : (<img src="/nextStep.svg" alt="Next" className="w-12 h-12"/>)}

                    </button>
                </div>
            )}
        </div>
    );
};

export default Login;
