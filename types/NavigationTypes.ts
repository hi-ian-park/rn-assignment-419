import type {
  CompositeNavigationProp,
  RouteProp,
} from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';

type NavigationParams = object;

export type RootStackParamList = {
  '/': undefined;
  '/auth': undefined;
};

export type AuthStackParamList = {
  '/auth/onboard': undefined;
  '/auth/login-signup': undefined;
  '/auth/signup': undefined;
  '/auth/login': undefined;
  '/auth/enter-full-name': undefined;
  '/auth/send-verification': undefined;
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

export type LoginSignupScreenNavigationProp = CompositeNavigationProp<
  NativeStackNavigationProp<AuthStackParamList, '/auth/signup'>,
  NativeStackNavigationProp<AuthStackParamList, '/auth/login'>
>;
