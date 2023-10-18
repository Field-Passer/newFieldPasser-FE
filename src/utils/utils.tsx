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
  const badminton = ['badminton0.png', 'badminton1.png', 'badminton2.png']
  const basketball = ['basketball0.png', 'basketball1.png', 'basketball2.png']
  const soccer = ['soccer0.png', 'soccer1.png', 'soccer2.png']
  const tennis = ['tennis0.png', 'tennis1.png', 'tennis2.png']
  const futsal = ['futsal0.png', 'futsal1.png', 'futsal2.png']

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
