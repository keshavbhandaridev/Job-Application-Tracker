import mongoose from 'mongoose';

interface IState {
  id: number;
  name: string;
  country_id: number;
  country_code: string;
  country_name: string;
  state_code: string;
  type: string;
  latitude: string;
  longitude: string;
}

const stateSchema = new mongoose.Schema<IState>({
  id: { type: Number, required: true, unique: true },
  name: { type: String, required: true },
  country_id: { type: Number, required: true },
  country_code: { type: String, required: true },
  country_name: { type: String, required: true },
  state_code: { type: String },
  type: { type: String },
  latitude: { type: String },
  longitude: { type: String },
});

// Create index on country_id for faster queries
stateSchema.index({ country_id: 1 });

const State = mongoose.model<IState>('State', stateSchema);
export default State;
