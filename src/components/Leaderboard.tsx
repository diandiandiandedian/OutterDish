import React, { useEffect, useState } from 'react'

interface LeaderboardEntry {
    name: string
    score: number
}

const Leaderboard: React.FC = () => {
    const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([])

    useEffect(() => {
        const fetchLeaderboard = async () => {
            try {
                const response = await fetch('/api/leaderboard')
                if (!response.ok) {
                    throw new Error('Failed to fetch leaderboard')
                }
                const data = await response.json()
                setLeaderboard(data)
            } catch (error) {
                console.error('Error fetching leaderboard:', error)
            }
        }

        fetchLeaderboard()
    }, [])

    return (
        <div className="w-full h-full p-4">
            <h1 className="text-2xl font-bold mb-4">Leaderboard</h1>
            <ul>
                {leaderboard.map((entry, index) => (
                    <li key={index} className="mb-2">
                        {entry.name}: {entry.score}
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default Leaderboard
