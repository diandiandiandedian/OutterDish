import pool from '../../db/db';
import Cors from 'cors';
import CryptoJS from 'crypto-js';


function initMiddleware(middleware) {
    return (req, res) =>
        new Promise((resolve, reject) => {
            middleware(req, res, (result) => {
                if (result instanceof Error) {
                    return reject(result);
                }
                return resolve(result);
            });
        });
}

// 初始化 CORS 中间件
const corsMiddleware = initMiddleware(
    Cors({
        origin: '*', // 允许所有来源，根据需要进行更精确的配置
        methods: ['GET', 'POST', 'OPTIONS'], // 允许的 HTTP 方法
    })
);

export default async function handler(req, res) {
    await corsMiddleware(req, res);
    // console.log('req', req.body)
    switch (req.method) {
        case 'GET':
            return queryScoreAndRank(req, res);
        case 'POST':
            const {action} = req.body;
            switch (action) {
                case 'updateScore':
                    await updateScore(req, res);
                    break;
                case 'saveTgUser':
                    await saveTgUser(req, res);
                    break;
                case 'action3':
                    // await handleAction3(req, res);
                    break;
                // 添加其它方法的处理逻辑（PUT、DELETE）
                default:
                    return res.status(405).end(`Method ${req.method} Not Allowed`);
            }
    }
}


const saveTgUser = async (req, res) => {
    const {address, tgUserId, userInfo, userName} = req.body;
    // console.log('address11111', address, tgUserId, userInfo)
    try {
        const rows = await pool.query('SELECT * FROM tg_wallet where tg_user_id=?', [tgUserId]);
        // console.log('tg user', rows[0].length)
        if (rows[0].length === 0) {
            const [result] = await pool.execute('INSERT INTO `ezswap`.`tg_wallet` (`create_time`, `tg_user_id`, `address`,`user_info`,`user_name`,`token`) VALUES (?, ?, ?,?,?,?)', [new Date().getTime(), tgUserId, address, userInfo, userName, UUID]);
        }
        const UUID = crypto.randomUUID();
        res.status(200).json({"status": 0, "token": UUID});
    } catch (error) {
        console.log(error)
        res.status(500).json({error: error.message});
    }
};


const queryScoreAndRank = async (req, res) => {
    // const { address } = req.body;
    // const headers = req.headers;
    // console.log('req', req, headers)
    const {token, userName} = req.query;
    // console.log('token, userName', token, userName)
    // if (score !== 10 || score !== 20 || score !== 30 || score !== -10) {
    //     res.status(200).json({"data": "param error"});
    //     return
    // }
    const rows = await pool.query('SELECT * FROM tg_wallet where user_name=? and token = ?', [userName, token]);
    console.log('roows', rows[0])
    console.log('roows', rows[0][0].tg_user_id)
    if (rows[0].length === 0) {
        res.status(200).json({"user": {}, "rank": 999999999});
    }
    const rows2 = await pool.query('SELECT count(1) as rankScore FROM tg_wallet where game_score>?', [rows[0][0].game_score]);
    const row3 = await pool.query('SELECT count(1) as couponCount FROM soon_coupon where tg_user_id=?', [rows[0][0].tg_user_id]);
    console.log('row3',row3)
    res.status(200).json({"user": rows[0][0], "rank": rows2[0][0].rankScore, 'couponCount': row3[0][0].couponCount});
};

const updateScore = async (req, res) => {
    // const { address } = req.body;
    // const headers = req.headers;
    // console.log('req', req, headers)
    const {data} = req.body;
    const secretKey = 'your-secret-key';

    const bytes = CryptoJS.AES.decrypt(data, secretKey);
    const decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));

    const { token, username, score } = decryptedData;
    console.log('score',score)
    if (score !== 10 && score !== 20 && score !== 30 && score !== -10) {
        res.status(200).json({"data": "param error"});
        return
    }
    const rows = await pool.query('SELECT * FROM tg_wallet where user_name=? and token = ?', [username, token]);
    // console.log('tg user', rows[0].length)
    if (rows[0].length !== 0) {
        // 登录了
        const result = await pool.execute('UPDATE tg_wallet SET game_score = game_score+? WHERE tg_user_id = ?', [score, rows[0][0].tg_user_id]);
    }
    res.status(200).json({});
};


const cors = Cors({
    methods: ['GET', 'POST', 'OPTIONS'], // 允许的 HTTP 方法
    origin: '*', // 允许的来源，或者根据实际情况设置具体的来源
});

// todo 测试合约: kQCosUQKgQvPvf-WQtvYoL25e-7VY7Wll6zrdC81DT9NZ7S0
// todo 正式合约: EQBcBMxM4DOJzxgN8KG_Qm8WOgwTbDCxApyTFVduT_8lz1Yl
const updateUserGetCoupon = async (req, res) => {
    console.log('req', 'post')
    const {address, tgUserId, userInfo} = req.body;
    console.log('req.body', address, tgUserId, userInfo)
    // console.log('req.body', req.body['message']['text'])
    // // req.body['message']
    // await axios.post('https://api.telegram.org/bot7411782210:AAHe89edD-6bxxzEilQhQwzv-2SJqi20nNM/sendMessage', {
    //     chat_id: 519953199,
    //     text: '欢迎欢迎',
    // });
    // console.log('发送了')
    // res.status(200).json("aaaaa");

}

// console.log('aaaaaa')
// const token = '7411782210:AAHe89edD-6bxxzEilQhQwzv-2SJqi20nNM'; // Replace with your own bot token
// const bot = new TelegramBot(token, {polling: true});
//
// bot.on('message', (msg) => {
//     const chatId = msg.chat.id;
//     const messageText = msg.text;
//     console.log('chatId,messageText', chatId, messageText)
//     if (messageText === '/start') {
//         bot.sendMessage(chatId, 'Welcome to the bot!');
//     }
// });
