import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="bg-white shadow-md">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold text-gray-800">
          Flex Living
        </Link>
        <nav className="hidden md:flex space-x-6">
          <Link to="/dashboard" className="text-gray-600 hover:text-gray-800">
            Dashboard
          </Link>
          <Link to="/properties" className="text-gray-600 hover:text-gray-800">
            Properties
          </Link>
          <a href="#" className="text-gray-600 hover:text-gray-800">
            All listings
          </a>
          <a href="#" className="text-gray-600 hover:text-gray-800">
            About Us
          </a>
          <a href="#" className="text-gray-600 hover:text-gray-800">
            Contact Us
          </a>
        </nav>
      </div>
    </header>
  );
};

export default Header;
