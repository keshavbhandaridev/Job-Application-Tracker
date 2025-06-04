#!/usr/bin/env node

// This script seeds the database with country, state, and city data
import mongoose from 'mongoose';
import fs from 'fs';
import path from 'path';
import connectDB from '../config/db';
import Country from '../src/models/Country';
import State from '../src/models/State';
import City from '../src/models/City';

async function seedRegionData(): Promise<void> {
  try {
    // Connect to MongoDB
    await connectDB();
    console.info('Connected to MongoDB');

    // Check if data already exists
    const existingCountriesCount = await Country.countDocuments();
    const existingStatesCount = await State.countDocuments();
    const existingCitiesCount = await City.countDocuments();

    if (existingCountriesCount > 0 || existingStatesCount > 0 || existingCitiesCount > 0) {
      console.info(
        `Found existing data in the database: ${existingCountriesCount} countries, ${existingStatesCount} states, ${existingCitiesCount} cities`
      );
      console.info('To reseed, please drop the collections first.');
      process.exit(0);
    }

    // Read countries.json file
    let countries;
    try {
      const countriesFilePath = path.join(__dirname, '../config/regions/countries.json');
      const countriesData = fs.readFileSync(countriesFilePath, 'utf8');
      countries = JSON.parse(countriesData);
    } catch (fileError) {
      console.error('Error reading countries.json file:', fileError);
      process.exit(1);
    }

    console.info(`Seeding ${countries.length} countries...`);

    // Insert countries in batches to avoid potential memory issues with large datasets
    const batchSize = 50;
    for (let i = 0; i < countries.length; i += batchSize) {
      const batch = countries.slice(i, i + batchSize);
      await Country.insertMany(batch);
      console.info(`Seeded countries ${i + 1} to ${Math.min(i + batchSize, countries.length)}`);
    }

    console.info('Countries successfully seeded!');

    // Now seed states
    console.info('Seeding states...');
    try {
      const statesFilePath = path.join(__dirname, '../config/regions/states.json');
      const statesData = fs.readFileSync(statesFilePath, 'utf8');
      const states = JSON.parse(statesData);

      console.info(`Seeding ${states.length} states...`);

      for (let i = 0; i < states.length; i += batchSize) {
        const batch = states.slice(i, i + batchSize);
        await State.insertMany(batch);
        console.info(`Seeded states ${i + 1} to ${Math.min(i + batchSize, states.length)}`);
      }

      console.info('States successfully seeded!');
    } catch (stateError) {
      console.error('Error seeding states:', stateError);
    }

    // Seeding cities is optional since the file is very large
    console.info('Attempting to seed cities (this might take a while due to file size)...');
    try {
      const citiesFilePath = path.join(__dirname, '../config/regions/cities.json');
      if (fs.existsSync(citiesFilePath)) {
        const citiesData = fs.readFileSync(citiesFilePath, 'utf8');
        const cities = JSON.parse(citiesData);

        console.info(`Seeding ${cities.length} cities...`);

        for (let i = 0; i < cities.length; i += batchSize) {
          const batch = cities.slice(i, i + batchSize);
          await City.insertMany(batch);
          console.info(`Seeded cities ${i + 1} to ${Math.min(i + batchSize, cities.length)}`);
        }

        console.info('Cities successfully seeded!');
      } else {
        console.info('Cities file not found. Skipping city seeding.');
      }
    } catch (cityError) {
      console.error('Error seeding cities:', cityError);
      console.info('Continuing without seeding cities. You can seed cities separately if needed.');
    }

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
