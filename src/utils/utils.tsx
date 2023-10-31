export const dateFormat = (dateVal: string, type?: string) => {
  const nowDate = new Date(dateVal)
  const month = nowDate.getMonth()
  const date = nowDate.getDate()
  const hours = nowDate.getHours() < 10 ? `0${nowDate.getHours()}` : nowDate.getHours()
  const minutes = nowDate.getMinutes() < 10 ? `0${nowDate.getMinutes()}` : nowDate.getMinutes()

  if (type === 'comment' && nowDate.getDate() === new Date().getDate()) return `${hours}:${minutes}`
  else if (type === 'comment') return `${month + 1}.${date} ${hours}:${minutes}`

  return `${month + 1}월 ${date}일 ${hours}:${minutes}`
}

export const randomImages = (category: string, imgNum: number) => {
  const randomNum = imgNum % 3
  const publicPath = import.meta.env.BASE_URL
  const badminton = ['badminton0.webp', 'badminton1.webp', 'badminton2.webp']
  const basketball = ['basketball0.webp', 'basketball1.webp', 'basketball2.webp']
  const soccer = ['soccer0.webp', 'soccer1.webp', 'soccer2.webp']
  const tennis = ['tennis0.webp', 'tennis1.webp', 'tennis2.webp']
  const futsal = ['futsal0.webp', 'futsal1.webp', 'futsal2.webp']

  type Category = {
    배드민턴장: string
    농구장: string
    축구장: string
    테니스장: string
    풋살장: string
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    [prop: string]: any
  }

  const categoryId: Category = {
    배드민턴장: badminton[randomNum],
    농구장: basketball[randomNum],
    축구장: soccer[randomNum],
    테니스장: tennis[randomNum],
    풋살장: futsal[randomNum],
  }

  return publicPath + categoryId[category]
}

export const handleImgError = (e: React.SyntheticEvent<HTMLImageElement, Event>, category: string, imgNum: number) => {
  e.currentTarget.src = randomImages(category, imgNum)
}
