import { get, ref } from 'firebase/database'
import { db } from '../firebaseConfig'

// Function to calculate sleep score for a user based on available sleep data from Firebase
export const calculateSleepScore = async (uid: string) => {
  try {
    const currentDate = new Date()
    const lastSevenDays = []
    for (let i = 0; i < 7; i++) {
      const date = new Date(currentDate)
      date.setDate(date.getDate() - i)
      const dateString = date.toISOString().split('T')[0]
      lastSevenDays.push(dateString)
    }

    const sleepDataPromises = lastSevenDays.map(async (date) => {
      const sleepRef = ref(db, `sleep/${uid}/${date}`)
      const snapshot = await get(sleepRef)
      if (!snapshot.exists()) {
        return null // Return null if no data exists for this date
      }
      return {
        date,
        data: snapshot.val(),
      }
    })

    const sleepData = await Promise.all(sleepDataPromises)
    const availableDays = sleepData.filter((entry) => entry !== null).length
    const goalMetDays = sleepData.filter(
      (entry) => entry && entry.data && entry.data.goalMet
    ).length
    console.log(
      sleepData.filter((entry) => entry && entry.data && entry.data.goalMet)
    )
    console.log(sleepData)
    console.log(availableDays)
    const score = Math.min(Math.floor((goalMetDays / availableDays) * 5), 5)

    return score
  } catch (error) {
    console.error('Error calculating sleep score:', error)
    throw error
  }
}
