import { useState, useEffect } from 'react';
import Head from 'next/head';
import Image from 'next/image';

export default function ShowSchools() {
  const [schools, setSchools] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchSchools();
  }, []);

  const fetchSchools = async () => {
    try {
      const response = await fetch('/api/schools');
      const data = await response.json();
      
      if (response.ok) {
        setSchools(data);
      } else {
        setError(data.error || 'Failed to fetch schools');
      }
    } catch (err) {
      setError('Network error. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div className="text-center p-10 text-lg text-gray-600">Loading schools...</div>;
  if (error) return <div className="text-center p-10 text-red-600 text-lg">{error}</div>;

  return (
    <div className="max-w-5xl mx-auto p-5">
      <Head>
        <title>Schools Directory</title>
        <meta name="description" content="Browse our directory of schools" />
      </Head>

      <h1 className="text-3xl text-center mb-8 text-gray-800">Schools Directory</h1>
      
      {schools.length === 0 ? (
        <div className="text-center p-10 text-lg text-gray-600">No schools found in the database.</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {schools.map((school) => (
            <div key={school.id} className="bg-white rounded-lg shadow-md hover:shadow-lg transition transform hover:-translate-y-1">
              <div className="h-48 relative overflow-hidden">
                {school.image ? (
                  <Image 
                    src={school.image} 
                    alt={`${school.name} image`}
                    fill
                    style={{ objectFit: 'cover' }}
                  />
                ) : (
                  <div className="h-full flex items-center justify-center bg-gray-100 text-gray-500 font-bold" role="img" aria-label="No school image available">
                    No Image
                  </div>
                )}
              </div>
              <div className="p-5">
                <h2 className="text-lg font-semibold text-gray-800">{school.name}</h2>
                <p className="text-sm text-gray-600">{school.address}</p>
                <p className="text-sm text-gray-600">{school.city}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}