const deviceSizes = {
  mobile: 833,
  laptop: 1440,
}

const device = {
  mobile: `screen and (max-width: ${deviceSizes.mobile}px)`,
  laptop: `screen and (max-width: ${deviceSizes.laptop}px)`,
}

const theme = {
  device,
}

export default theme
