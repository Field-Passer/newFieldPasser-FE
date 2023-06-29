const deviceSizes = {
  mobile: 375,
  tablet: 768,
  laptop: 1024,
}

const device = {
  mobile: `screen and (max-width: ${deviceSizes.mobile}px)`,
  tablet: `screen and (max-width: ${deviceSizes.tablet}px)`,
  laptop: `screen and (max-width: ${deviceSizes.laptop}px)`,
}

const theme = {
  device,
}

export default theme
