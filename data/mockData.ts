import { GlobalData } from '@/types/dataTypes';

export const mockGlobalData: GlobalData = {
  lastUpdated: "2025-05-27T10:30:00Z",
  totalCountries: 195,
  regions: [
    {
      name: "North America",
      avgGdpGrowth: 2.8,
      avgInflation: 3.2,
      countries: 23
    },
    {
      name: "Europe",
      avgGdpGrowth: 1.9,
      avgInflation: 2.5,
      countries: 44
    },
    {
      name: "Asia",
      avgGdpGrowth: 4.5,
      avgInflation: 3.8,
      countries: 48
    },
    {
      name: "South America",
      avgGdpGrowth: 2.1,
      avgInflation: 7.2,
      countries: 12
    },
    {
      name: "Africa",
      avgGdpGrowth: 3.5,
      avgInflation: 8.3,
      countries: 54
    },
    {
      name: "Oceania",
      avgGdpGrowth: 2.5,
      avgInflation: 2.9,
      countries: 14
    }
  ],
  topPerformers: {
    gdpGrowth: [
      { id: "ind", name: "India", value: 7.2 },
      { id: "chn", name: "China", value: 5.7 },
      { id: "vnm", name: "Vietnam", value: 5.5 },
      { id: "idn", name: "Indonesia", value: 5.1 },
      { id: "phl", name: "Philippines", value: 4.9 }
    ],
    lowestInflation: [
      { id: "jpn", name: "Japan", value: 0.5 },
      { id: "che", name: "Switzerland", value: 0.7 },
      { id: "sgp", name: "Singapore", value: 1.2 },
      { id: "sau", name: "Saudi Arabia", value: 1.5 },
      { id: "chn", name: "China", value: 1.8 }
    ],
    highestInvestmentScore: [
      { id: "usa", name: "United States", value: 92 },
      { id: "sgp", name: "Singapore", value: 90 },
      { id: "deu", name: "Germany", value: 88 },
      { id: "chn", name: "China", value: 86 },
      { id: "aus", name: "Australia", value: 85 }
    ]
  },
  countries: [
    {
      id: "usa",
      name: "United States",
      flag: "https://flagcdn.com/us.svg",
      region: "North America",
      subregion: "Northern America",
      capital: "Washington, D.C.",
      population: 331002651,
      indicators: {
        gdp: 25457900000000,
        gdpGrowth: 2.6,
        gdpPerCapita: 76978,
        inflation: 3.4,
        unemployment: 3.7,
        publicDebt: 34000000000000,
        debtToGdpRatio: 133.6,
        foreignDirectInvestment: 345000000000,
        tradeBalance: -987000000000,
        currencyCode: "USD",
        exchangeRate: 1,
        creditRatings: {
          sp: "AA+",
          moodys: "Aaa",
          fitch: "AAA"
        }
      },
      historicalData: {
        gdp: [
          { date: "2019-01-01", value: 21427700000000 },
          { date: "2020-01-01", value: 20936600000000 },
          { date: "2021-01-01", value: 22996100000000 },
          { date: "2022-01-01", value: 25462700000000 },
          { date: "2023-01-01", value: 25457900000000 }
        ],
        inflation: [
          { date: "2019-01-01", value: 1.8 },
          { date: "2020-01-01", value: 1.2 },
          { date: "2021-01-01", value: 4.7 },
          { date: "2022-01-01", value: 8.0 },
          { date: "2023-01-01", value: 3.4 }
        ],
        unemployment: [
          { date: "2019-01-01", value: 3.7 },
          { date: "2020-01-01", value: 8.1 },
          { date: "2021-01-01", value: 5.4 },
          { date: "2022-01-01", value: 3.6 },
          { date: "2023-01-01", value: 3.7 }
        ],
        exchangeRate: [
          { date: "2019-01-01", value: 1 },
          { date: "2020-01-01", value: 1 },
          { date: "2021-01-01", value: 1 },
          { date: "2022-01-01", value: 1 },
          { date: "2023-01-01", value: 1 }
        ]
      },
      investmentScore: {
        overall: 92,
        economicStability: 88,
        growthPotential: 85,
        riskFactor: 15,
        sectorOpportunities: [
          {
            sector: "Technology",
            score: 95,
            growthRate: 12.5,
            description: "Strong innovation ecosystem with world-leading tech companies"
          },
          {
            sector: "Healthcare",
            score: 90,
            growthRate: 8.7,
            description: "Advanced medical research and growing healthcare needs"
          },
          {
            sector: "Renewable Energy",
            score: 87,
            growthRate: 15.2,
            description: "Significant government investment in clean energy transition"
          }
        ]
      }
    },
    {
      id: "chn",
      name: "China",
      flag: "https://flagcdn.com/cn.svg",
      region: "Asia",
      subregion: "Eastern Asia",
      capital: "Beijing",
      population: 1444216107,
      indicators: {
        gdp: 18450900000000,
        gdpGrowth: 5.7,
        gdpPerCapita: 12784,
        inflation: 1.8,
        unemployment: 5.2,
        publicDebt: 14730000000000,
        debtToGdpRatio: 79.8,
        foreignDirectInvestment: 180000000000,
        tradeBalance: 422000000000,
        currencyCode: "CNY",
        exchangeRate: 7.16,
        creditRatings: {
          sp: "A+",
          moodys: "A1",
          fitch: "A+"
        }
      },
      historicalData: {
        gdp: [
          { date: "2019-01-01", value: 14279900000000 },
          { date: "2020-01-01", value: 14690000000000 },
          { date: "2021-01-01", value: 16770000000000 },
          { date: "2022-01-01", value: 17960000000000 },
          { date: "2023-01-01", value: 18450900000000 }
        ],
        inflation: [
          { date: "2019-01-01", value: 2.9 },
          { date: "2020-01-01", value: 2.5 },
          { date: "2021-01-01", value: 1.8 },
          { date: "2022-01-01", value: 2.0 },
          { date: "2023-01-01", value: 1.8 }
        ],
        unemployment: [
          { date: "2019-01-01", value: 3.6 },
          { date: "2020-01-01", value: 4.2 },
          { date: "2021-01-01", value: 5.1 },
          { date: "2022-01-01", value: 5.5 },
          { date: "2023-01-01", value: 5.2 }
        ],
        exchangeRate: [
          { date: "2019-01-01", value: 6.9 },
          { date: "2020-01-01", value: 6.5 },
          { date: "2021-01-01", value: 6.4 },
          { date: "2022-01-01", value: 6.8 },
          { date: "2023-01-01", value: 7.16 }
        ]
      },
      investmentScore: {
        overall: 86,
        economicStability: 82,
        growthPotential: 90,
        riskFactor: 35,
        sectorOpportunities: [
          {
            sector: "Manufacturing",
            score: 92,
            growthRate: 8.3,
            description: "Advanced manufacturing capabilities and infrastructure"
          },
          {
            sector: "E-commerce",
            score: 95,
            growthRate: 18.5,
            description: "Massive digital economy with continued growth potential"
          },
          {
            sector: "Green Technology",
            score: 88,
            growthRate: 22.1,
            description: "World leader in renewable energy production and technology"
          }
        ]
      }
    },
    {
      id: "jpn",
      name: "Japan",
      flag: "https://flagcdn.com/jp.svg",
      region: "Asia",
      subregion: "Eastern Asia",
      capital: "Tokyo",
      population: 126050804,
      indicators: {
        gdp: 4230000000000,
        gdpGrowth: 1.3,
        gdpPerCapita: 33560,
        inflation: 0.5,
        unemployment: 2.6,
        publicDebt: 9087000000000,
        debtToGdpRatio: 214.8,
        foreignDirectInvestment: 14500000000,
        tradeBalance: -15600000000,
        currencyCode: "JPY",
        exchangeRate: 148.5,
        creditRatings: {
          sp: "A+",
          moodys: "A1",
          fitch: "A"
        }
      },
      historicalData: {
        gdp: [
          { date: "2019-01-01", value: 5082000000000 },
          { date: "2020-01-01", value: 4975000000000 },
          { date: "2021-01-01", value: 4937000000000 },
          { date: "2022-01-01", value: 4231000000000 },
          { date: "2023-01-01", value: 4230000000000 }
        ],
        inflation: [
          { date: "2019-01-01", value: 0.5 },
          { date: "2020-01-01", value: 0.0 },
          { date: "2021-01-01", value: -0.2 },
          { date: "2022-01-01", value: 2.5 },
          { date: "2023-01-01", value: 0.5 }
        ],
        unemployment: [
          { date: "2019-01-01", value: 2.4 },
          { date: "2020-01-01", value: 2.8 },
          { date: "2021-01-01", value: 2.8 },
          { date: "2022-01-01", value: 2.6 },
          { date: "2023-01-01", value: 2.6 }
        ],
        exchangeRate: [
          { date: "2019-01-01", value: 109.5 },
          { date: "2020-01-01", value: 103.5 },
          { date: "2021-01-01", value: 115.1 },
          { date: "2022-01-01", value: 138.5 },
          { date: "2023-01-01", value: 148.5 }
        ]
      },
      investmentScore: {
        overall: 82,
        economicStability: 86,
        growthPotential: 70,
        riskFactor: 18,
        sectorOpportunities: [
          {
            sector: "Robotics",
            score: 94,
            growthRate: 9.5,
            description: "Advanced robotics technology with aging population needs"
          },
          {
            sector: "Healthcare",
            score: 88,
            growthRate: 6.8,
            description: "Sophisticated healthcare system with aging demographic"
          },
          {
            sector: "Entertainment",
            score: 85,
            growthRate: 7.2,
            description: "Global cultural influence in gaming, anime, and entertainment"
          }
        ]
      }
    },
    {
      id: "deu",
      name: "Germany",
      flag: "https://flagcdn.com/de.svg",
      region: "Europe",
      subregion: "Western Europe",
      capital: "Berlin",
      population: 83190556,
      indicators: {
        gdp: 4070000000000,
        gdpGrowth: 0.3,
        gdpPerCapita: 48953,
        inflation: 2.3,
        unemployment: 3.1,
        publicDebt: 2520000000000,
        debtToGdpRatio: 61.9,
        foreignDirectInvestment: 31500000000,
        tradeBalance: 208000000000,
        currencyCode: "EUR",
        exchangeRate: 0.92,
        creditRatings: {
          sp: "AAA",
          moodys: "Aaa",
          fitch: "AAA"
        }
      },
      historicalData: {
        gdp: [
          { date: "2019-01-01", value: 3888000000000 },
          { date: "2020-01-01", value: 3752000000000 },
          { date: "2021-01-01", value: 4075000000000 },
          { date: "2022-01-01", value: 4072000000000 },
          { date: "2023-01-01", value: 4070000000000 }
        ],
        inflation: [
          { date: "2019-01-01", value: 1.4 },
          { date: "2020-01-01", value: 0.5 },
          { date: "2021-01-01", value: 3.1 },
          { date: "2022-01-01", value: 6.9 },
          { date: "2023-01-01", value: 2.3 }
        ],
        unemployment: [
          { date: "2019-01-01", value: 3.2 },
          { date: "2020-01-01", value: 4.2 },
          { date: "2021-01-01", value: 3.6 },
          { date: "2022-01-01", value: 3.0 },
          { date: "2023-01-01", value: 3.1 }
        ],
        exchangeRate: [
          { date: "2019-01-01", value: 0.89 },
          { date: "2020-01-01", value: 0.82 },
          { date: "2021-01-01", value: 0.85 },
          { date: "2022-01-01", value: 0.94 },
          { date: "2023-01-01", value: 0.92 }
        ]
      },
      investmentScore: {
        overall: 88,
        economicStability: 90,
        growthPotential: 78,
        riskFactor: 14,
        sectorOpportunities: [
          {
            sector: "Automotive",
            score: 92,
            growthRate: 5.6,
            description: "Leading automotive innovation and manufacturing excellence"
          },
          {
            sector: "Renewable Energy",
            score: 95,
            growthRate: 14.5,
            description: "Pioneer in clean energy transition with strong government support"
          },
          {
            sector: "Precision Engineering",
            score: 90,
            growthRate: 6.8,
            description: "World-class engineering capabilities and technological innovation"
          }
        ]
      }
    },
    {
      id: "ind",
      name: "India",
      flag: "https://flagcdn.com/in.svg",
      region: "Asia",
      subregion: "Southern Asia",
      capital: "New Delhi",
      population: 1380004385,
      indicators: {
        gdp: 3730000000000,
        gdpGrowth: 7.2,
        gdpPerCapita: 2702,
        inflation: 5.7,
        unemployment: 7.9,
        publicDebt: 2980000000000,
        debtToGdpRatio: 79.9,
        foreignDirectInvestment: 49700000000,
        tradeBalance: -162000000000,
        currencyCode: "INR",
        exchangeRate: 83.45,
        creditRatings: {
          sp: "BBB-",
          moodys: "Baa3",
          fitch: "BBB-"
        }
      },
      historicalData: {
        gdp: [
          { date: "2019-01-01", value: 2870000000000 },
          { date: "2020-01-01", value: 2670000000000 },
          { date: "2021-01-01", value: 3150000000000 },
          { date: "2022-01-01", value: 3510000000000 },
          { date: "2023-01-01", value: 3730000000000 }
        ],
        inflation: [
          { date: "2019-01-01", value: 3.7 },
          { date: "2020-01-01", value: 6.6 },
          { date: "2021-01-01", value: 5.1 },
          { date: "2022-01-01", value: 6.7 },
          { date: "2023-01-01", value: 5.7 }
        ],
        unemployment: [
          { date: "2019-01-01", value: 5.3 },
          { date: "2020-01-01", value: 10.2 },
          { date: "2021-01-01", value: 8.0 },
          { date: "2022-01-01", value: 7.8 },
          { date: "2023-01-01", value: 7.9 }
        ],
        exchangeRate: [
          { date: "2019-01-01", value: 71.3 },
          { date: "2020-01-01", value: 73.5 },
          { date: "2021-01-01", value: 74.5 },
          { date: "2022-01-01", value: 81.8 },
          { date: "2023-01-01", value: 83.45 }
        ]
      },
      investmentScore: {
        overall: 83,
        economicStability: 74,
        growthPotential: 95,
        riskFactor: 42,
        sectorOpportunities: [
          {
            sector: "Technology",
            score: 90,
            growthRate: 15.5,
            description: "Thriving IT sector with skilled workforce and digital transformation"
          },
          {
            sector: "Renewable Energy",
            score: 88,
            growthRate: 25.1,
            description: "Ambitious renewable energy targets with increasing investment"
          },
          {
            sector: "E-commerce",
            score: 92,
            growthRate: 21.8,
            description: "Rapidly growing digital consumer market with increasing penetration"
          }
        ]
      }
    },
    {
      id: "gbr",
      name: "United Kingdom",
      flag: "https://flagcdn.com/gb.svg",
      region: "Europe",
      subregion: "Northern Europe",
      capital: "London",
      population: 67215293,
      indicators: {
        gdp: 3070000000000,
        gdpGrowth: 0.2,
        gdpPerCapita: 45643,
        inflation: 3.9,
        unemployment: 4.2,
        publicDebt: 2680000000000,
        debtToGdpRatio: 87.3,
        foreignDirectInvestment: 24500000000,
        tradeBalance: -145000000000,
        currencyCode: "GBP",
        exchangeRate: 0.79,
        creditRatings: {
          sp: "AA",
          moodys: "Aa3",
          fitch: "AA-"
        }
      },
      historicalData: {
        gdp: [
          { date: "2019-01-01", value: 2850000000000 },
          { date: "2020-01-01", value: 2680000000000 },
          { date: "2021-01-01", value: 3070000000000 },
          { date: "2022-01-01", value: 3060000000000 },
          { date: "2023-01-01", value: 3070000000000 }
        ],
        inflation: [
          { date: "2019-01-01", value: 1.8 },
          { date: "2020-01-01", value: 0.9 },
          { date: "2021-01-01", value: 2.6 },
          { date: "2022-01-01", value: 9.1 },
          { date: "2023-01-01", value: 3.9 }
        ],
        unemployment: [
          { date: "2019-01-01", value: 3.8 },
          { date: "2020-01-01", value: 4.5 },
          { date: "2021-01-01", value: 4.5 },
          { date: "2022-01-01", value: 3.8 },
          { date: "2023-01-01", value: 4.2 }
        ],
        exchangeRate: [
          { date: "2019-01-01", value: 0.76 },
          { date: "2020-01-01", value: 0.73 },
          { date: "2021-01-01", value: 0.73 },
          { date: "2022-01-01", value: 0.82 },
          { date: "2023-01-01", value: 0.79 }
        ]
      },
      investmentScore: {
        overall: 81,
        economicStability: 79,
        growthPotential: 76,
        riskFactor: 25,
        sectorOpportunities: [
          {
            sector: "Financial Services",
            score: 92,
            growthRate: 4.8,
            description: "Global financial hub with strong regulatory framework"
          },
          {
            sector: "Technology",
            score: 85,
            growthRate: 8.5,
            description: "Growing tech ecosystem with focus on fintech and AI"
          },
          {
            sector: "Creative Industries",
            score: 88,
            growthRate: 6.2,
            description: "World-leading creative and cultural sectors with global influence"
          }
        ]
      }
    },
    {
      id: "fra",
      name: "France",
      flag: "https://flagcdn.com/fr.svg",
      region: "Europe",
      subregion: "Western Europe",
      capital: "Paris",
      population: 67391582,
      indicators: {
        gdp: 2780000000000,
        gdpGrowth: 0.9,
        gdpPerCapita: 41250,
        inflation: 2.8,
        unemployment: 7.1,
        publicDebt: 2950000000000,
        debtToGdpRatio: 106.1,
        foreignDirectInvestment: 28900000000,
        tradeBalance: -98000000000,
        currencyCode: "EUR",
        exchangeRate: 0.92,
        creditRatings: {
          sp: "AA",
          moodys: "Aa2",
          fitch: "AA"
        }
      },
      historicalData: {
        gdp: [
          { date: "2019-01-01", value: 2720000000000 },
          { date: "2020-01-01", value: 2600000000000 },
          { date: "2021-01-01", value: 2940000000000 },
          { date: "2022-01-01", value: 2790000000000 },
          { date: "2023-01-01", value: 2780000000000 }
        ],
        inflation: [
          { date: "2019-01-01", value: 1.3 },
          { date: "2020-01-01", value: 0.5 },
          { date: "2021-01-01", value: 2.1 },
          { date: "2022-01-01", value: 5.2 },
          { date: "2023-01-01", value: 2.8 }
        ],
        unemployment: [
          { date: "2019-01-01", value: 8.4 },
          { date: "2020-01-01", value: 8.0 },
          { date: "2021-01-01", value: 7.9 },
          { date: "2022-01-01", value: 7.4 },
          { date: "2023-01-01", value: 7.1 }
        ],
        exchangeRate: [
          { date: "2019-01-01", value: 0.89 },
          { date: "2020-01-01", value: 0.82 },
          { date: "2021-01-01", value: 0.85 },
          { date: "2022-01-01", value: 0.94 },
          { date: "2023-01-01", value: 0.92 }
        ]
      },
      investmentScore: {
        overall: 80,
        economicStability: 82,
        growthPotential: 75,
        riskFactor: 22,
        sectorOpportunities: [
          {
            sector: "Luxury Goods",
            score: 94,
            growthRate: 7.8,
            description: "World-leading luxury brands and fashion industry"
          },
          {
            sector: "Tourism",
            score: 90,
            growthRate: 6.5,
            description: "Premier tourist destination with diverse attractions"
          },
          {
            sector: "Aerospace",
            score: 88,
            growthRate: 5.2,
            description: "Strong aerospace industry with major global players"
          }
        ]
      }
    },
    {
      id: "can",
      name: "Canada",
      flag: "https://flagcdn.com/ca.svg",
      region: "North America",
      subregion: "Northern America",
      capital: "Ottawa",
      population: 38250000,
      indicators: {
        gdp: 2200000000000,
        gdpGrowth: 1.8,
        gdpPerCapita: 57510,
        inflation: 3.1,
        unemployment: 5.5,
        publicDebt: 1890000000000,
        debtToGdpRatio: 85.9,
        foreignDirectInvestment: 42600000000,
        tradeBalance: 25800000000,
        currencyCode: "CAD",
        exchangeRate: 1.35,
        creditRatings: {
          sp: "AAA",
          moodys: "Aaa",
          fitch: "AA+"
        }
      },
      historicalData: {
        gdp: [
          { date: "2019-01-01", value: 1740000000000 },
          { date: "2020-01-01", value: 1640000000000 },
          { date: "2021-01-01", value: 1990000000000 },
          { date: "2022-01-01", value: 2140000000000 },
          { date: "2023-01-01", value: 2200000000000 }
        ],
        inflation: [
          { date: "2019-01-01", value: 1.9 },
          { date: "2020-01-01", value: 0.7 },
          { date: "2021-01-01", value: 3.4 },
          { date: "2022-01-01", value: 6.8 },
          { date: "2023-01-01", value: 3.1 }
        ],
        unemployment: [
          { date: "2019-01-01", value: 5.7 },
          { date: "2020-01-01", value: 9.5 },
          { date: "2021-01-01", value: 7.4 },
          { date: "2022-01-01", value: 5.3 },
          { date: "2023-01-01", value: 5.5 }
        ],
        exchangeRate: [
          { date: "2019-01-01", value: 1.32 },
          { date: "2020-01-01", value: 1.27 },
          { date: "2021-01-01", value: 1.25 },
          { date: "2022-01-01", value: 1.28 },
          { date: "2023-01-01", value: 1.35 }
        ]
      },
      investmentScore: {
        overall: 84,
        economicStability: 88,
        growthPotential: 78,
        riskFactor: 16,
        sectorOpportunities: [
          {
            sector: "Natural Resources",
            score: 92,
            growthRate: 6.8,
            description: "Abundant natural resources and sustainable mining practices"
          },
          {
            sector: "Clean Technology",
            score: 88,
            growthRate: 12.5,
            description: "Growing clean technology sector with government support"
          },
          {
            sector: "Agriculture",
            score: 85,
            growthRate: 4.2,
            description: "Advanced agricultural sector with strong export market"
          }
        ]
      }
    },
    {
      id: "aus",
      name: "Australia",
      flag: "https://flagcdn.com/au.svg",
      region: "Oceania",
      subregion: "Australia and New Zealand",
      capital: "Canberra",
      population: 25690000,
      indicators: {
        gdp: 1675000000000,
        gdpGrowth: 1.9,
        gdpPerCapita: 65220,
        inflation: 4.1,
        unemployment: 3.7,
        publicDebt: 1280000000000,
        debtToGdpRatio: 76.4,
        foreignDirectInvestment: 37800000000,
        tradeBalance: 68500000000,
        currencyCode: "AUD",
        exchangeRate: 1.52,
        creditRatings: {
          sp: "AAA",
          moodys: "Aaa",
          fitch: "AAA"
        }
      },
      historicalData: {
        gdp: [
          { date: "2019-01-01", value: 1390000000000 },
          { date: "2020-01-01", value: 1330000000000 },
          { date: "2021-01-01", value: 1550000000000 },
          { date: "2022-01-01", value: 1640000000000 },
          { date: "2023-01-01", value: 1675000000000 }
        ],
        inflation: [
          { date: "2019-01-01", value: 1.6 },
          { date: "2020-01-01", value: 0.9 },
          { date: "2021-01-01", value: 2.9 },
          { date: "2022-01-01", value: 7.8 },
          { date: "2023-01-01", value: 4.1 }
        ],
        unemployment: [
          { date: "2019-01-01", value: 5.2 },
          { date: "2020-01-01", value: 6.5 },
          { date: "2021-01-01", value: 4.7 },
          { date: "2022-01-01", value: 3.5 },
          { date: "2023-01-01", value: 3.7 }
        ],
        exchangeRate: [
          { date: "2019-01-01", value: 1.42 },
          { date: "2020-01-01", value: 1.30 },
          { date: "2021-01-01", value: 1.28 },
          { date: "2022-01-01", value: 1.38 },
          { date: "2023-01-01", value: 1.52 }
        ]
      },
      investmentScore: {
        overall: 85,
        economicStability: 89,
        growthPotential: 80,
        riskFactor: 15,
        sectorOpportunities: [
          {
            sector: "Mining",
            score: 93,
            growthRate: 7.5,
            description: "World-class mining sector with diverse mineral resources"
          },
          {
            sector: "Education",
            score: 89,
            growthRate: 5.8,
            description: "Leading international education provider with quality institutions"
          },
          {
            sector: "Tourism",
            score: 87,
            growthRate: 8.2,
            description: "Unique natural attractions and strong tourism infrastructure"
          }
        ]
      }
    },
    {
      id: "kor",
      name: "South Korea",
      flag: "https://flagcdn.com/kr.svg",
      region: "Asia",
      subregion: "Eastern Asia",
      capital: "Seoul",
      population: 51740000,
      indicators: {
        gdp: 1710000000000,
        gdpGrowth: 2.4,
        gdpPerCapita: 33060,
        inflation: 2.7,
        unemployment: 3.1,
        publicDebt: 987000000000,
        debtToGdpRatio: 57.7,
        foreignDirectInvestment: 21500000000,
        tradeBalance: 88700000000,
        currencyCode: "KRW",
        exchangeRate: 1315.8,
        creditRatings: {
          sp: "AA",
          moodys: "Aa2",
          fitch: "AA-"
        }
      },
      historicalData: {
        gdp: [
          { date: "2019-01-01", value: 1650000000000 },
          { date: "2020-01-01", value: 1640000000000 },
          { date: "2021-01-01", value: 1800000000000 },
          { date: "2022-01-01", value: 1665000000000 },
          { date: "2023-01-01", value: 1710000000000 }
        ],
        inflation: [
          { date: "2019-01-01", value: 0.4 },
          { date: "2020-01-01", value: 0.5 },
          { date: "2021-01-01", value: 2.5 },
          { date: "2022-01-01", value: 5.1 },
          { date: "2023-01-01", value: 2.7 }
        ],
        unemployment: [
          { date: "2019-01-01", value: 3.8 },
          { date: "2020-01-01", value: 4.0 },
          { date: "2021-01-01", value: 3.7 },
          { date: "2022-01-01", value: 2.9 },
          { date: "2023-01-01", value: 3.1 }
        ],
        exchangeRate: [
          { date: "2019-01-01", value: 1165.7 },
          { date: "2020-01-01", value: 1086.3 },
          { date: "2021-01-01", value: 1185.5 },
          { date: "2022-01-01", value: 1292.4 },
          { date: "2023-01-01", value: 1315.8 }
        ]
      },
      investmentScore: {
        overall: 83,
        economicStability: 85,
        growthPotential: 82,
        riskFactor: 20,
        sectorOpportunities: [
          {
            sector: "Semiconductors",
            score: 95,
            growthRate: 11.2,
            description: "Global leader in semiconductor manufacturing and technology"
          },
          {
            sector: "Entertainment",
            score: 90,
            growthRate: 15.5,
            description: "Thriving K-pop and entertainment industry with global reach"
          },
          {
            sector: "Digital Technology",
            score: 88,
            growthRate: 9.8,
            description: "Advanced digital infrastructure and innovative tech sector"
          }
        ]
      }
    },
    {
      id: "bra",
      name: "Brazil",
      flag: "https://flagcdn.com/br.svg",
      region: "South America",
      subregion: "South America",
      capital: "Brasília",
      population: 214300000,
      indicators: {
        gdp: 1920000000000,
        gdpGrowth: 3.1,
        gdpPerCapita: 8960,
        inflation: 4.6,
        unemployment: 7.8,
        publicDebt: 1680000000000,
        debtToGdpRatio: 87.5,
        foreignDirectInvestment: 61700000000,
        tradeBalance: 58900000000,
        currencyCode: "BRL",
        exchangeRate: 4.95,
        creditRatings: {
          sp: "BB-",
          moodys: "Ba2",
          fitch: "BB"
        }
      },
      historicalData: {
        gdp: [
          { date: "2019-01-01", value: 1880000000000 },
          { date: "2020-01-01", value: 1450000000000 },
          { date: "2021-01-01", value: 1610000000000 },
          { date: "2022-01-01", value: 1880000000000 },
          { date: "2023-01-01", value: 1920000000000 }
        ],
        inflation: [
          { date: "2019-01-01", value: 3.7 },
          { date: "2020-01-01", value: 3.2 },
          { date: "2021-01-01", value: 8.3 },
          { date: "2022-01-01", value: 5.8 },
          { date: "2023-01-01", value: 4.6 }
        ],
        unemployment: [
          { date: "2019-01-01", value: 11.9 },
          { date: "2020-01-01", value: 13.8 },
          { date: "2021-01-01", value: 13.2 },
          { date: "2022-01-01", value: 9.3 },
          { date: "2023-01-01", value: 7.8 }
        ],
        exchangeRate: [
          { date: "2019-01-01", value: 4.02 },
          { date: "2020-01-01", value: 5.19 },
          { date: "2021-01-01", value: 5.40 },
          { date: "2022-01-01", value: 5.22 },
          { date: "2023-01-01", value: 4.95 }
        ]
      },
      investmentScore: {
        overall: 78,
        economicStability: 72,
        growthPotential: 85,
        riskFactor: 45,
        sectorOpportunities: [
          {
            sector: "Agriculture",
            score: 91,
            growthRate: 8.5,
            description: "World-leading agricultural production and exports"
          },
          {
            sector: "Renewable Energy",
            score: 87,
            growthRate: 12.8,
            description: "Extensive renewable energy resources and growing capacity"
          },
          {
            sector: "Fintech",
            score: 85,
            growthRate: 16.5,
            description: "Rapidly growing fintech sector with innovative solutions"
          }
        ]
      }
    }
  ]
};