import type { CompositeNavigationProp } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';

export type AuthStackParamList = {
  '/auth/onboard': undefined;
  '/auth/login-signup': undefined;
  '/auth/signup': { name: string | undefined; email: string };
  '/auth/login': { name: string; email: string };
  '/auth/enter-full-name': { name: string; email: string; password: string };
  '/auth/send-verification': { email: string; name: string };
};

export type MainTabParamList = {
  '/home': { email: string; name: string } | undefined;
  '/search': undefined;
  '/account': undefined;
};

export type RootStackParamList = {
  '/': { screen?: keyof MainTabParamList } | undefined;
  '/auth': { screen?: keyof AuthStackParamList } | undefined;
};

export type OnboardScreenNavigationProp = CompositeNavigationProp<
  NativeStackNavigationProp<RootStackParamList, '/'>,
  NativeStackNavigationProp<AuthStackParamList, '/auth/login-signup'>
>;

export type LoginSignupScreenProp = NativeStackScreenProp<
  AuthStackParamList,
  '/auth/login-signup'
>;

export type SignUpScreenProps = NativeStackScreenProp<
  AuthStackParamList,
  '/auth/signup'
>;

export type LoginScreenNavigationProps = CompositeNavigationProp<
  NativeStackNavigationProp<RootStackParamList>,
  NativeStackNavigationProp<
    AuthStackParamList,
    '/auth/send-verification'
  >['navigation']
>;

export type EnterFullNameScreenProps =
  NativeStackScreenProps<AuthStackParamList>['navigation'];

export type AccountScreenProps = NativeStackNavigationProp<RootStackParamList>;
