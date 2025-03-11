// lib/seed.ts
import connectToDatabase from './mongodb';
import User from '../models/User';
import Tale from '../models/Tale';
import mongoose from 'mongoose';

async function seedDatabase() {
  try {
    console.log('Connecting to MongoDB...');
    await connectToDatabase();
    console.log('Connected to MongoDB successfully');

    // Check if there are any users
    const usersCount = await User.countDocuments();
    
    if (usersCount === 0) {
      console.log('Seeding admin user...');
      
      // Create admin user
      const adminPassword = 'admin123'; // In production, use a secure password
      
      const adminUser = new User({
        username: 'admin',
        password: adminPassword, // Will be hashed by the pre-save hook
        isAdmin: true,
      });
      
      await adminUser.save();
      console.log('Admin user created successfully');
    } else {
      console.log('Users already exist, skipping user seeding');
    }

    // Check if there are any tales
    const talesCount = await Tale.countDocuments();
    
    if (talesCount === 0) {
      console.log('Seeding sample tales...');
      
      // Create sample tales
      const tales = [
        {
          title: 'The Lost Key',
          description: 'A short story about finding what was always there.',
          content: 'Once upon a time, there was a young girl named Lily who lost her favorite key. She searched everywhere—under the couch, in her toy box, and even in the garden. As night fell, her mother asked, "Where did you last see it?" Lily thought hard and remembered she had been playing with it while reading in her special hiding spot—a tiny nook behind the bookshelf. She rushed there, and sure enough, the key gleamed in the moonlight. Sometimes what we seek has been with us all along, just waiting in the places that bring us joy.',
        },
        {
          title: 'Mountain Echo',
          description: 'A tale of adventure in the high mountains.',
          content: 'The mountain peaks gleamed with snow as Marco began his ascent. He had been planning this climb for years, ever since his grandfather told him stories of the mysterious echo that resided on this mountain. Legend said that if you called a question into the valley at sunrise, the echo would answer with wisdom. As Marco reached the summit just before dawn, he caught his breath in the thin air and watched the first rays of sunlight paint the world below. With trembling voice, he called out, "What should I seek in life?" The answer came back, not as an echo of his own voice, but in the gentle whisper of wind through pine trees: "This moment. Only this."',
        },
        {
          title: 'The Forgotten Letter',
          description: 'A mysterious letter changes everything.',
          content: 'Sarah found the yellowed envelope tucked between the pages of an old book she had bought at a secondhand store. The letter inside was dated 1952 and began, "My dearest Elizabeth, If you are reading this, I never returned from sea." Gripped by curiosity, Sarah researched the name signed at the bottom—James Harrison—and discovered he had been a local sailor who disappeared during a storm. The letter contained a map with an X marked offshore. Using modern technology, Sarah organized a diving expedition and discovered not treasure, but a waterproof case containing photographs and journals documenting an unknown species of deep-sea creatures. James Harrison had not been lost at sea; he had found something that changed his understanding of the world and had chosen to disappear to study it in secret.',
        },
      ];
      
      await Tale.insertMany(tales);
      console.log('Sample tales created successfully');
    } else {
      console.log('Tales already exist, skipping tale seeding');
    }

    console.log('Database seeding completed');
  } catch (error) {
    console.error('Error seeding database:', error);
  } finally {
    // Close the connection after seeding
    console.log('Closing database connection...');
    mongoose.connection.close();
    console.log('Database connection closed');
  }
}

// Seed the database if running this file directly
if (require.main === module) {
  seedDatabase();
}

export default seedDatabase;