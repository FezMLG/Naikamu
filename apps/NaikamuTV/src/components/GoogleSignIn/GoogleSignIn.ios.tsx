// @react-native-google-signin/google-signin has no tvOS support, so its native module
// is not linked on Apple TV and importing it would throw.
export function GoogleSignIn() {
  return null;
}
