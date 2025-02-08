"use client";

import { useEffect, useState } from "react";
import { Globe2, DollarSign, ArrowUpDown } from "lucide-react";
import { cn } from "@/lib/utils";

interface Price {
  plan_name: string;
  price: number;
}

interface CountryData {
  currency: string;
  symbol: string;
  price_list: Price[];
}

interface PriceData {
  country_list: string[];
  country_config: Record<string, CountryData>;
  familypro_price: number;
}

interface ExchangeRates {
  [key: string]: number;
}

export default function Home() {
  const [priceData, setPriceData] = useState<PriceData | null>(null);
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [loading, setLoading] = useState(true);
  const [exchangeRates, setExchangeRates] = useState<ExchangeRates>({});
  const [selectedCurrency, setSelectedCurrency] = useState("USD");
  const [availableCurrencies, setAvailableCurrencies] = useState<string[]>([]);

  useEffect(() => {
    Promise.all([
      fetch("https://familypro.io/api/triple/price-list/ChatGPT"),
      fetch("https://api.exchangerate-api.com/v4/latest/USD")
    ])
      .then(([priceRes, ratesRes]) => Promise.all([priceRes.json(), ratesRes.json()]))
      .then(([priceData, ratesData]) => {
        setPriceData(priceData.data);
        setExchangeRates(ratesData.rates);
        const currencies = Object.values(priceData.data.country_config).map(
          (country: CountryData) => country.currency
        );
        setAvailableCurrencies([...new Set(currencies)]);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setLoading(false);
      });
  }, []);

  const convertPrice = (price: number, fromCurrency: string, toCurrency: string) => {
    if (!exchangeRates[fromCurrency] || !exchangeRates[toCurrency]) return price;
    const inUSD = price / exchangeRates[fromCurrency];
    return (inUSD * exchangeRates[toCurrency]).toFixed(2);
  };

  const sortedCountries = priceData?.country_list.sort((a, b) => {
    const priceA = priceData.country_config[a].price_list.find(
      (p) => p.plan_name === "ChatGPT Plus"
    )?.price || 0;
    const priceB = priceData.country_config[b].price_list.find(
      (p) => p.plan_name === "ChatGPT Plus"
    )?.price || 0;
    
    const convertedPriceA = Number(convertPrice(
      priceA,
      priceData.country_config[a].currency,
      selectedCurrency
    ));
    const convertedPriceB = Number(convertPrice(
      priceB,
      priceData.country_config[b].currency,
      selectedCurrency
    ));
    
    return sortOrder === "asc" ? convertedPriceA - convertedPriceB : convertedPriceB - convertedPriceA;
  });

  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-4">
            <Globe2 className="h-12 w-12 text-blue-600" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            ChatGPT Global Price Comparison
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Compare ChatGPT subscription prices across different countries and
            currencies
          </p>
        </div>

        <div className="flex justify-between items-center mb-6">
          <select
            value={selectedCurrency}
            onChange={(e) => setSelectedCurrency(e.target.value)}
            className="px-4 py-2 bg-white border border-gray-200 rounded-lg shadow-sm hover:bg-gray-50 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {availableCurrencies.map((currency) => (
              <option key={currency} value={currency}>
                Convert to {currency}
              </option>
            ))}
          </select>
          
          <button
            onClick={() => setSortOrder(sortOrder === "asc" ? "desc" : "asc")}
            className="flex items-center space-x-2 px-4 py-2 bg-white border border-gray-200 rounded-lg shadow-sm hover:bg-gray-50 transition-colors"
          >
            <ArrowUpDown className="h-4 w-4" />
            <span>
              Sort by price ({sortOrder === "asc" ? "Low to High" : "High to Low"})
            </span>
          </button>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div
                key={i}
                className="bg-white rounded-lg shadow-md p-6 animate-pulse"
              >
                <div className="h-6 bg-gray-200 rounded w-3/4 mb-4"></div>
                <div className="h-4 bg-gray-200 rounded w-1/2 mb-2"></div>
                <div className="h-4 bg-gray-200 rounded w-1/3"></div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {sortedCountries?.map((country) => {
              const countryData = priceData?.country_config[country];
              const plusPrice = countryData?.price_list.find(
                (p) => p.plan_name === "ChatGPT Plus"
              );
              const miniPrice = countryData?.price_list.find(
                (p) => p.plan_name === "ChatGPT-4o mini"
              );

              return (
                <div
                  key={country}
                  className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow"
                >
                  <h2 className="text-xl font-semibold text-gray-900 mb-4">
                    {country}
                  </h2>
                  <div className="space-y-3">
                    {plusPrice && (
                      <div className="space-y-1">
                        <div className="flex items-center justify-between">
                          <span className="text-gray-600">ChatGPT Plus</span>
                          <span className="text-lg font-medium text-gray-900">
                            {countryData?.symbol}
                            {plusPrice.price}
                          </span>
                        </div>
                        {countryData?.currency !== selectedCurrency && (
                          <div className="flex items-center justify-end text-sm text-gray-500">
                            ≈ {selectedCurrency} {convertPrice(
                              plusPrice.price,
                              countryData?.currency,
                              selectedCurrency
                            )}
                          </div>
                        )}
                      </div>
                    )}
                    {miniPrice && (
                      <div className="space-y-1">
                        <div className="flex items-center justify-between">
                          <span className="text-gray-600">ChatGPT-4o mini</span>
                          <span className="text-lg font-medium text-gray-900">
                            {countryData?.symbol}
                            {miniPrice.price}
                          </span>
                        </div>
                        {countryData?.currency !== selectedCurrency && (
                          <div className="flex items-center justify-end text-sm text-gray-500">
                            ≈ {selectedCurrency} {convertPrice(
                              miniPrice.price,
                              countryData?.currency,
                              selectedCurrency
                            )}
                          </div>
                        )}
                      </div>
                    )}
                    <div className="pt-3 border-t">
                      <span className="text-sm text-gray-500">
                        Currency: {countryData?.currency}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </main>
  );
}