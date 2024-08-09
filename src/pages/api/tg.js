import pool from '../../db/db';
import Cors from 'cors';
import crypto from 'crypto';
import {BOT_TOKEN, partern} from "../../config/server-constant";


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
            return tgVerfiy(req, res);
        // const {action} = req.body;
        // switch (action) {
        //     case 'updateScore':
        //         await updateScore(req, res);
        //         break;
        //     case 'saveTgUser':
        //         await saveTgUser(req, res);
        //         break;
        //     case 'action3':
        //         // await handleAction3(req, res);
        //         break;
        //     // 添加其它方法的处理逻辑（PUT、DELETE）
        //     default:
        //         return res.status(405).end(`Method ${req.method} Not Allowed`);
        // }
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
    console.log('row3', row3)
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

    const {token, username, score} = decryptedData;
    console.log('score', score)
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


const tgVerfiy = async (req, res) => {
    const {telegramInitData, user} = req.body;
    const initData = new URLSearchParams(telegramInitData);
    initData.set("user", JSON.stringify(user))
    initData.sort();

    // console.log('initData', initData)
    const hash = initData.get("hash");
    // 邀请人
    const start_param = initData.get("start_param");
    initData.delete("hash");
    const dataToCheck = [...initData.entries()].map(([key, value]) => key + "=" + value).join("\n");
    // console.log('dataToCheck', dataToCheck)

    // 可以用的
    // const apitoken="5768337691:AAGDAe6rjxu1cUgxK4BizYi--Utc3J9v5AU"
    // const hash="371697738012ebd26a111ace4aff23ee265596cd64026c8c3677956a85ca1827"
    // const joined_pairs = "auth_date=1709144340\nchat_instance=-3788475317572404878\nchat_type=private\nuser={\"id\":279058397,\"first_name\":\"Vladislav\",\"last_name\":\"Kibenko\",\"username\":\"vdkfrost\",\"language_code\":\"en\",\"is_premium\":true,\"allows_write_to_pm\":true}"

    // todo 修改bot,还要修改数据库连接
    // 正式版 7467070275:AAGBRjyK7fBxK05Upv9rNkrUJinmhiTvfeQ
    // 测试版 5726185691:AAH84b6CYTZRE8KuT7oAnxDtkjYI5fhtbNs
    // const hash="371697738012ebd26a111ace4aff23ee265596cd64026c8c3677956a85ca1827"
    // const joined_pairs = "auth_date=1709144340\nchat_instance=-3788475317572404878\nchat_type=private\nuser={\"id\":279058397,\"first_name\":\"Vladislav\",\"last_name\":\"Kibenko\",\"username\":\"vdkfrost\",\"language_code\":\"en\",\"is_premium\":true,\"allows_write_to_pm\":true}"

    // 可以用的
    const secretKey = crypto.createHmac("sha256", "WebAppData").update(BOT_TOKEN).digest();
    const _hash = crypto.createHmac("sha256", secretKey).update(dataToCheck).digest("hex");
    // console.log(hash, _hash)
    // res.status(200).json(hash === _hash);
    if (hash === _hash) {
        const rows = await pool.query('SELECT * FROM tg_user where tg_user_id = ?', [user.id]);
        // console.log('rows[0][0]', rows[0][0])
        if (rows[0].length === 0) {
            // 没有注册过,才能记录邀请人
            if (start_param !== null && start_param !== undefined && start_param !== '') {
                // 存在邀请人
                const tgUserId = user.id
                const userHaveInvited = await pool.query('SELECT * FROM invite where invited = ?', [tgUserId]);
                console.log('userHaveInvited[0]', userHaveInvited[0])
                if (userHaveInvited[0].length === 0) {
                    // 没有被邀请,记录邀请人
                    const [result] = await pool.execute('INSERT INTO `ezswap`.`invite` (`create_time`, `inviter`, `invited`) VALUES (?,?,?)', [new Date().getTime(), start_param, tgUserId]);

                    const invitedCount = await pool.query('SELECT count(distinct invited) as inviteCount FROM invite where inviter = ?', [start_param]);
                    console.log('start_param', invitedCount,start_param,partern.indexOf(Number(start_param)) === -1)
                    if (invitedCount[0][0].inviteCount % 2 === 0 && partern.indexOf(Number(start_param)) === -1) {
                        console.log('我进来了')
                        // 赠送一次spin
                        await pool.execute('UPDATE ezswap.tg_user set spin_remain_time = spin_remain_time + 1 where tg_user_id = ?', [start_param]);
                    }
                }
            }
        }
        res.status(200).json({"result": true, "user": rows[0][0]});
    } else {
        res.status(200).json({"result": false});
    }
};



