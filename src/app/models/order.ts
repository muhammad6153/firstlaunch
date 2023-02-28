export interface Order {
  service: string;
  plan: string;
  name: string;
  dateOfBirth: string;
  age: number;
  phoneNumber: string;
  nationality: string;
  email: string;
  address: string;
  cityOrZipcode: string;
  background: string;
  twitter: string;
  youtube: string;
  instagram: string;
  tiktok: string;
  snapchat: string;
  facebook: string;
  experienceAndTrials: string;
  resume: string;
  picture: string;
  interestsAndCategory: {
    filmAndTVActing: boolean;
    commercialsActing: boolean;
    drama: boolean;
    theatreActing: boolean;
    extraBackgroundActing: boolean;
    comedy: boolean;
    voiceOverActing: boolean;
    classic: boolean;
    others: boolean;
  };
  interestsAndField: string;
  instrumentsPlayed: string;
  howLongInstrumentsPlayed: string;
  dimensions: {
    gender: string;
    height: string;
    weight: string;
    bustChest: string;
    waist: string;
    inseamOutseam: string;
    dressOrSuitSize: string;
    pantsSize: string;
    shoeSize: string;
  };
  voiceClassification: {
    range: number;
    toneQuality: number;
    intonation: number;
    sightSinging: number;
    melodyMemorization: number;
    confidence: number;
    overallRating: number;
  };
  writingInterestsAndCategory: {
    poetry: boolean;
    drama: boolean;
    scienceFiction: boolean;
    songLyrics: boolean;
    mystery: boolean;
    nonfiction: boolean;
    fantasy: boolean;
    biography: boolean;
    fiction: boolean;
  };
}
