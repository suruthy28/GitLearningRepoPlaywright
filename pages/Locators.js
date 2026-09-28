class Locators {
  // Login Page
  static loginPage = {
    usernameInput: '[type="email"]',
    login:'#Login',
    passwordInput: '[name="pw"]',
    loginButton: 'form>input',
    errorMessage: '.error-message',
    successMessage: '.success-message',
    forgotPasswordLink: 'a[href="/forgot-password"]',
    rememberMeCheckbox: '#remember-me',
  };

  // Dashboard Page
  static dashboard = {
    welcomeMessage: '.welcome-message',
    logoutButton: '#logout-btn',
    profileMenu: '#profile-menu',
    settingsLink: 'a[href="/settings"]',
    notificationsIcon: '.notifications-icon',
  };

  // Registration Page
  static registration = {
    firstNameInput: '#first-name',
    lastNameInput: '#last-name',
    emailInput: '#email',
    passwordInput: '#password',
    confirmPasswordInput: '#confirm-password',
    registerButton: '#register-btn',
    termsCheckbox: '#terms-checkbox',
  };

  // Common Elements
  static common = {
    header: 'header',
    footer: 'footer',
    navigationMenu: '.nav-menu',
    searchInput: '#search',
    loadingSpinner: '.loading-spinner',
  };
}

module.exports = Locators;