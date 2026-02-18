function convertToRoman(num) {
  // Handle zero case
  if (num === 0) return "";
  
  // Define symbols for standard Roman numerals
  const symbols = [
    ['M', 1000],
    ['CM', 900],
    ['D', 500],
    ['CD', 400],
    ['C', 100],
    ['XC', 90],
    ['L', 50],
    ['XL', 40],
    ['X', 10],
    ['IX', 9],
    ['V', 5],
    ['IV', 4],
    ['I', 1]
  ];
  
  let result = '';
  let remaining = num;
  
  // Standard conversion for numbers < 4000
  if (num < 4000) {
    for (let i = 0; i < symbols.length; i++) {
      const [symbol, value] = symbols[i];
      while (remaining >= value) {
        result += symbol;
        remaining -= value;
      }
    }
    return result;
  }
  
  // For numbers >= 4000, we need to handle thousands with vinculum (bar)
  // Break the number into groups of 3 digits from the right
  const numStr = num.toString();
  const groups = [];
  
  // Split into groups of 3 from the right
  for (let i = numStr.length; i > 0; i -= 3) {
    const start = Math.max(0, i - 3);
    groups.unshift(parseInt(numStr.substring(start, i)));
  }
  
  // Process each group
  for (let i = 0; i < groups.length; i++) {
    const groupValue = groups[i];
    if (groupValue === 0) continue;
    
    // Convert the group to Roman numerals
    let groupRoman = '';
    let tempNum = groupValue;
    
    for (let j = 0; j < symbols.length; j++) {
      const [symbol, value] = symbols[j];
      while (tempNum >= value) {
        groupRoman += symbol;
        tempNum -= value;
      }
    }
    
    // Add vinculum (bar) for thousands groups (except the last group)
    if (i < groups.length - 1) {
      // Add bar above each character
      groupRoman = groupRoman.split('').map(char => char + '\u0305').join('');
    }
    
    result += groupRoman;
  }
  
  return result;
}
}