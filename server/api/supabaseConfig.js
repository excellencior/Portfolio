// In your backend server file (e.g., server.js or app.js)
import express from 'express';
const router = express.Router();

router.get('/', (req, res) => {
  console.log('GET /supabase-config');
  res.json({
    supabaseUrl: process.env.SUPABASE_URL,
    supabaseKey: process.env.SUPABASE_KEY
  }).status(200);
});

export default router;