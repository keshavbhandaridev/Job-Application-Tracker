import { Request, Response } from 'express';
import Country from '../models/Country';
import State from '../models/State';
import City from '../models/City';

// Get all countries
export const getCountries = async (req: Request, res: Response): Promise<void> => {
  try {
    const countries = await Country.find().select('id name iso2 iso3 phonecode').sort('name');

    res.status(200).json({ success: true, count: countries.length, data: countries });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
    res.status(500).json({ success: false, error: errorMessage });
  }
};

// Get states by country_id
export const getStatesByCountry = async (req: Request, res: Response): Promise<void> => {
  try {
    const countryId = req.query.country_id as string;

    if (!countryId) {
      res.status(400).json({ success: false, error: 'country_id is required' });
      return;
    }

    const countryIdNum = parseInt(countryId);
    if (isNaN(countryIdNum)) {
      res.status(400).json({ success: false, error: 'country_id must be a valid number' });
      return;
    }

    const states = await State.find({ country_id: countryIdNum })
      .select('id name state_code type')
      .sort('name');

    res.status(200).json({ success: true, count: states.length, data: states });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
    res.status(500).json({ success: false, error: errorMessage });
  }
};

// Get cities by state_id
export const getCitiesByState = async (req: Request, res: Response): Promise<void> => {
  try {
    const stateId = req.query.state_id as string;

    if (!stateId) {
      res.status(400).json({ success: false, error: 'state_id is required' });
      return;
    }

    const stateIdNum = parseInt(stateId);
    if (isNaN(stateIdNum)) {
      res.status(400).json({ success: false, error: 'state_id must be a valid number' });
      return;
    }

    const cities = await City.find({ state_id: stateIdNum })
      .select('id name latitude longitude')
      .sort('name');

    res.status(200).json({ success: true, count: cities.length, data: cities });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
    res.status(500).json({ success: false, error: errorMessage });
  }
};
