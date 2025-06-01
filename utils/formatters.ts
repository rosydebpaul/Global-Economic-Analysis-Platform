/**
 * Formats a number as a percentage string
 */
export const formatPercentage = (value: number): string => {
  const sign = value > 0 ? '+' : '';
  return `${sign}${value.toFixed(1)}%`;
};

/**
 * Formats a number as a currency string
 */
export const formatCurrency = (value: number): string => {
  if (value >= 1000000000000) {
    return `$${(value / 1000000000000).toFixed(1)}T`;
  } else if (value >= 1000000000) {
    return `$${(value / 1000000000).toFixed(1)}B`;
  } else if (value >= 1000000) {
    return `$${(value / 1000000).toFixed(1)}M`;
  } else {
    return `$${value.toLocaleString()}`;
  }
};

/**
 * Formats a number with commas for thousands
 */
export const formatNumber = (value: number): string => {
  return value.toLocaleString();
};

/**
 * Formats a date string to a human-readable format
 */
export const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
};

/**
 * Shortens a number to a readable format (K, M, B, T)
 */
export const shortenNumber = (num: number): string => {
  if (num >= 1000000000000) {
    return (num / 1000000000000).toFixed(1) + 'T';
  } else if (num >= 1000000000) {
    return (num / 1000000000).toFixed(1) + 'B';
  } else if (num >= 1000000) {
    return (num / 1000000).toFixed(1) + 'M';
  } else if (num >= 1000) {
    return (num / 1000).toFixed(1) + 'K';
  } else {
    return num.toString();
  }
};