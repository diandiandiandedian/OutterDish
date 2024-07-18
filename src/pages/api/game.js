import pool from '../../db/db';
import Cors from 'cors';


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
    console.log('req', req.method)
    switch (req.method) {
        case 'GET':
            return recordGameRecord(req, res);
        case 'POST':
            return queryUserBestScoreAndTotalScore(req, res);
        // 添加其它方法的处理逻辑（PUT、DELETE）
        default:
            return res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}

const recordGameRecord = async (req, res) => {
    // const { address } = req.body;
    const headers = req.headers;
    console.log('header', headers)
    console.log('header', headers['user-agent'])
    const {address, score, type} = req.query;
    // const { address3 } = req.json
    console.log('address11111', address, score, type)
    try {
        const [result] = await pool.execute('INSERT INTO `ezswap`.`game_record` (`create_time`, `score`, `address`,`type`,`userAgent`,`header`) VALUES (?, ?, ?,?,?,?)', [new Date().getTime(), score, address, type, headers, headers['user-agent']]);
        res.status(201).json({"status": 0});
    } catch (error) {
        res.status(500).json({error: error.message});
    }
};


// const cors = Cors({
//     methods: ['GET', 'POST', 'OPTIONS'], // 允许的 HTTP 方法
//     origin: '*', // 允许的来源，或者根据实际情况设置具体的来源
// });

// todo 测试合约: kQCosUQKgQvPvf-WQtvYoL25e-7VY7Wll6zrdC81DT9NZ7S0
// todo 正式合约: EQBcBMxM4DOJzxgN8KG_Qm8WOgwTbDCxApyTFVduT_8lz1Yl
// const updateUserGetCoupon = async (req, res) => {
//     const {address} = req.body;
//     try {
//         const userNftList = await queryUserNFTs(address, 'kQCosUQKgQvPvf-WQtvYoL25e-7VY7Wll6zrdC81DT9NZ7S0')
//         if (userNftList.length <= 0) {
//             res.status(200).json({"status": 334, "errorMsg": "dont have nft"});
//             return
//         }
//         const userNFTs = await queryUserHavePullCouponSql(address)
//         console.log('userNFTs', userNFTs, userNFTs[0].length)
//         if (userNFTs[0] !== undefined && userNFTs[0].length > 0) {
//             res.status(200).json({"status": 333, "errorMsg": "user have pull coupon"});
//             return
//         }
//         // console.log('address', data, address)
//
//         const updateResult = await updateRestCoupon()
//         console.log('updateResult[0]', updateResult[0].affectedRows)
//         if (updateResult[0].affectedRows >= 1) {
//             const [result] = await pool.execute('INSERT INTO `ezswap`.`soon_coupon` (`create_time`, `coupon`, `pull_address`) VALUES (?, ?, ?)', [new Date().getTime(), 1, address]);
//         }
//         // pool.end();
//         res.status(201).json({"status": 0});
//     } catch (error) {
//         res.status(500).json({error: error.message});
//     }
// };
//


const queryUserBestScoreAndTotalScore = async (req, res) => {
    const {address} = req.body;
    try {
        const rows = await pool.query('SELECT score FROM game_record where type=1 and address = ?', [address]);
        let bestScore = 0
        let totalScore = 0
        for (const row of rows[0]) {
            console.log('row', row.score)
            totalScore = totalScore + row.score
            if (bestScore < row.score) {
                bestScore = row.score
            }
        }
        res.status(201).json({"bestScore": bestScore, "totalScore": totalScore});
    } catch (error) {
        res.status(500).json({error: error.message});
    }
};

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
