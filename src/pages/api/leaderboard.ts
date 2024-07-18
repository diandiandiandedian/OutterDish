import type { NextApiRequest, NextApiResponse } from 'next'

let leaderboard: { name: string; score: number }[] = [
    { name: 'Player1', score: 100 },
    { name: 'Player2', score: 90 },
    { name: 'Player3', score: 80 },
]

export default function handler(req: NextApiRequest, res: NextApiResponse) {
    res.status(200).json(leaderboard)
}
