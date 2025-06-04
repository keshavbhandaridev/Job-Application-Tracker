import mongoose from 'mongoose';

interface ICity {
  id: number;
  name: string;
  state_id: number;
  state_code: string;
  state_name: string;
  country_id: number;
  country_code: string;
  country_name: string;
  latitude: string;
  longitude: string;
  wikiDataId?: string;
}

const citySchema = new mongoose.Schema<ICity>({
  id: { type: Number, required: true, unique: true },
  name: { type: String, required: true },
  state_id: { type: Number, required: true },
  state_code: { type: String },
  state_name: { type: String, required: true },
  country_id: { type: Number, required: true },
  country_code: { type: String },
  country_name: { type: String, required: true },
  latitude: { type: String },
  longitude: { type: String },
  wikiDataId: { type: String },
});

// Create indices for faster queries
citySchema.index({ state_id: 1 });
citySchema.index({ country_id: 1 });

const City = mongoose.model<ICity>('City', citySchema);
export default City;
