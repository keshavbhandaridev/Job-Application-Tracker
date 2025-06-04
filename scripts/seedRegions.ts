#!/usr/bin/env node

// This script seeds the database with country, state, and city data
import mongoose from 'mongoose';
import fs from 'fs';
import path from 'path';
import connectDB from '../config/db';
import Country from '../src/models/Country';
import State from '../src/models/State';
import City from '../src/models/City';

// Constants
const BATCH_SIZE = 50;

/**
 * Checks if there is existing data in the database
 * @returns {Promise<boolean>} True if data exists, false otherwise
 */
async function checkExistingData(): Promise<boolean> {
  const existingCountriesCount = await Country.countDocuments();
  const existingStatesCount = await State.countDocuments();
  const existingCitiesCount = await City.countDocuments();

  if (existingCountriesCount > 0 || existingStatesCount > 0 || existingCitiesCount > 0) {
    console.info(
      `Found existing data in the database: ${existingCountriesCount} countries, ${existingStatesCount} states, ${existingCitiesCount} cities`
    );
    console.info('To reseed, please drop the collections first.');
    return true;
  }
  return false;
}

/**
 * Reads and parses a JSON file
 * @param {string} filePath - Path to the JSON file
 * @param {string} entityName - Name of the entity being read (for logging)
 * @returns {Promise<unknown[]>} Parsed JSON data
 */
async function readJsonFile(filePath: string, entityName: string): Promise<unknown[]> {
  try {
    const data = fs.readFileSync(filePath, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    console.error(`Error reading ${entityName} file:`, error);
    throw error;
  }
}

/**
 * Seeds data into a collection in batches
 * @param {any[]} data - Data to seed
 * @param {mongoose.Model<any>} Model - Mongoose model
 * @param {string} entityName - Name of the entity being seeded (for logging)
 */
async function seedInBatches(
  data: unknown[],
  Model: mongoose.Model<any>,
  entityName: string
): Promise<void> {
  console.info(`Seeding ${data.length} ${entityName}...`);

  for (let i = 0; i < data.length; i += BATCH_SIZE) {
    const batch = data.slice(i, i + BATCH_SIZE);
    await Model.insertMany(batch);
    console.info(`Seeded ${entityName} ${i + 1} to ${Math.min(i + BATCH_SIZE, data.length)}`);
  }

  console.info(`${entityName} successfully seeded!`);
}

/**
 * Seeds country data
 */
async function seedCountries(): Promise<void> {
  try {
    const countriesFilePath = path.join(__dirname, '../config/regions/countries.json');
    const countries = await readJsonFile(countriesFilePath, 'countries');
    await seedInBatches(countries, Country, 'countries');
  } catch (error) {
    console.error('Failed to seed countries:', error);
    throw error;
  }
}

/**
 * Seeds state data
 */
async function seedStates(): Promise<void> {
  try {
    const statesFilePath = path.join(__dirname, '../config/regions/states.json');
    const states = await readJsonFile(statesFilePath, 'states');
    await seedInBatches(states, State, 'states');
  } catch (error) {
    console.error('Failed to seed states:', error);
    // We don't throw here to allow the process to continue to cities
    console.info('Continuing without seeding states. You can seed states separately if needed.');
  }
}

/**
 * Seeds city data
 */
async function seedCities(): Promise<void> {
  try {
    const citiesFilePath = path.join(__dirname, '../config/regions/cities.json');

    if (fs.existsSync(citiesFilePath)) {
      const cities = await readJsonFile(citiesFilePath, 'cities');
      await seedInBatches(cities, City, 'cities');
    } else {
      console.info('Cities file not found. Skipping city seeding.');
    }
  } catch (error) {
    console.error('Failed to seed cities:', error);
    console.info('Continuing without seeding cities. You can seed cities separately if needed.');
  }
}

/**
 * Main function to seed region data
 */
async function seedRegionData(): Promise<void> {
  try {
    // Connect to MongoDB
    await connectDB();
    console.info('Connected to MongoDB');

    // Check if data already exists
    const dataExists = await checkExistingData();
    if (dataExists) {
      process.exit(0);
    }

    // Seed countries, states, and cities
    await seedCountries();
    await seedStates();
    await seedCities();

    console.info('All region data seeding complete!');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding regions data:', error);
    process.exit(1);
  } finally {
    await mongoose.connection.close();
  }
}

// Execute the seed function
seedRegionData();
