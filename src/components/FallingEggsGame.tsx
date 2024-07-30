import React, {useState, useEffect, useRef, useCallback} from 'react';
import CryptoJS from 'crypto-js';
import {useRouter} from 'next/router';
import {BASE_URL} from "../config/constant";
import {useNotification} from "../context/NotificationContext";
import 'animate.css';
import ReactAudioPlayer from "react-audio-player"; // 导入 animate.css

interface EggProps {
    id: number;
    type: 'egg-large' | 'egg-medium' | 'egg-small' | 'bomb';
    left: number;
    playLimit: boolean;
    onRemove: (id: number, points: number) => void;
    playAddScore: () => void;
    playReduceScore: () => void;
}

const Egg: React.FC<EggProps> = React.memo(({id, type, left, onRemove, playLimit, playAddScore, playReduceScore}) => {
    const points = type === 'egg-large' ? 10 : type === 'egg-medium' ? 20 : type === 'egg-small' ? 30 : -10;
    const [visible, setVisible] = useState(true);
    // const addScoreAudioRef = useRef<HTMLAudioElement | null>(null);
    // const reduceScoreAudioRef = useRef<HTMLAudioElement | null>(null);

    useEffect(() => {
        const timer = setTimeout(() => {
            setVisible(false);
            onRemove(id, 0);
        }, 5500); // 修改定时器以匹配新的动画持续时间
        return () => clearTimeout(timer);
    }, [id, onRemove]);

    const handleClick = async (e: React.MouseEvent | React.TouchEvent) => {
        setVisible(false);
        const {clientX, clientY} = 'touches' in e ? e.touches[0] : e;
        const eggElement = e.currentTarget as HTMLElement;
        const rect = eggElement.getBoundingClientRect();
        const x = clientX - rect.left;
        const y = clientY - rect.top;
        const webApp = (window as any).Telegram.WebApp;
        const bbb = webApp.HapticFeedback;

        if (type === 'bomb') {
            playReduceScore()
            bbb.impactOccurred("heavy");
        } else {
            playAddScore()
            bbb.impactOccurred("light");
        }

        onRemove(id, points);
        if (!playLimit) {
            showScorePopup(clientX, clientY, points);

        }
    };

    const showScorePopup = (x: number, y: number, points: number) => {
        const popup = document.createElement('div');
        popup.className = 'absolute text-red-500 text-xl animate-fade-out';
        popup.style.left = `${x}px`;
        popup.style.top = `${y - 20}px`;
        popup.textContent = `${points > 0 ? '+' : ''}${points}`;
        document.body.appendChild(popup);
        setTimeout(() => {
            document.body.removeChild(popup);
        }, 1000);
    };

    if (!visible) return null;

    return (
        <>
            {/*<audio ref={addScoreAudioRef} src="/music/addscore.wav"/>*/}
            {/*<audio ref={reduceScoreAudioRef} src="/music/reducescore.wav"/>*/}
            <div
                className={`absolute ${type} bg-cover cursor-pointer animate-fall`}
                style={{left: `${left}px`, top: '-96px'}}
                onClick={handleClick}
                onTouchStart={handleClick}
            />
        </>
    );
});

