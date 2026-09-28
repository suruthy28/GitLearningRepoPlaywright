module.exports = {
  default: {
    requireModule: ['dotenv/config'],
    require: ['support/hooks.js', 'features/step-definitions/**/*.js'],
     format: [
      'progress',
      'allure-cucumberjs/reporter'
    ],
    formatOptions: {
      resultsDir: 'allure-results'
    },
    
    publish: true,
  },
};