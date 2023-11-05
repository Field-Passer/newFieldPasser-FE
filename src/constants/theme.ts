const deviceSizes = {
  mobile: 450,
  tablet: 834,
  laptop: 1440,
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
