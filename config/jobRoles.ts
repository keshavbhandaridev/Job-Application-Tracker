import mongoose from 'mongoose';
import Role from '../src/models/Role';
import config from './config';

const jobRoles = [
  'Frontend Developer',
  'Backend Developer',
  'Full Stack Developer',
  'Software Engineer',
  'Mobile Developer',
  'Web Developer',
  'DevOps Engineer',
  'QA Engineer',
  'Manual Tester',
  'Automation Tester',
  'Data Scientist',
  'Data Analyst',
  'Machine Learning Engineer',
  'AI Engineer',
  'Cloud Engineer',
  'Database Administrator',
  'Network Engineer',
  'Cybersecurity Analyst',
  'SRE',
  'Blockchain Developer',
  'Embedded Systems Engineer',
  'Game Developer',
  'IT Support Specialist',
  'Solutions Architect',
  'Systems Analyst',
  'Technical Support Engineer',
  'Technical Writer',

  'UI/UX Designer',
  'Product Designer',
  'Visual Designer',
  'Graphic Designer',
  'Motion Graphics Designer',
  'Animator',
  '3D Artist',
  'Illustrator',
  'UX Researcher',
  'Creative Director',
  'Art Director',
  'Video Editor',
  'Photographer',
  'Brand Designer',

  'Product Manager',
  'Technical Product Manager',
  'Project Manager',
  'Program Manager',
  'Scrum Master',
  'Agile Coach',
  'Business Analyst',

  'Digital Marketing Manager',
  'Performance Marketer',
  'SEO Specialist',
  'Content Marketer',
  'Social Media Manager',
  'Marketing Manager',
  'Brand Manager',
  'Growth Manager',
  'Email Marketing Specialist',
  'Influencer Marketing Manager',
  'Sales Executive',
  'Account Executive',
  'Business Development Executive',
  'Sales Manager',
  'Customer Success Manager',
  'CRM Specialist',
  'Telecaller',

  'Operations Manager',
  'Strategy Consultant',
  'Entrepreneur in Residence',
  'Supply Chain Analyst',
  'Procurement Manager',
  'Vendor Manager',
  'Logistics Coordinator',
  'Administrative Assistant',
  'Executive Assistant',
  'Office Manager',

  'Finance Analyst',
  'Accountant',
  'Chartered Accountant',
  'Investment Banker',
  'Tax Consultant',
  'Risk Analyst',
  'Financial Advisor',
  'Internal Auditor',
  'Compliance Officer',
  'Legal Associate',
  'Paralegal',
  'Company Secretary',

  'Doctor',
  'Surgeon',
  'Nurse',
  'Pharmacist',
  'Medical Laboratory Technician',
  'Physiotherapist',
  'Psychologist',
  'Radiologist',
  'Dentist',
  'Veterinary Doctor',
  'Healthcare Administrator',
  'Clinical Research Associate',

  'Teacher',
  'Professor',
  'Subject Matter Expert',
  'Instructional Designer',
  'Academic Counselor',
  'Education Consultant',
  'E-learning Specialist',
  'Principal',

  'Mechanical Engineer',
  'Electrical Engineer',
  'Civil Engineer',
  'Structural Engineer',
  'Chemical Engineer',
  'Industrial Engineer',
  'Biomedical Engineer',
  'Quality Assurance Engineer',
  'CAD Designer',
  'Maintenance Engineer',

  'Research Scientist',
  'Lab Technician',
  'Biochemist',
  'Physicist',
  'Environmental Scientist',
  'Chemist',
  'Geologist',

  'Hotel Manager',
  'Chef',
  'Bartender',
  'Travel Agent',
  'Tour Guide',
  'Front Desk Executive',
  'Event Planner',
  'Flight Attendant',
  'Concierge',

  'Journalist',
  'Editor',
  'News Anchor',
  'Radio Jockey',
  'Content Writer',
  'Blogger',
  'Copywriter',
  'Script Writer',
  'Actor',
  'Musician',
  'Public Relations Manager',

  'Retail Store Manager',
  'Cashier',
  'Sales Associate',
  'Visual Merchandiser',
  'Inventory Manager',
  'Customer Care Executive',
  'Call Center Agent',

  'Delivery Executive',
  'Logistics Manager',
  'Fleet Manager',
  'Warehouse Associate',
  'Transport Coordinator',
  'Supply Chain Manager',

  'Electrician',
  'Plumber',
  'Welder',
  'Carpenter',
  'Mechanic',
  'Machine Operator',
  'Technician',
  'Construction Worker',

  'Agricultural Scientist',
  'Agronomist',
  'Farm Manager',
  'Environmental Consultant',
  'Wildlife Biologist',
  'Forestry Officer',

  'Civil Servant',
  'Police Officer',
  'Firefighter',
  'Army Personnel',
  'Navy Officer',
  'Air Force Officer',
  'Government Clerk',
  'Intelligence Officer',

  'Freelancer',
  'Virtual Assistant',
  'Online Tutor',
  'Translator',
  'Voice-over Artist',
  'Freelancer Designer',
  'Independent Consultant',
];

/**
 * Seeds job roles into the database if they don't already exist
 * This function connects to the database, checks if roles exist,
 * and adds them if the collection is empty
 */
export const seedRoles = async (): Promise<void> => {
  try {
    await mongoose.connect(config.mongoUri);
    const existing = await Role.find();
    console.info(`Found ${existing.length} existing roles`);

    if (existing.length === 0) {
      await Role.insertMany(jobRoles.map(name => ({ name })));
      console.info('✅ Roles seeded successfully');
    } else {
      console.info('ℹ️ Roles already exist');
    }
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
    console.error(`❌ Error seeding roles: ${errorMessage}`);
    process.exit(1);
  }
};
