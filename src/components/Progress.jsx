import React, { useState, useEffect } from 'react'
import crudService from '../../backend/appwrite/service/crud.service.js'
import { useAuth } from '../context/AuthContext.jsx'

function Progress({ foods }) {

    const [streak, setStreak] = useState([])
    const [currentStreak, setCurrentStreak] = useState(0)
    const [isLoading, setIsLoading] = useState(true)
    const { user } = useAuth()

    useEffect(() => {
        if (!user) return;

        const fetchFoods = async () => {
            setIsLoading(true)
            try {
                const response = await crudService.getFoods(user.$id)
                
                if (response && response.documents && response.documents.length > 0) {
                    setStreak(response.documents)
                    calculateStreak(response.documents)
                } else {
                    setStreak([])
                    setCurrentStreak(0)
                }
            } catch (error) {
                console.error("Error fetching foods:", error)
                setStreak([])
                setCurrentStreak(0)
            } finally {
                setIsLoading(false)
            }
        }
        fetchFoods()
    }, [user])

    const calculateStreak = (entries) => {
        if (!entries || entries.length === 0) {
            setCurrentStreak(0)
            return
        }

        // Get unique dates from entries and sort them
        const uniqueDates = [...new Set(entries.map(entry => {
            const date = new Date(entry.$createdAt)
            return date.toISOString().split('T')[0] // Get YYYY-MM-DD format
        }))].sort()

        const today = new Date().toISOString().split('T')[0]
        let streakCount = 0
        let currentDate = new Date(today)

        // Check consecutive days backwards from today
        while (true) {
            const dateString = currentDate.toISOString().split('T')[0]
            
            if (uniqueDates.includes(dateString)) {
                streakCount++
                currentDate.setDate(currentDate.getDate() - 1) // Go back one day
            } else {
                break // Break the streak if a day is missing
            }
        }

        setCurrentStreak(streakCount)
    }

      if (isLoading) {
        return (
            <div className='flex flex-col items-center justify-center min-h-screen'>
                <div className='text-xl font-semibold mb-4'>Loading your progress...</div>
                <div className='animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600'></div>
            </div>
        )
    }

    return (
      <div className='flex flex-col items-center justify-center min-h-screen'>
        <h1 className='m-2 text-2xl font-bold'>Current Streak: {currentStreak} days</h1>
        <div className='mb-4 text-gray-600'>
          {currentStreak === 0 ? 
            "No active streak. Add an entry today to start one!" : 
            `Great job! You've been tracking for ${currentStreak} consecutive day${currentStreak > 1 ? 's' : ''}`
          }
        </div>
        
        {/* Debug info - you can remove this later */}
        <div className='mb-4 text-sm text-gray-500'>
          Total entries: {streak.length} | 
          Last entry: {streak.length > 0 ? new Date(streak[streak.length - 1].$createdAt).toLocaleDateString() : 'None'}
        </div>
    </div>
  )
}

export default Progress