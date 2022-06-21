export type User = {
  id: number;
  firstName?: string;
  lastName?: string;
  name?: string;
  email: string;
  locale: string;
  provider: string;
  emailNotification: boolean;
  pushNotification: boolean;
  authority: string;
  destination: string;
};
