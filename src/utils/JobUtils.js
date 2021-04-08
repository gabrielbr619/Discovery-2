module.exports = {
  remainingDays(job) {
    // cálculo de tempo restante
    const remainingDays = (job["total-hours"] / job["daily-hours"]).toFixed()
    console.log(remainingDays)
    const createdDate = new Date(job.created_at)
    const dueDay = createdDate.getDate() + Number(remainingDays)
    const dueDateInMs = createdDate.setDate(dueDay)
  
    const timeDiffInMs = dueDateInMs - Date.now()
    // transformar milli em dias
    const dayInMs = 1000 * 60 * 60 * 24
    const dayDiff = Math.floor(Number(timeDiffInMs) / Number(dayInMs))
    console.log(dayDiff)
    // restam x dias
    return remainingDays
  },
  calculateBudget: (job, valueHour) => valueHour * job["total-hours"]
}