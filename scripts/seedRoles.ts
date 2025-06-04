#!/usr/bin/env node

// This script seeds the database with job roles data
import mongoose from 'mongoose';
import connectDB from '../config/db';
import Role from '../src/models/Role';
import path from 'path';
import fs from 'fs';

// Constants
const BATCH_SIZE = 50;

/**
 * Checks if there is existing role data in the database
 * @returns {Promise<boolean>} True if data exists, false otherwise
 */
async function checkExistingData(): Promise<boolean> {
  const existingRolesCount = await Role.countDocuments();

  if (existingRolesCount > 0) {
    console.info(`Found ${existingRolesCount} existing roles in the database`);
    console.info('To reseed, please drop the roles collection first.');
    return true;
  }
  return false;
}

/**
 * Reads and parses job roles from a JSON file
 * @param {string} filePath - Path to the JSON file containing job roles
 * @returns {Promise<string[]>} Array of job role names
 */
async function readRolesData(filePath: string): Promise<string[]> {
  try {
    const data = fs.readFileSync(filePath, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    console.error('Error reading roles file:', error);
    throw error;
  }
}

/**
 * Seeds job roles into the database in batches
 * @param {string[]} roleNames - Array of job role names
 */
async function seedRolesInBatches(roleNames: string[]): Promise<void> {
  console.info(`Seeding ${roleNames.length} job roles...`);

  // Prepare role objects
  const roles = roleNames.map(name => ({ name }));

  // Insert in batches
  for (let i = 0; i < roles.length; i += BATCH_SIZE) {
    const batch = roles.slice(i, i + BATCH_SIZE);
    await Role.insertMany(batch);
    console.info(`Seeded roles ${i + 1} to ${Math.min(i + BATCH_SIZE, roles.length)}`);
  }

  console.info('Job roles successfully seeded!');
}

/**
 * Main function to seed job role data
 */
async function seedRoleData(): Promise<void> {
  try {
    // Connect to MongoDB
    await connectDB();
    console.info('Connected to MongoDB');

    // Check if data already exists
    const dataExists = await checkExistingData();
    if (dataExists) {
      process.exit(0);
    }

    // Read roles from the roles JSON file
    const rolesFilePath = path.join(__dirname, '../config/roles.json');

    try {
      // Check if the roles file exists
      if (fs.existsSync(rolesFilePath)) {
        const roleNames = await readRolesData(rolesFilePath);
        await seedRolesInBatches(roleNames);
      } else {
        // If no file exists, use the hard-coded list from jobRoles.ts
        // Import directly from the file to avoid circular dependency
        const { jobRoles } = require('../config/rolesList');
        await seedRolesInBatches(jobRoles);
      }
    } catch (error) {
      console.error('Error seeding roles:', error);
      process.exit(1);
    }

    console.info('Role data seeding complete!');
    process.exit(0);
  } catch (error) {
    console.error('Error in seed role data process:', error);
    process.exit(1);
  } finally {
    await mongoose.connection.close();
  }
}

// Execute the seed function
seedRoleData();
