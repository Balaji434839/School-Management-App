import { useState, useEffect } from 'react';
import Link from 'next/link';
import Head from 'next/head';
// import '../styles/globals.css';

export default function Home() {
  const [schools, setSchools] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [filteredSchools, setFilteredSchools] = useState([]);

  useEffect(() => {
    async function fetchSchools() {
      try {
        const res = await fetch('/api/schools');
        const data = await res.json();
        if (res.ok) {
          setSchools(data);
          setFilteredSchools(data);
        } else {
          console.error('Failed to fetch schools:', data.error);
        }
      } catch (error) {
        console.error('Error fetching schools:', error);
      }
    }
    fetchSchools();
  }, []);

  useEffect(() => {
    const filtered = schools.filter(
      (school) =>
        school.name.toLowerCase().includes(searchText.toLowerCase()) ||
        school.address.toLowerCase().includes(searchText.toLowerCase()) ||
        school.city.toLowerCase().includes(searchText.toLowerCase())
    );
    setFilteredSchools(filtered);
  }, [searchText, schools]);

  return (
    <>
      <Head>
        <title>EduFind - Find the Perfect School</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css"
          rel="stylesheet"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap"
          rel="stylesheet"
        />
      </Head>
      <style jsx>{`
        body {
          font-family: 'Inter', sans-serif;
          overflow-x: hidden;
        }
        .floating-card {
          box-shadow: 0 10px 15px -3px rgba(99, 102, 241, 0.3),
            0 4px 6px -4px rgba(99, 102, 241, 0.2);
          transition: transform 0.3s ease, box-shadow 0.3s ease;
          will-change: transform;
        }
        .floating-card:hover {
          box-shadow: 0 20px 25px -5px rgba(99, 102, 241, 0.5),
            0 10px 10px -5px rgba(99, 102, 241, 0.3);
        }
        .school-image {
          position: relative;
          overflow: hidden;
          border-top-left-radius: 0.5rem;
          border-top-right-radius: 0.5rem;
        }
        .school-image img {
          width: 100%;
          height: 160px;
          object-fit: cover;
          transition: transform 0.5s ease;
          border-top-left-radius: 0.5rem;
          border-top-right-radius: 0.5rem;
          will-change: transform;
        }
        .school-image:hover img {
          transform: scale(1.1) rotate(1deg);
        }
        .school-image span {
          position: absolute;
          bottom: 0.5rem;
          left: 0.5rem;
          background-color: rgba(99, 102, 241, 0.85);
          color: white;
          font-weight: 600;
          padding: 0.25rem 0.5rem;
          border-radius: 0.25rem;
          font-size: 0.875rem;
          user-select: none;
          pointer-events: none;
        }
        .hero {
          position: relative;
          background-color: #4f46e5;
          color: white;
          overflow: hidden;
        }
        .hero img {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
          opacity: 0.15;
          pointer-events: none;
          select-none;
        }
        .about-image img {
          border-radius: 0.5rem;
          object-fit: cover;
          width: 100%;
          height: 100%;
        }
        input[type="text"],
        input[type="email"],
        textarea,
        select {
          border: 1px solid #d1d5db;
          border-radius: 0.375rem;
          padding: 0.5rem 0.75rem;
          font-size: 1rem;
          outline-offset: 2px;
          outline-color: #6366f1;
          transition: border-color 0.2s ease;
        }
        input[type="text"]:focus,
        input[type="email"]:focus,
        textarea:focus,
        select:focus {
          border-color: #6366f1;
          box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.3);
        }
        textarea {
          resize: vertical;
          min-height: 100px;
        }
        section:target::before {
          content: "";
          display: block;
          height: 80px;
          margin-top: -80px;
          visibility: hidden;
        }
        .fade-in-up {
          opacity: 0;
          transform: translateY(20px);
          animation-fill-mode: forwards;
          animation-name: fadeInUp;
          animation-duration: 0.8s;
          animation-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
        }
        @keyframes fadeInUp {
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
      <header className="bg-white shadow sticky top-0 z-30">
        <nav className="container mx-auto flex items-center justify-between py-4 px-4 md:px-0">
          <Link href="/" className="flex items-center text-indigo-600 font-extrabold text-2xl select-none">
            <i className="fas fa-graduation-cap mr-2"></i>
            EduFind
          </Link>
          <div className="space-x-6 text-gray-700 font-semibold text-sm md:text-base">
            <Link href="/" className="text-indigo-600 border-b-2 border-indigo-600 pb-1">
              Home
            </Link>
            <Link href="/showSchools" className="hover:text-indigo-600 transition">
              Schools
            </Link>
            <Link href="/addSchool" className="hover:text-indigo-600 transition">
              Add School
            </Link>
            <Link href="#about" className="hover:text-indigo-600 transition">
              About
            </Link>
            <Link href="#contact" className="hover:text-indigo-600 transition">
              Contact
            </Link>
          </div>
        </nav>
      </header>
      <div className="hero relative py-20 md:py-32" id="hero-parallax">
        <img
          alt="Wide school campus with children playing and trees under a bright blue sky"
          src="https://storage.googleapis.com/a1aa/image/d8dada97-a073-4d2d-3dc2-1bb92e1519f1.jpg"
          className="absolute inset-0 w-full h-full object-cover opacity-15 pointer-events-none select-none"
        />
        <div className="container mx-auto px-4 md:px-0 relative z-10 max-w-4xl text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold leading-tight mb-6 drop-shadow-lg fade-in-up">

          </h1>
          <p className="text-lg md:text-xl mb-8 drop-shadow-md fade-in-up">
            Discover the best educational institutions with our comprehensive directory. Compare schools, read reviews, and make informed decisions.
          </p>
          <Link
            href="/showSchools"
            className="inline-block bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 px-8 rounded-lg shadow-lg transition fade-in-up"
          >
            Explore Schools
          </Link>
        </div>
      </div>
      <div className="container mx-auto px-4 md:px-0 pb-20">
        <div className="search-section floating-card bg-white rounded-xl p-6 md:p-10 max-w-4xl mx-auto -mt-20 relative z-20" id="search-parallax">
          <h2 className="text-2xl font-bold mb-6 text-center md:text-left fade-in-up">
            Find Your Ideal School
          </h2>
          <div className="flex flex-col md:flex-row md:space-x-4 space-y-4 md:space-y-0 mb-6 fade-in-up">
            <input
              type="text"
              className="search-input flex-grow border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Search by school name, location, or curriculum"
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
            />
            <button className="search-btn bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-lg px-6 py-3 transition">
              Search
            </button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 fade-in-up">
            <select className="filter-select border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500">
              <option>Select City</option>
              <option>Bangalore</option>
              <option>New Delhi</option>
              <option>Mumbai</option>
              <option>Hyderabad</option>
              <option>Pune</option>
              <option>Chennai</option>
            </select>
            <select className="filter-select border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500">
              <option>Select State</option>
              <option>Karnataka</option>
              <option>Delhi</option>
              <option>Maharashtra</option>
              <option>Telangana</option>
              <option>Tamil Nadu</option>
            </select>
            <select className="filter-select border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500">
              <option>School Type</option>
              <option>Public</option>
              <option>Private</option>
              <option>Charter</option>
              <option>International</option>
            </select>
            <select className="filter-select border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500">
              <option>Curriculum</option>
              <option>CBSE</option>
              <option>ICSE</option>
              <option>IB</option>
              <option>State Board</option>
            </select>
          </div>
        </div>
        <section className="mt-20" id="schools">
          <h2 className="text-3xl font-bold mb-10 text-center md:text-left fade-in-up">
            Featured Schools
          </h2>
          <div className="schools-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredSchools.length === 0 ? (
              <p className="text-center text-gray-600">No schools found</p>
            ) : (
              filteredSchools.map((school, index) => (
                <div
                  key={school.id}
                  className="school-card floating-card bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition fade-in-up"
                  style={{ animationDelay: `${0.15 * (index + 1)}s` }}
                >
                  <div className="school-image">
                    <img
                      src={school.image || 'https://via.placeholder.com/600x400'}
                      alt={school.name}
                      className="w-full h-40 object-cover"
                    />
                    <span>{school.name.split(' ')[0]}</span>
                  </div>
                  <div className="school-info p-6">
                    <h3 className="school-name text-xl font-semibold mb-1">{school.name}</h3>
                    <p className="school-address text-gray-600 mb-0.5">{school.address}</p>
                    <p className="school-city text-gray-500 mb-4">
                      {school.city}, {school.state}
                    </p>
                    <div className="school-stats flex space-x-6 text-center text-gray-700">
                      <div className="stat">
                        <div className="stat-number text-indigo-600 font-bold text-lg">
                          {school.rating || 'N/A'}
                        </div>
                        <div className="stat-label text-sm">Rating</div>
                      </div>
                      <div className="stat">
                        <div className="stat-number font-semibold text-lg">
                          {school.students || 'N/A'}
                        </div>
                        <div className="stat-label text-sm">Students</div>
                      </div>
                      <div className="stat">
                        <div className="stat-number font-semibold text-lg">
                          {school.curriculum || 'N/A'}
                        </div>
                        <div className="stat-label text-sm">Curriculum</div>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </section>
        <section className="about-section mt-24 max-w-6xl mx-auto" id="about">
          <h2 className="text-3xl font-bold mb-10 text-center md:text-left fade-in-up">
            About EduFind
          </h2>
          <div className="about-content flex flex-col md:flex-row md:space-x-12 items-center">
            <div className="about-text md:w-1/2 space-y-6 text-gray-700 text-lg fade-in-up">
              <p>
                EduFind is a comprehensive platform dedicated to helping parents and students find the
                perfect educational institution. We understand that choosing the right school is one
                of the most important decisions for a child's future.
              </p>
              <p>
                Our platform provides detailed information about schools, including curriculum,
                facilities, faculty, and reviews from other parents. We're committed to making the
                school search process easier and more transparent.
              </p>
              <p>
                With thousands of schools in our database and advanced search tools, EduFind is your
                trusted partner in education journey.
              </p>
            </div>
            <div className="about-image md:w-1/2 mt-10 md:mt-0 rounded-xl overflow-hidden shadow-lg max-h-96 w-full fade-in-up">
              <img
                src="https://storage.googleapis.com/a1aa/image/587a8eec-721f-43d3-9cd3-1186fbc2b716.jpg"
                alt="Happy children and teachers in a bright and welcoming school environment"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </section>
        <section className="contact-section mt-24 max-w-6xl mx-auto" id="contact">
          <h2 className="text-3xl font-bold mb-10 text-center md:text-left fade-in-up">
            Contact Us
          </h2>
          <div className="contact-container flex flex-col md:flex-row md:space-x-12">
            <div className="contact-form md:w-1/2 bg-white rounded-xl p-8 shadow-md floating-card fade-in-up">
              <h3 className="text-2xl font-semibold mb-6">Get in Touch</h3>
              <form>
                <div className="form-group mb-5">
                  <label htmlFor="name" className="block mb-2 font-medium text-gray-700">
                    Your Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    className="w-full"
                    placeholder="Enter your name"
                  />
                </div>
                <div className="form-group mb-5">
                  <label htmlFor="email" className="block mb-2 font-medium text-gray-700">
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    className="w-full"
                    placeholder="Enter your email"
                  />
                </div>
                <div className="form-group mb-6">
                  <label htmlFor="message" className="block mb-2 font-medium text-gray-700">
                    Message
                  </label>
                  <textarea
                    id="message"
                    className="w-full"
                    placeholder="How can we help you?"
                  ></textarea>
                </div>
                <button
                  type="submit"
                  className="btn bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-lg px-6 py-3 transition w-full md:w-auto"
                >
                  Send Message
                </button>
              </form>
            </div>
            <div className="contact-info md:w-1/2 mt-12 md:mt-0 bg-white rounded-xl p-8 shadow-md floating-card fade-in-up">
              <h3 className="text-2xl font-semibold mb-6">Contact Information</h3>
              <p className="mb-4 flex items-center space-x-3">
                <i className="fas fa-map-marker-alt text-indigo-600 text-lg w-5"></i>
                <span>123 Education Street, Learning City</span>
              </p>
              <p className="mb-4 flex items-center space-x-3">
                <i className="fas fa-phone text-indigo-600 text-lg w-5"></i>
                <span>+1 (555) 123-4567</span>
              </p>
              <p className="mb-4 flex items-center space-x-3">
                <i className="fas fa-envelope text-indigo-600 text-lg w-5"></i>
                <span>info@edufind.com</span>
              </p>
              <p className="mb-6 flex items-center space-x-3">
                <i className="fas fa-clock text-indigo-600 text-lg w-5"></i>
                <span>Monday-Friday: 9am-5pm</span>
              </p>
              <div className="social-icons flex space-x-6 text-indigo-600 text-xl">
                <a href="#" aria-label="Facebook" className="hover:text-indigo-800 transition">
                  <i className="fab fa-facebook-f"></i>
                </a>
                <a href="#" aria-label="Twitter" className="hover:text-indigo-800 transition">
                  <i className="fab fa-twitter"></i>
                </a>
                <a href="#" aria-label="Instagram" className="hover:text-indigo-800 transition">
                  <i className="fab fa-instagram"></i>
                </a>
                <a href="#" aria-label="LinkedIn" className="hover:text-indigo-800 transition">
                  <i className="fab fa-linkedin-in"></i>
                </a>
              </div>
            </div>
          </div>
        </section>
      </div>
      <footer className="bg-indigo-600 text-indigo-100 py-12">
        <div className="container mx-auto px-4 md:px-0 max-w-6xl">
          <div className="footer-content flex flex-col md:flex-row md:justify-between space-y-10 md:space-y-0">
            <div className="footer-section md:w-1/3 space-y-4">
              <h3 className="text-xl font-bold">EduFind</h3>
              <p>
                India's leading platform for connecting parents with the perfect educational
                institutions for their children.
              </p>
            </div>
            <div className="footer-section md:w-1/3 space-y-2 flex flex-col">
              <h3 className="text-xl font-bold mb-2">Quick Links</h3>
              <Link href="/" className="hover:underline">
                Home
              </Link>
              <Link href="/showSchools" className="hover:underline">
                School Directory
              </Link>
              <Link href="/addSchool" className="hover:underline">
                Add School
              </Link>
              <Link href="#about" className="hover:underline">
                About Us
              </Link>
              <Link href="#contact" className="hover:underline">
                Contact
              </Link>
            </div>
            <div className="footer-section md:w-1/3 space-y-2 flex flex-col">
              <h3 className="text-xl font-bold mb-2">Resources</h3>
              <Link href="#" className="hover:underline">
                Admission Guidance
              </Link>
              <Link href="#" className="hover:underline">
                Education Blog
              </Link>
              <Link href="#" className="hover:underline">
                School Reviews
              </Link>
              <Link href="#" className="hover:underline">
                Parent Community
              </Link>
            </div>
          </div>
          <div className="copyright mt-10 text-center text-sm text-indigo-200">
            <p>© 2023 EduFind. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </>
  );
}