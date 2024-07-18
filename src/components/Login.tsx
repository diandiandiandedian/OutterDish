import React, {useState, useEffect} from 'react';
import {useRouter} from 'next/router';
import {BASE_URL} from '../config/constant';
import {useNotification} from "../context/NotificationContext";
import CryptoJS from "crypto-js";

export const Login: React.FC = () => {
    const [step, setStep] = useState(1);
    const [name, setName] = useState('');
    const [tgUserId, setTgUserId] = useState('');
    const [loginLoading, setLoginLoading] = useState(false);
    const [loadFlag, setLoadFlag] = useState(false);
    const router = useRouter();
    const [tgUser, setTgUser] = useState({id: '', username: ''});
    const {showSuccess, showError} = useNotification();


    const handleNextStep = () => {
        if (step === 2 && name === '') {
            showError("Please set name")
            return
        }
        setStep(step + 1);
    };


    // async function login(tgUserId: Object) {
    //     setLoginLoading(true)
    //     try {
    //         const secretKey = 'mySecretKey12345';
    //         const encryptedData = encryptData(tgUserId, secretKey);
    //         console.log('加密数据', encryptedData)
    //
    //         const response = await fetch(BASE_URL + "/tg/login", {
    //             method: 'POST',
    //             headers: {
    //                 'Content-Type': 'application/json'
    //             },
    //             body: JSON.stringify({
    //                 // action: 'saveTgUser',
    //                 requestData: encryptedData
    //             })
    //         });
    //         const resResult = await response.json()
    //         if (resResult.success && resResult.data["tgUserId"] !== undefined && resResult.data["tgUserId"] !== '') {
    //             localStorage.setItem('tgUserId', resResult.data["tgUserId"]);
    //             localStorage.setItem('token', resResult.data.token);
    //             router.push('/game');
    //         }
    //         setLoginLoading(false)
    //     } catch (e) {
    //         showError('network error')
    //         setLoginLoading(false)
    //     }
    // }

    // const encryptData = (data: object, secretKey: string): string => {
    //     return CryptoJS.AES.encrypt(JSON.stringify(data), CryptoJS.enc.Utf8.parse(secretKey), {
    //         mode: CryptoJS.mode.ECB,
    //         padding: CryptoJS.pad.Pkcs7
    //     }).toString();
    // };


    useEffect(() => {
        // console.log('(window as any).Telegram.WebApp.initDataUnsafe',(window as any).Telegram.WebApp.initDataUnsafe.user)
        // console.log('(window as any).Telegram.WebApp',(window as any).Telegram.WebApp)
        if (!loadFlag) {
            // console.log('请求地址',window.location.href)
            // const {tgWebAppStartParam} = router.query;


            if ((window as any).Telegram !== undefined) {
                if ((window as any).Telegram.WebApp.initDataUnsafe.user !== undefined) {

                    console.log((window as any).Telegram.WebApp)
                    // 获取 tgWebAppStartParam
                    const inviter = (window as any).Telegram.WebApp.initDataUnsafe.start_param
                    // console.log('inviter', inviter)

                    const user = (window as any).Telegram.WebApp.initDataUnsafe?.user;
                    // console.log('user', user)
                    setTgUser(user)
                    setName(user.username)
                    setTgUserId(user.id)
                    setLoadFlag(true)
                    // const {startapp} = router.query;
                    // console.log('inviter', startapp)
                    if (undefined !== inviter && '' !== inviter && null !== inviter) {
                        // 有邀请人,记录邀请人
                        recordInviter(inviter, user.id)
                    }
                    // login(user.id)
                    tgVerfiy((window as any).Telegram.WebApp.initDataUnsafe)

                }
            }
            const img = new Image();
            img.src = '/SquirrelChef.png';
            img.onload = () => {
            };
        }
    });

    async function tgVerfiy(telegramInitData: any) {

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
            if (result['result']) {
                // 验证通过
                console.log('result[\'user\']',result['user'])
                if (result['user'].id !== undefined) {
                    localStorage.setItem('token', result['user'].token);
                    localStorage.setItem('tgUserId', result['user'].tgUserId);
                    // 注册过了,跳转主页
                    router.push('/game');
                }
            }

        } catch (e) {
            console.log(e)
        }


    }


    const handleLogin = async () => {
        await saveTgUser(name);
    };

    async function recordInviter(inviter: string, tgUserId: string) {
        try {
            const response = await fetch(BASE_URL + "/invite/save", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    // action: 'saveTgUser',
                    inviter: inviter,
                    invited: tgUserId
                })
            });
        } catch (e) {
            console.log(e)
        }
    }

    async function saveTgUser(name: string) {
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
                    tgUserId: tgUser["id"],
                    userInfo: tgUser["username"],
                    userName: name
                })
            });
            const resResult = await response.json()
            if (!resResult.success) {
                showError(resResult.msg);
            } else {
                localStorage.setItem('username', name);
                localStorage.setItem('tgUserId', tgUser["id"]);
                localStorage.setItem('token', resResult.data.token);
                router.push({
                    pathname: '/game',
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
                <div className="flex flex-col justify-center items-center text-center">
                    <div className="text-2xl mb-10">Welcome to</div>
                    <h1 className="text-6xl mb-6">OutterDish</h1>
                    <p className="text-2xl mb-4">Order, play & earn</p>
                    <button className="p-4 rounded-full" onClick={handleNextStep}>
                        <img src="/nextStep.svg" alt="Next" className="w-12 h-12"/>
                    </button>
                </div>
            )}

            {step === 2 && (
                <div className="flex flex-col justify-center items-center text-center">
                    <h2 className="text-2xl mb-2">First</h2>
                    <h2 className="text-2xl mb-6">what should we call you?</h2>
                    <input
                        type="text"
                        className="p-2 mb-4 rounded-lg text-xl shadow-[0px_4px_4px_0px_#00000040] bg-white focus:outline-none"
                        placeholder=""
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                    <button className="p-4 rounded-full" onClick={handleNextStep}>
                        <img src="/nextStep.svg" alt="Next" className="w-12 h-12"/>
                    </button>
                </div>
            )}

            {step === 3 && (
                <div className="flex flex-col justify-center items-center text-center">
                    <h2 className="text-3xl mb-4">Help Chef Otter to collect more food!</h2>
                    <img src="/SquirrelChef.png" alt="Chef Squirrel" className="mb-4"/>
                    <button className="p-4 rounded-full" onClick={handleLogin}>
                        {loginLoading ? (<span className="loading loading-spinner loading-sm"></span>) : (<img src="/nextStep.svg" alt="Next" className="w-12 h-12"/>)}

                    </button>
                </div>
            )}
        </div>
    );
};

export default Login;
