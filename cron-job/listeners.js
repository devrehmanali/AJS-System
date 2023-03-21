const signupListener = require('./listeners/signup-listener');
const resetPasswordOTPListener = require('./listeners/reset-password-otp-listener');
const resetPasswordListener = require('./listeners/reset-password-listener');
const updatePasswordListener = require('./listeners/update-password-listener');
const trueSelfIncompleteListener = require('./listeners/true-self-incomplete-listener');
const trueSelfCompleteListener = require('./listeners/true-self-complete-listener');
const personalInformationListener = require('./listeners/personal-information-listener');
const publicationsListener = require('./listeners/publications-listener');

async function listener() {
  await signupListener();
  await resetPasswordOTPListener();
  await resetPasswordListener();
  await updatePasswordListener();
  await trueSelfIncompleteListener();
  await trueSelfCompleteListener();
  await personalInformationListener();
  await publicationsListener();
}

listener();