const FallingEggsGame: React.FC<{ fromLogin?: string }> = ({fromLogin}) => {
    const [score, setScore] = useState(0);
    const [eggs, setEggs] = useState<{ id: number; type: 'egg-large' | 'egg-medium' | 'egg-small' | 'bomb'; left: number }[]>([]);
    const [idCounter, setIdCounter] = useState(0);
    const [removedEggs, setRemovedEggs] = useState<number[]>([]);
    const intervalRef = useRef<NodeJS.Timeout | null>(null);
    const router = useRouter();
    const {showSuccess, showError} = useNotification();
    const [clickCount, setClickCount] = useState(0);
    const [showConfirmRedeem, setShowConfirmRedeem] = useState<boolean>(false);
    const [shake, setShake] = useState(false);
    const [playLimit, setPlayLimit] = useState(false);
    const [isMusicPlaying, setIsMusicPlaying] = useState(false);
    const audioRef = useRef<ReactAudioPlayer>(null)
    const addScoreAudioRef = useRef<ReactAudioPlayer>(null)
    const addScoreAudioRef2 = useRef<ReactAudioPlayer>(null)
    const addScoreAudioRef3 = useRef<ReactAudioPlayer>(null)
    const reduceScoreAudioRef = useRef<ReactAudioPlayer>(null)
    const [userStopBackground, setUserStopBackground] = useState(false);
    const [addScoreAudioIndex, setAddScoreAudioIndex] = useState(0);


    const clearEggsInterval = () => {
        if (intervalRef.current) {
            clearInterval(intervalRef.current);
        }
    };
    // useEffect(() => {
    //     const playAudio = () => {
    //         if (audioRef.current) {
    //             audioRef.current.muted = true;
    //             audioRef.current.play().then(() => {
    //                 setTimeout(() => {
    //                     if (audioRef.current) {
    //                         audioRef.current.muted = false;
    //                     }
    //                 }, 1000); // 在1秒后取消静音
    //             }).catch(error => {
    //                 console.error("Error playing audio:", error);
    //             });
    //         }
    //     };
    //
    //     playAudio();
    // }, []);

    const startEggsInterval = () => {
        clearEggsInterval();
        const interval = 500;
        intervalRef.current = setInterval(generateEggs, interval);
    };

    const generateEggs = useCallback(() => {
        const newEggs: { id: number; type: 'egg-large' | 'egg-medium' | 'egg-small' | 'bomb'; left: number }[] = [];
        const eggWidth = 96; // 假设最大的蛋的宽度是96px

        const rand = Math.random();
        let type: 'egg-large' | 'egg-medium' | 'egg-small' | 'bomb';
        if (rand < 0.65) {
            type = 'egg-large'; // 65% 概率
        } else if (rand < 0.85) {
            type = 'egg-medium'; // 20% 概率
        } else if (rand < 0.95) {
            type = 'egg-small'; // 10% 概率
        } else {
            type = 'bomb'; // 5% 概率
        }

        let left: number;
        let overlaps: boolean;

        do {
            left = Math.random() * (window.innerWidth - eggWidth);
            overlaps = newEggs.some(egg => Math.abs(egg.left - left) < eggWidth);
        } while (overlaps);

        newEggs.push({id: idCounter, type, left});

        setEggs((eggs) => [...eggs, ...newEggs]);
        setIdCounter((id) => id + 1);
    }, [idCounter]);

    useEffect(() => {
        startEggsInterval();
        return () => clearEggsInterval();
    }, [generateEggs]);

    useEffect(() => {
        if (removedEggs.length >= 100) {
            setEggs((eggs) => eggs.filter((egg) => !removedEggs.includes(egg.id)));
            setRemovedEggs([]);
        }
    }, [removedEggs]);

    const handleRemoveEgg = (id: number, points: number) => {
        setRemovedEggs((prev) => [...prev, id]);
        const newScore = score + points;
        if (!playLimit) {
            setScore(newScore);
        }

        if (fromLogin !== "1") {
            saveScore(points);
        }

        if (fromLogin === "1" && newScore >= 200) {
            router.push('/reward');
        }
    };

    const encryptData = (data: object, secretKey: string): string => {
        return CryptoJS.AES.encrypt(JSON.stringify(data), CryptoJS.enc.Utf8.parse(secretKey), {
            mode: CryptoJS.mode.ECB,
            padding: CryptoJS.pad.Pkcs7
        }).toString();
    };

    const saveScore = async (newScore: number) => {
        try {
            // const username = localStorage.getItem('username');
            const tgUserId = localStorage.getItem('tgUserId');
            const token = localStorage.getItem('token');
            if (!tgUserId || !token) {
                console.error('Username or token not found in local storage');
                return;
            }

            const secretKey = 'mySecretKey12345';
            const data = {gameScore: newScore, tgUserId, token};
            const encryptedData = encryptData(data, secretKey);

            const response = await fetch(BASE_URL + '/tg/updateScore', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({requestData: encryptedData}),
            });
            if (!response.ok) {
                throw new Error('Failed to save score');
            }
            const resResult = await response.json();
            if (!resResult.success) {
                // showError(resResult.msg);
                if (resResult.data >= 500) {
                    setPlayLimit(true)
                    setShake(false); // 重置 shake 状态
                    setTimeout(() => setShake(true), 0); // 立即重新设置 shake 为 true
                    const lastShown = localStorage.getItem('lastShown');
                    const today = new Date().toDateString();
                    if (lastShown !== today) {
                        localStorage.setItem('lastShown', today);
                        setShowConfirmRedeem(true);
                    }
                    // setShowConfirmRedeem(true)
                }
            } else {
                setClickCount(resResult.data)
                // showSuccess('Points claimed successfully!');
            }
            console.log('Score saved successfully');
        } catch (error) {
            console.error('Error saving score:', error);
        }
    };

    useEffect(() => {
        // audioRef.current.audioEl.current.play()

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
                setScore(data.data.user['gameScore']);
                setClickCount(data.data['clickCount']);
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        };
        if (fromLogin !== "1") {
            fetchData();
        }
    }, []);

    const handleExploreClick = () => {
        router.push('/home');
    };

    const toggleMusic = () => {
        if (audioRef.current) {
            if (!isMusicPlaying) {
                setUserStopBackground(false)
                audioRef.current.audioEl.current!.play();
            } else {
                setUserStopBackground(true)
                audioRef.current.audioEl.current!.pause();
            }
            setIsMusicPlaying(!isMusicPlaying);
        }
    };

    function playAddScore() {
        if (!userStopBackground) {
            // if (addScoreAudioIndex % 3 === 0) {
            //     addScoreAudioRef.current?.audioEl.current!.play();
            // } else if (addScoreAudioIndex % 3 === 1) {
            //     addScoreAudioRef2.current?.audioEl.current!.play();
            // } else {
            //     addScoreAudioRef3.current?.audioEl.current!.play();
            // }
            // setAddScoreAudioIndex(addScoreAudioIndex + 1)
            if (!isMusicPlaying) {
                audioRef.current?.audioEl.current!.play();
                setIsMusicPlaying(true)
            }
        }
    }

    function playReduceScore() {
        if (!userStopBackground) {
            // reduceScoreAudioRef.current.audioEl.current!.play();
            if (!isMusicPlaying) {
                audioRef.current?.audioEl.current!.play();
                setIsMusicPlaying(true)
            }
        }
    }


    return (
        <div className="relative w-full h-full bg-[#e9c99c] overflow-hidden">
            {/*<audio ref={audioRef} src="/music/backgroundMusic.mp3" autoPlay loop/>*/}
            <ReactAudioPlayer ref={audioRef} src="/music/backgroundMusic.mp3" loop/>
            {/*<ReactAudioPlayer ref={addScoreAudioRef} src="music/addscore.wav"/>*/}
            {/*<ReactAudioPlayer ref={addScoreAudioRef2} src="music/addscore.wav"/>*/}
            {/*<ReactAudioPlayer ref={addScoreAudioRef3} src="music/addscore.wav"/>*/}
            {/*<ReactAudioPlayer ref={reduceScoreAudioRef} src="music/reducescore.wav"/>*/}
            <div className="h-full flex justify-center items-center flex-col">
                <img src="/logo.svg" alt="Logo" className="w-24 h-24 mb-4"/>
                {fromLogin === "1" && <progress className="progress progress-success mb-4 h-[30px] w-[75%] border border-[#000000] bg-transparent [&::-webkit-progress-value]:bg-[#FFB641] [&::-moz-progress-bar]:bg-[#FFB641]" value={score} max={200}></progress>}
                <div className="text-black opacity-10 text-[70px] pointer-events-none font-kg">{fromLogin === "1" ? score + " / 200" : score}</div>
                {fromLogin !== "1" && (
                    <div className={`bg-[#FFBF59] rounded-[16px] fixed top-10 left-3 px-6 py-2 text-center ${shake ? 'animate__animated animate__shakeX' : ''}`}>
                        <div className="text-[#787878] mb-1">Daily Energy</div>
                        <div>{clickCount}/500</div>
                    </div>
                )}
                <button className="absolute bottom-24 left-5 p-2 text-white rounded-full" onClick={toggleMusic}>
                    {isMusicPlaying ? <img src="/music/close.svg" alt=""/> : <img src="/music/mute.svg" alt=""/>}
                </button>
            </div>
            {eggs.map((egg) => (
                <Egg key={egg.id} id={egg.id} type={egg.type} left={egg.left} playLimit={playLimit} playReduceScore={playReduceScore} playAddScore={playAddScore} onRemove={handleRemoveEgg}/>
            ))}
            {showConfirmRedeem && (
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-black bg-opacity-30 flex justify-center items-center z-50 w-[80%] rounded-lg">
                    <div className="bg-white p-6 rounded-lg text-center mx-auto w-[100%] ">
                        <div className="mb-4">Chef Outter is tired today! Please pome back tomorrow</div>
                        <div className="flex justify-around">
                            <button className="bg-red-500 text-white p-2 rounded-full w-2/5" onClick={() => setShowConfirmRedeem(false)}>
                                OK
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default FallingEggsGame;
