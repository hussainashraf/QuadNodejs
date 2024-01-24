import React, { useState, useEffect } from 'react';
import axios from 'axios';

const formatCurrency = (value) => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    minimumFractionDigits: 2,
  }).format(value);
};

const getArrowIcon = (value) => {
  return value < 0 ? 'fas fa-arrow-down text-red-600' : 'fas fa-arrow-up text-green-600';
};

const App = () => {
  const [cryptoData, setCryptoData] = useState([]);
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    // Fetch data from the server when the component mounts
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:4000/api/cryptoData');
      setCryptoData(response.data);
    } catch (error) {
      console.error('Error fetching data:', error.message);
    }
  };

  useEffect(() => {
    // Apply dark mode styles to the entire application
    document.documentElement.classList.toggle('dark', darkMode);
  }, [darkMode]);

  return (
    <div className={`min-h-screen ${darkMode ? 'dark' : ''} bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-white`}>
      <div className="container mx-auto p-4">
        <div className="flex justify-end mb-4">
          <button
            className="bg-gray-300 dark:bg-gray-700 text-gray-800 dark:text-white px-4 py-2 rounded-md"
            onClick={() => setDarkMode(!darkMode)}
          >
            {darkMode ? 'Light Mode' : 'Dark Mode'}
          </button>
        </div>
        <h1 className="text-4xl font-bold mb-8">Crypto</h1>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-md">
            <thead>
              <tr className="bg-gray-100 dark:bg-gray-700">
                <th className="px-4 md:px-6 lg:px-8 py-3 md:py-4 lg:py-5 border-b border-gray-300 dark:border-gray-700 text-left text-xs md:text-sm lg:text-base leading-4 font-bold text-white-400 uppercase tracking-wider">
                  Name
                </th>
                <th className="px-4 md:px-6 lg:px-8 py-3 md:py-4 lg:py-5 border-b border-gray-300 dark:border-gray-700 text-left text-xs md:text-sm lg:text-base leading-4 font-bold ttext-white-400 uppercase tracking-wider">
                  Last
                </th>
                <th className="px-4 md:px-6 lg:px-8 py-3 md:py-4 lg:py-5 border-b border-gray-300 dark:border-gray-700 text-left text-xs md:text-sm lg:text-base leading-4 font-bold text-white-400 uppercase tracking-wider">
                  Buy / Sell
                </th>
                <th className="px-4 md:px-6 lg:px-8 py-3 md:py-4 lg:py-5 border-b border-gray-300 dark:border-gray-700 text-left text-xs md:text-sm lg:text-base leading-4 font-bold text-white-400 uppercase tracking-wider">
                  Difference
                </th>
                <th className="px-4 md:px-6 lg:px-8 py-3 md:py-4 lg:py-5 border-b border-gray-300 dark:border-gray-700 text-left text-xs md:text-sm lg:text-base leading-4 font-bold text-white-400 uppercase tracking-wider">
                  Savings
                </th>
                <th className="px-4 md:px-6 lg:px-8 py-3 md:py-4 lg:py-5 border-b border-gray-300 dark:border-gray-700 text-left text-xs md:text-sm lg:text-base leading-4 font-bold text-white-400 uppercase tracking-wider">
                  Volume
                </th>
                <th className="px-4 md:px-6 lg:px-8 py-3 md:py-4 lg:py-5 border-b border-gray-300 dark:border-gray-700 text-left text-xs md:text-sm lg:text-base leading-4 font-bold text-white-400 uppercase tracking-wider">
                  Base Unit
                </th>
              </tr>
            </thead>
            <tbody>
              {cryptoData.map((crypto, index) => (
                <tr
                  key={index}
                  className={index % 2 === 0 ? 'bg-gray-50 dark:bg-gray-800' : 'bg-white dark:bg-gray-900'}
                >
                  <td className="px-4 md:px-6 lg:px-8 py-3 md:py-4 lg:py-5 whitespace-no-wrap border-b border-gray-300 dark:border-gray-700 font-bold">
                    {crypto.name}
                  </td>
                  <td className="px-4 md:px-6 lg:px-8 py-3 md:py-4 lg:py-5 whitespace-no-wrap border-b border-gray-300 dark:border-gray-700">
                    {formatCurrency(crypto.last)}
                  </td>
                  <td className="px-4 md:px-6 lg:px-8 py-3 md:py-4 lg:py-5 whitespace-no-wrap border-b border-gray-300 dark:border-gray-700">
                    {`${formatCurrency(crypto.buy)} / ${formatCurrency(crypto.sell)}`}
                  </td>
                  <td
                    className={`px-4 md:px-6 lg:px-8 py-3 md:py-4 lg:py-5 whitespace-no-wrap border-b border-gray-300 dark:border-gray-700 ${
                      getArrowIcon(crypto.buy - crypto.sell)
                    }`}
                  >
                    {formatCurrency(Math.abs(crypto.buy - crypto.sell))}
                  </td>
                  <td
                    className={`px-4 md:px-6 lg:px-8 py-3 md:py-4 lg:py-5 whitespace-no-wrap border-b border-gray-300 dark:border-gray-700 ${
                      getArrowIcon((crypto.buy - crypto.sell) * crypto.volume)
                    }`}
                  >
                    {formatCurrency(Math.abs((crypto.buy - crypto.sell) * crypto.volume))}
                  </td>
                  <td className="px-4 md:px-6 lg:px-8 py-3 md:py-4 lg:py-5 whitespace-no-wrap border-b border-gray-300 dark:border-gray-700">
                    {crypto.volume}
                  </td>
                  <td className="px-4 md:px-6 lg:px-8 py-3 md:py-4 lg:py-5 whitespace-no-wrap border-b border-gray-300 dark:border-gray-700">
                    {crypto.base_unit}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default App;
