const Profile = require('../model/Profile')

module.exports = {

  async index (req,res){
    return res.render("profile", { profile: await Profile.get()})
  },

  async update(req,res){
    const profile = await Profile.get()
    const data = req.body
    //definir quantas semanas tem num ano
    const weeksPerYear = 52
    //remover as semanas de férias do ano, para pegar quantas semanas tem em 1 mês
    const weeksPerMonth = (weeksPerYear - data['vacation-per-year']) /12 
    //quantas horas por semana estou trabalhando
    
    //total de horas trabalhadas no mês
    const weekTotalHours = data['hours-per-day'] * data['days-per-week']

    //horas trabalhadas no mês
    const monthlyTotalHours = weekTotalHours * weeksPerMonth

    //Qual será o valor da hora
    const valueHour = data['monthly-budget']/ monthlyTotalHours

    

    await Profile.update({
      ...profile,
      ...req.body,
      "value-per-hour": valueHour
    })
    return res.redirect('/profile')
  }
}