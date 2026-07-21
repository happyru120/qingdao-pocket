export type VerificationState = 'verified' | 'likely' | 'needs-check';

export type PlaceCategory =
  | 'shandong'
  | 'seafood'
  | 'dumpling'
  | 'barbecue'
  | 'hotpot'
  | 'rice-noodle'
  | 'cafe'
  | 'market'
  | 'attraction'
  | 'shopping';

export type Place = {
  id: string;
  nameKo: string;
  nameZh: string;
  branch?: string;
  district: string;
  category: PlaceCategory;
  categoryLabel: string;
  tags: string[];
  image: string;
  summary: string;
  openLabel: string;
  hours?: {
    open: string;
    close: string;
    overnight?: boolean;
  };
  priceLabel: string;
  stayLabel: string;
  hotelTravelLabel: string;
  amapKeyword: string;
  verification: VerificationState;
  verifiedAt?: string;
  recommendationGrounds: string[];
  mustOrder?: Array<{
    nameKo: string;
    nameZh?: string;
    note: string;
  }>;
  orderForTwo?: string[];
  tips: string[];
  warnings?: string[];
  deliveryCandidate?: boolean;
  walkingLoad: 'low' | 'medium' | 'high';
  sourceNote?: string;
};

export type PhraseCategory = 'restaurant' | 'taxi' | 'shopping' | 'hotel' | 'payment' | 'emergency';

export type Phrase = {
  id: string;
  category: PhraseCategory;
  categoryLabel: string;
  korean: string;
  chinese: string;
  pinyin: string;
  aliases: string[];
  essential?: boolean;
};

export type ShoppingItem = {
  id: string;
  nameKo: string;
  nameZh: string;
  image: string;
  note: string;
  where: string[];
  storage: string;
  bringHome: 'good' | 'caution' | 'no';
  quantityTip: string;
};

export type ItineraryStop = {
  time: string;
  placeId?: string;
  title: string;
  note: string;
  travel?: string;
};

export type ItineraryDay = {
  day: number;
  date: string;
  title: string;
  pace: '여유' | '보통' | '걷기 적음';
  stops: ItineraryStop[];
};
