export type AuthUser = {
  _id: string
  accountStatus: any
  avatar: string
  birthday: string
  createdAt: string
  email: string
  fcmConfig: any
  fcmTokens: any
  firstName: string
  forgotPasswordCode: string
  isActive: boolean
  isAdmin: boolean
  isOwner: boolean
  lastLoginAt: string
  lastName: string
  organization: any
  password: string
  phone: any
  phoneAuth: any
  preferredLanguage: "vi" | 'en'
  removeStatus: any
  role: any
  stationAutos: any
  twoFactorAuth: any
  updatedAt: number
};

export type UserResponse = {
  data: AuthUser
  success?: boolean
  token: string
  error?: boolean
  message?: string
};

export type LoginValues = {
  email: string;
  password: string;
};
