// src/components/Footer.jsx
export default function Footer() {
  return (
    <footer className="bg-white shadow-inner border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-4 py-4 text-center text-gray-700">
        © {new Date().getFullYear()}{' '}
        Author{' '}
        <a
          href="https://www.linkedin.com/in/arpit-singh-749a1124b?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app"
          target="_blank"
          rel="noopener noreferrer"
          className="text-indigo-600 hover:underline transition"
        >
          Arpit Singh
        </a>
        . All rights reserved.
      </div>
    </footer>
  )
}
