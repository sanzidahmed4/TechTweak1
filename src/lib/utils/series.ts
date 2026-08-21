export function getSeriesName(phoneName: string, brandName: string): string {
  if (!phoneName) return 'Other Models';
  const nameStr = phoneName.trim();
  const bName = brandName ? brandName.trim() : '';

  // Special cases for Apple
  if (nameStr.toLowerCase().includes('iphone se')) return 'iPhone SE Series';
  if (nameStr.toLowerCase().includes('iphone x')) return 'iPhone X Series';

  // Special cases for Samsung Foldables
  if (nameStr.toLowerCase().includes('z fold')) return 'Galaxy Z Fold Series';
  if (nameStr.toLowerCase().includes('z flip')) return 'Galaxy Z Flip Series';
  
  // Special cases for OnePlus Nord
  if (nameStr.toLowerCase().includes('nord ce')) {
    const nordMatch = nameStr.match(/nord ce ?\d*/i);
    if (nordMatch) {
       // e.g. "OnePlus Nord CE4" -> "Nord CE4 Series"
       return `OnePlus ${nordMatch[0]} Series`;
    }
    return 'OnePlus Nord Series';
  }

  // Generic prefix up to the first number sequence
  // Matches everything until the end of the first contiguous group of digits.
  // E.g., "iPhone 17 Pro Max" -> "iPhone 17"
  // E.g., "Samsung Galaxy S24 Ultra" -> "Samsung Galaxy S24"
  const match = nameStr.match(/^[^\d]+\d+/);
  
  if (match) {
    let series = match[0].trim();
    
    // Clean up if it starts with the brand name to avoid redundancy
    // e.g. "Samsung Galaxy S26" -> "Galaxy S26"
    if (bName && series.toLowerCase().startsWith(bName.toLowerCase())) {
      series = series.substring(bName.length).trim();
    }
    
    return series + ' Series';
  }

  return 'Other Models';
}
