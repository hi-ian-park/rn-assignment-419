import type {
  CompositeNavigationProp,
  RouteProp,
} from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';

export type RootStackParamList = {
  '/': undefined;
  '/auth': undefined;
};

export type AuthStackParamList = {
  '/auth/onboard': undefined;
  '/auth/login-signup': undefined;
  '/auth/signup': { name: string | undefined; email: string };
  '/auth/login': { name: string; email: string };
  '/auth/enter-full-name': { name: string; email: string; password: string };
  '/auth/send-verification': { accessToken: string; email: string };
};

export type MainTabParamList = {
  '/home': undefined;
  '/search': undefined;
  '/account': undefined;
};

export type OnboardScreenNavigationProp = CompositeNavigationProp<
  NativeStackNavigationProp<RootStackParamList, '/'>,
  NativeStackNavigationProp<AuthStackParamList, '/auth/login-signup'>
>;

export type LoginSignupScreenNavigationProp = NativeStackNavigationProp<
  AuthStackParamList,
  '/auth/login-signup'
>;

export type SignUpScreenProps = NativeStackNavigationProp<
  AuthStackParamList,
  '/auth/signup'
>;

export type LoginScreenProps = NativeStackNavigationProp<
  AuthStackParamList,
  '/auth/login'
>;

export type AccountScreenProps = NativeStackNavigationProp<RootStackParamList>;
