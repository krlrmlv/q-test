export default function getDeclension(number, strings) {
  const cases = [2, 0, 1, 1, 1, 2]
  const titles = strings.split(',')

  return titles[
    number % 100 > 4 && number % 100 < 20
      ? 2
      : cases[number % 10 < 5 ? number % 10 : 5]
  ]
}
