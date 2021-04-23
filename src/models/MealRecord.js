import FoodItem from 'models/FoodItem'

export default class MealRecord {
  constructor (record) {
    this.date = record.date_modified || record.date_created
    this.bloodGlucose = record.blood_glucose
    this.foodItems = record.food_items.map(item => new FoodItem(item))
  }

  getTotalMealNutrition () {
    const totalFoodNurtitions = this.foodItems.map(item => item.totalNutritionWithCalculatedWeight())

    return totalFoodNurtitions.reduce((accumulator, nutrition) => {
      nutrition.forEach(element => {
        const nutritionName = element.name
        const index = accumulator.findIndex(item => item.name === nutritionName)
        if (index === -1) {
          accumulator[nutritionName] = element.value
        } else {
          accumulator[index].value += element.value
        }
      })
      return accumulator
    })
  }
}
