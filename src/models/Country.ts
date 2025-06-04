import mongoose from 'mongoose';

interface ITimezone {
  zoneName: string;
  gmtOffset: number;
  gmtOffsetName: string;
  abbreviation: string;
  tzName: string;
}

interface ITranslations {
  ko?: string;
  'pt-BR'?: string;
  pt?: string;
  nl?: string;
  hr?: string;
  fa?: string;
  de?: string;
  es?: string;
  fr?: string;
  ja?: string;
  it?: string;
  'zh-CN'?: string;
  tr?: string;
  ru?: string;
  uk?: string;
  pl?: string;
}

interface ICountry {
  id: number;
  name: string;
  iso3: string;
  iso2: string;
  numeric_code: string;
  phonecode: string;
  capital: string;
  currency: string;
  currency_name: string;
  currency_symbol: string;
  tld: string;
  native: string;
  region: string;
  region_id: number;
  subregion: string;
  subregion_id: number;
  nationality: string;
  timezones: ITimezone[];
  translations: ITranslations;
  latitude: string;
  longitude: string;
  emoji: string;
  emojiU: string;
}

const timezoneSchema = new mongoose.Schema<ITimezone>(
  {
    zoneName: String,
    gmtOffset: Number,
    gmtOffsetName: String,
    abbreviation: String,
    tzName: String,
  },
  { _id: false }
);

const countrySchema = new mongoose.Schema<ICountry>({
  id: { type: Number, required: true, unique: true },
  name: { type: String, required: true },
  iso3: { type: String, required: true },
  iso2: { type: String, required: true },
  numeric_code: { type: String },
  phonecode: { type: String },
  capital: { type: String },
  currency: { type: String },
  currency_name: { type: String },
  currency_symbol: { type: String },
  tld: { type: String },
  native: { type: String },
  region: { type: String },
  region_id: { type: Number },
  subregion: { type: String },
  subregion_id: { type: Number },
  nationality: { type: String },
  timezones: [timezoneSchema],
  translations: { type: mongoose.Schema.Types.Mixed },
  latitude: { type: String },
  longitude: { type: String },
  emoji: { type: String },
  emojiU: { type: String },
});

const Country = mongoose.model<ICountry>('Country', countrySchema);
export default Country;
