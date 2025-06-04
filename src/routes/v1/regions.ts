import express from 'express';
import {
  getCountries,
  getStatesByCountry,
  getCitiesByState,
} from '../../controllers/regionsContoller';

const router = express.Router();

// Get all countries
router.get('/', getCountries);

// Get states by country_id
router.get('/states', getStatesByCountry);

// Get cities by state_id
router.get('/cities', getCitiesByState);

export default router;
