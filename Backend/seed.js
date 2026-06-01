const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();

const Service = require('./models/Service');

const services = [
  {
    name: 'Deep Clean',
    description: 'Full top-to-bottom cleaning of every room, including hard-to-reach corners, appliances, and fixtures.',
    price: 8500,
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400',
    category: 'Residential',
  },
  {
    name: 'Office Cleaning',
    description: 'Professional cleaning for offices and commercial spaces. Desks, floors, restrooms, and common areas.',
    price: 12000,
    image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=400',
    category: 'Commercial',
  },
  {
    name: 'Sofa Express',
    description: 'Quick and thorough sofa cleaning using steam and upholstery-safe solutions.',
    price: 3500,
    image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=400',
    category: 'Specialized',
  },
  {
    name: 'Move-In / Move-Out Clean',
    description: 'Complete cleaning service for homes before moving in or after moving out. Includes windows and cabinets.',
    price: 10000,
    image: 'https://images.unsplash.com/photo-1527515545081-5db817172677?w=400',
    category: 'Residential',
  },
  {
    name: 'Carpet Cleaning',
    description: 'Hot water extraction method to remove deep stains, allergens, and odours from carpets.',
    price: 4500,
    image: 'https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=400',
    category: 'Specialized',
  },
  {
    name: 'Kitchen Deep Clean',
    description: 'Degrease and sanitize your entire kitchen including oven, hood, tiles, and all surfaces.',
    price: 5500,
    image: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400',
    category: 'Residential',
  },
  {
    name: 'Post-Renovation Clean',
    description: 'Remove dust, debris, and construction residue after a renovation project. Leaves your space spotless.',
    price: 15000,
    image: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=400',
    category: 'Specialized',
  },
  {
    name: 'Regular Maintenance',
    description: 'Weekly or bi-weekly cleaning visits to keep your home consistently clean and fresh.',
    price: 3000,
    image: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=400',
    category: 'Residential',
  },
];

const seed = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('✅ Connected to MongoDB');

    await Service.deleteMany();
    console.log('🗑️  Cleared existing services');

    await Service.insertMany(services);
    console.log('🌱 Seeded 8 services successfully');

    process.exit(0);
  } catch (error) {
    console.error('❌ Seed failed:', error.message);
    process.exit(1);
  }
};

seed();
