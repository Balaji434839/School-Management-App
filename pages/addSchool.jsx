import { useForm } from 'react-hook-form';
import { useState } from 'react';
import Head from 'next/head';

export default function AddSchool() {
  const { register, handleSubmit, formState: { errors }, reset } = useForm();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState('');

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    setMessage('');
    
    try {
      let imagePath = null; // Changed to null to match schema
      if (data.image && data.image[0]) {
        const formData = new FormData();
        formData.append('image', data.image[0]);
        
        const uploadResponse = await fetch('/api/upload', {
          method: 'POST',
          body: formData,
        });
        
        const uploadResult = await uploadResponse.json();
        if (!uploadResponse.ok) throw new Error(uploadResult.error || 'Image upload failed');
        
        imagePath = uploadResult.imagePath;
      }
      
      const schoolData = {
        name: data.name,
        address: data.address,
        city: data.city,
        state: data.state,
        contact: data.contact,
        email_id: data.email_id,
        image: imagePath,
      };
      
      const response = await fetch('/api/schools', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(schoolData),
      });
      
      const result = await response.json();
      
      if (response.ok) {
        setMessage('School added successfully!');
        reset();
      } else {
        throw new Error(result.error || 'Failed to add school');
      }
    } catch (error) {
      setMessage(`Error: ${error.message}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-5">
      <Head>
        <title>Add School</title>
        <meta name="description" content="Add a new school to the database" />
      </Head>

      <h1 className="text-3xl text-center mb-8 text-gray-800">Add New School</h1>
      
      {message && <div className={`p-3 rounded mb-5 text-center ${message.includes('Error') ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'}`}>{message}</div>}
      
      <form onSubmit={handleSubmit(onSubmit)} className="bg-gray-50 p-6 rounded-lg shadow-md">
        <div className="mb-4">
          <label htmlFor="name" className="block mb-2 font-semibold text-gray-700">School Name *</label>
          <input 
            id="name"
            className="w-full p-3 border rounded text-gray-700"
            {...register('name', { required: 'School name is required' })}
          />
          {errors.name && <span className="text-red-600 text-sm">{errors.name.message}</span>}
        </div>

        <div className="mb-4">
          <label htmlFor="address" className="block mb-2 font-semibold text-gray-700">Address *</label>
          <textarea 
            id="address"
            className="w-full p-3 border rounded text-gray-700"
            rows="3"
            {...register('address', { required: 'Address is required' })}
          />
          {errors.address && <span className="text-red-600 text-sm">{errors.address.message}</span>}
        </div>

        <div className="flex gap-4 mb-4">
          <div className="flex-1">
            <label htmlFor="city" className="block mb-2 font-semibold text-gray-700">City *</label>
            <input 
              id="city"
              className="w-full p-3 border rounded text-gray-700"
              {...register('city', { required: 'City is required' })}
            />
            {errors.city && <span className="text-red-600 text-sm">{errors.city.message}</span>}
          </div>

          <div className="flex-1">
            <label htmlFor="state" className="block mb-2 font-semibold text-gray-700">State *</label>
            <input 
              id="state"
              className="w-full p-3 border rounded text-gray-700"
              {...register('state', { required: 'State is required' })}
            />
            {errors.state && <span className="text-red-600 text-sm">{errors.state.message}</span>}
          </div>
        </div>

        <div className="mb-4">
          <label htmlFor="contact" className="block mb-2 font-semibold text-gray-700">Contact Number *</label>
          <input 
            id="contact"
            type="tel"
            className="w-full p-3 border rounded text-gray-700"
            {...register('contact', { 
              required: 'Contact number is required',
              pattern: {
                value: /^\d{10}$/,
                message: 'Contact number must be 10 digits',
              },
            })}
          />
          {errors.contact && <span className="text-red-600 text-sm">{errors.contact.message}</span>}
        </div>

        <div className="mb-4">
          <label htmlFor="email" className="block mb-2 font-semibold text-gray-700">Email Address *</label>
          <input 
            id="email"
            type="email"
            className="w-full p-3 border rounded text-gray-700"
            {...register('email_id', { 
              required: 'Email is required',
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: 'Invalid email address',
              },
            })}
          />
          {errors.email_id && <span className="text-red-600 text-sm">{errors.email_id.message}</span>}
        </div>

        <div className="mb-4">
          <label htmlFor="image" className="block mb-2 font-semibold text-gray-700">School Image</label>
          <input 
            id="image"
            type="file"
            accept="image/*"
            className="w-full p-3 border rounded text-gray-700"
            {...register('image')}
          />
        </div>

        <button 
          type="submit" 
          disabled={isSubmitting}
          className={`w-full p-3 rounded text-white ${isSubmitting ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'}`}
        >
          {isSubmitting ? 'Adding School...' : 'Add School'}
        </button>
      </form>
    </div>
  );
}