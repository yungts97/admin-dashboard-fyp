export function getNumOfDaysInMonth (dateObject) {
  const month = dateObject.getMonth()
  const year = dateObject.getYear()
  switch (month) {
    case 0:
    case 2:
    case 4:
    case 6:
    case 7:
    case 9:
    case 11:
      return 31
    case 1:
      return isLeapYear(year) ? 29 : 28
    default:
      return 30
  }
}

function isLeapYear (year) {
  return !(year % 4 || (!(year % 100) && year % 400))
}
