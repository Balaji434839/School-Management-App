import { query } from '@/lib/db';

export const config = {
  api: { bodyParser: true },
};

const validateSchoolData = (data) => {
  const { name, address, city, state, contact, email_id } = data;
  if (!name || !address || !city || !state || !contact || !email_id) {
    throw new Error('All fields are required');
  }
  if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(email_id)) {
    throw new Error('Invalid email address');
  }
  if (!/^\d{10}$/.test(contact)) {
    throw new Error('Contact must be a 10-digit number');
  }
};

export default async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      const sqlQuery = 'SELECT * FROM schools';
      const schools = await query({ query: sqlQuery });
      res.status(200).json(schools);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch schools' });
    }
  } else if (req.method === 'POST') {
    try {
      const { name, address, city, state, contact, email_id, image, rating, students, curriculum } = req.body;
      validateSchoolData({ name, address, city, state, contact, email_id });

      let imagePath = null;
      if (image) {
        const formData = new FormData();
        formData.append('image', image);
        const uploadResponse = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/upload`, {
          method: 'POST',
          body: formData,
        });
        const uploadResult = await uploadResponse.json();
        if (!uploadResponse.ok) throw new Error(uploadResult.error);
        imagePath = uploadResult.imagePath;
      }

      const sqlQuery = `INSERT INTO schools (name, address, city, state, contact, image, email_id, rating, students, curriculum) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
      const values = [name, address, city, state, contact, imagePath, email_id, rating || null, students || null, curriculum || null];
      const result = await query({ query: sqlQuery, values });

      res.status(201).json({ message: 'School added successfully!', id: result.insertId });
    } catch (error) {
      res.status(500).json({ error: error.message || 'Failed to add school' });
    }
  } else {
    res.setHeader('Allow', ['GET', 'POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}