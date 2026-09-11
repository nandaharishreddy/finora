export type UserProfile = {
  name: string;
  email: string;
};

export type UserPreferences = {
  notifications: boolean;
  marketingEmails: boolean;
  biometricLogin: boolean;
};

export type CardSettings = {
  contactless: boolean;
  onlinePayments: boolean;
  internationalPayments: boolean;
  dailyLimit: number;
};

const PROFILE_KEY = "finora-profile";
const PREFERENCES_KEY = "finora-preferences";
const CARD_SETTINGS_KEY = "finora-card-settings";
const AUTH_KEY = "finora-auth";

const DEFAULT_PROFILE: UserProfile = {
  name: "Harish",
  email: "harish@example.com",
};

const DEFAULT_PREFERENCES: UserPreferences = {
  notifications: true,
  marketingEmails: false,
  biometricLogin: false,
};

const DEFAULT_CARD_SETTINGS: CardSettings = {
  contactless: true,
  onlinePayments: true,
  internationalPayments: false,
  dailyLimit: 50000,
};

export function getProfile(): UserProfile {
  try {
    const saved = localStorage.getItem(PROFILE_KEY);

    if (saved) {
      return JSON.parse(saved) as UserProfile;
    }
  } catch (error) {
    console.error("Unable to load Finora profile:", error);
  }

  return DEFAULT_PROFILE;
}

export function saveProfile(profile: UserProfile) {
  localStorage.setItem(PROFILE_KEY, JSON.stringify(profile));
}

export function getPreferences(): UserPreferences {
  try {
    const saved = localStorage.getItem(PREFERENCES_KEY);

    if (saved) {
      return {
        ...DEFAULT_PREFERENCES,
        ...(JSON.parse(saved) as Partial<UserPreferences>),
      };
    }
  } catch (error) {
    console.error("Unable to load Finora preferences:", error);
  }

  return DEFAULT_PREFERENCES;
}

export function savePreferences(preferences: UserPreferences) {
  localStorage.setItem(
    PREFERENCES_KEY,
    JSON.stringify(preferences)
  );
}

export function getCardSettings(): CardSettings {
  try {
    const saved = localStorage.getItem(CARD_SETTINGS_KEY);

    if (saved) {
      return {
        ...DEFAULT_CARD_SETTINGS,
        ...(JSON.parse(saved) as Partial<CardSettings>),
      };
    }
  } catch (error) {
    console.error("Unable to load Finora card settings:", error);
  }

  return DEFAULT_CARD_SETTINGS;
}

export function saveCardSettings(settings: CardSettings) {
  localStorage.setItem(
    CARD_SETTINGS_KEY,
    JSON.stringify(settings)
  );
}

export function isAuthenticated(): boolean {
  return localStorage.getItem(AUTH_KEY) === "true";
}

export function login() {
  localStorage.setItem(AUTH_KEY, "true");
}

export function logout() {
  localStorage.removeItem(AUTH_KEY);
}

export function createAccount(profile: UserProfile) {
  saveProfile(profile);
  login();
}