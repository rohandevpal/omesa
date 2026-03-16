import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-gradient-to-t from-[#090D18] via-[#14161C] to-[#18191D] text-white xl:py-16 px-4 sm:px-8 md:px-12 lg:px-20 transition-opacity duration-700">
      <div className="container mx-auto">
        {/* Top Section */}
        <div className="border-b border-gray-800 pb-8 md:pb-12 mb-8 md:mb-12">
          <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-6">
            <h2 className="text-xl sm:text-2xl md:text-4xl lg:text-5xl font-[heading] max-w-xl bg-gradient-to-r from-gray-500 via-neutral-400 to-slate-200 bg-clip-text text-transparent text-center md:text-left">
              Ready to create something extraordinary with us?
            </h2>

            <div className="w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 flex items-center justify-center rounded-full border border-gray-600 transition-all duration-300 cursor-pointer hover:rotate-[-45deg] mx-auto md:mx-0">
              <i className="fa solid fa-arrow-right text-white text-3xl sm:text-4xl transition-transform duration-300"></i>
            </div>
          </div>
        </div>
        {/* Middle Section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          {/* Logo and Social */}
          <div className="col-span-1 lg:col-span-2">
            <div className="mb-6 text-center lg:text-left">
              <img
                className="h-8 mb-3 mx-auto lg:mx-0"
                src="/omesa-logo-white.png"
                alt="Logo"
              />
              <p className="text-base sm:text-lg text-gray-400 font-[textFont]">
                Making creativity tangible. Making brands unforgettable.
              </p>
            </div>
            <div className="text-center lg:text-left">
              {/* <p className="mb-4 text-gray-400 font-[textFont]">
                Stay inspired. Follow us here
              </p>
              <div className="flex justify-center lg:justify-start space-x-4">
                <a
                  href="https://www.instagram.com/omesa_marketing/"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-gray-400 transition-colors"
                >
                  <i className="fab fa-instagram text-xl"></i>
                </a>
                <a
                  href="https://www.facebook.com/OmesaMarketing"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-gray-400 transition-colors"
                >
                  <i className="fab fa-facebook text-xl"></i>
                </a>
                <a
                  href="https://www.linkedin.com/company/omesa-marketing-pvt-ltd/"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-gray-400 transition-colors"
                >
                  <i className="fab fa-linkedin text-xl"></i>
                </a>
              </div> */}
            </div>
          </div>

          {/* Quick links */}
          <div className="grid grid-cols-2 gap-10 text-center sm:text-left">
            <div>
              <h4 className="text-lg sm:text-xl font-[heading] mb-6">Quick Links</h4>
              <ul className="space-y-4">
                <li>
                  <Link to="/about" className="hover:text-gray-400 transition-colors">
                    About Us
                  </Link>
                </li>
                <li>
                  <Link to="/contact" className="hover:text-gray-400 transition-colors">
                    Contact Us
                  </Link>
                </li>
                <li>
                  <Link to="/services" className="hover:text-gray-400 transition-colors">
                    Services
                  </Link>
                </li>
              </ul>
            </div>
            <div>
            <p className="mb-4 text-gray-400 font-[textFont]">
                Stay inspired. Follow us here
              </p>
              <div className="flex justify-center lg:justify-start space-x-4">
                <a
                  href="https://www.instagram.com/omesa_marketing/"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-gray-400 transition-colors"
                >
                  <i className="fab fa-instagram text-xl"></i>
                </a>
                <a
                  href="https://www.facebook.com/OmesaMarketing"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-gray-400 transition-colors"
                >
                  <i className="fab fa-facebook text-xl"></i>
                </a>
                <a
                  href="https://www.linkedin.com/company/omesa-marketing-pvt-ltd/"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-gray-400 transition-colors"
                >
                  <i className="fab fa-linkedin text-xl"></i>
                </a>
              </div>
            </div>
          </div>
        </div>
        {/* Footer Bottom */}
        <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-gray-800 gap-4">
          <p className="text-gray-400 text-sm text-center md:text-left font-[textFont]">
            Copyright © {new Date().getFullYear()}
          </p>
          <div className="flex space-x-6">
            <a href="#" className="text-gray-400 hover:text-white text-sm transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="text-gray-400 hover:text-white text-sm transition-colors">
              Term & Services
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
