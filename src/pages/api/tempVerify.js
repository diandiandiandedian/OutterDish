import pool from '../../db/db';

export default async function handler(req, res) {
    switch (req.method) {
        case 'POST':
            return getUsers(req, res);
        // 添加其它方法的处理逻辑（PUT、DELETE）
        default:
            return res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}

const verifyProof = async (proof) => {
    // console.log('proof', proof);
    const response = await fetch(
        'https://developer.worldcoin.org/api/v1/verify/app_staging_129259332fd6f93d4fabaadcc5e4ff9d',
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({...proof, action: "test"}),
        }
    );
    if (response.ok) {
        const {verified} = await response.json();
        return verified;
    } else {
        const {code, detail} = await response.json();
        throw new Error(`Error Code ${code}: ${detail}`);
    }
};

const getUsers = async (req, res) => {
    try {
        const requestBody = req.body;
        console.log(requestBody)
        const result = await verifyProof(requestBody)
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({error: error.message});
    }


};
