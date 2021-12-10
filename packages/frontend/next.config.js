const removeImports = require('next-remove-imports')()

module.exports = (phase, { defaultConfig }) => {
  return removeImports({
    ...defaultConfig,

    typescript: {
      ignoreBuildErrors: true,
    },
    eslint: {
      ignoreDuringBuilds: true,
    },
  })
}
