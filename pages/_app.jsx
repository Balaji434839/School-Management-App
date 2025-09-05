import '../styles/global.css';
import Link from 'next/link';

export default function MyApp({ Component, pageProps }) {
  return (
    <>
      <nav className="bg-gray-800 py-4">
        <div className="max-w-7xl mx-auto flex justify-center gap-4">
          <Link href="/" className="px-4 py-2 rounded text-white bg-indigo-600 hover:bg-indigo-700 font-semibold transition">Home</Link>
          <Link href="/showSchools" className="px-4 py-2 rounded text-white bg-indigo-600 hover:bg-indigo-700 font-semibold transition">Schools</Link>
          <Link href="#about" className="px-4 py-2 rounded text-white bg-indigo-600 hover:bg-indigo-700 font-semibold transition">About</Link>
          <Link href="#contact" className="px-4 py-2 rounded text-white bg-indigo-600 hover:bg-indigo-700 font-semibold transition">Contact</Link>
        </div>
      </nav>
      <div className="max-w-7xl mx-auto mt-8 text-center">
        <h1 className="text-4xl md:text-5xl font-extrabold text-gray-800 mb-8">Find the Perfect School for Your Child</h1>
      </div>
      <Component {...pageProps} />
    </>
  );
}