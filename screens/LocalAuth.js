import * as LocalAuthentication from 'expo-local-authentication';

// Setting device for biometic authentication
const LocalAuth = async () => {
  // Checking if device supports biometric
  const compatible = await LocalAuthentication.hasHardwareAsync();
  console.log('compatible', compatible);

  // Authentication logic
  if (compatible) {
    const result = await LocalAuthentication.authenticateAsync({
      promptMessage: 'Authenticate using biometric password',
    })
    console.log(result);
  }
};

export default LocalAuth;
