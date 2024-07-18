import type { NextApiRequest, NextApiResponse } from 'next'

let leaderboard: { name: string; score: number }[] = []

export default function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'POST') {
        const { score } = req.body
        // 在这里添加逻辑，将分数保存到排行榜
        leaderboard.push({ name: 'Player', score })
        leaderboard = leaderboard.sort((a, b) => b.score - a.score).slice(0, 10)
        res.status(200).json({ message: 'Score saved successfully' })
    } else {
        res.status(405).json({ message: 'Method not allowed' })
    }
}
