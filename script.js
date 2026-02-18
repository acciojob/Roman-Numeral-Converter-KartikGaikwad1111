function convertToRoman(num) {
    if (num === 0) return "";
    
    const symbols = [
        ['M', 1000],
        ['D', 500],
        ['C', 100],
        ['L', 50],
        ['X', 10],
        ['V', 5],
        ['I', 1]
    ];
    
    // Handle numbers >= 4000 by breaking into thousands groups
    if (num >= 4000) {
        let result = '';
        const numStr = num.toString();
        
        // Group digits from left to right in groups of 3 (thousands)
        for (let i = 0; i < numStr.length; i += 3) {
            const group = numStr.slice(i, i + 3);
            const groupNum = parseInt(group);
            
            if (groupNum > 0) {
                // Determine the place value of this group
                const placeValue = Math.pow(1000, Math.floor((numStr.length - i - 1) / 3));
                
                // Convert the group number to Roman numerals
                let groupRoman = '';
                let tempNum = groupNum;
                
                // Standard conversion for numbers < 4000
                for (let j = 0; j < symbols.length; j++) {
                    const [symbol, value] = symbols[j];
                    
                    // Handle subtractive notation (4s and 9s)
                    if (j < symbols.length - 1) {
                        const nextValue = symbols[j + 1][1];
                        if (j % 2 === 0) { // For powers of 10 (M, C, X, I)
                            const subtractiveValue = value - symbols[j + 1][1];
                            if (tempNum >= subtractiveValue && tempNum < value && value / nextValue === 2) {
                                groupRoman += symbols[j + 1][0] + symbol;
                                tempNum -= subtractiveValue;
                                continue;
                            }
                        }
                    }
                    
                    // Handle next subtractive possibility (like 90 = XC, 40 = XL)
                    if (j < symbols.length - 2 && j % 2 === 1) {
                        const nextValue = symbols[j + 2][1];
                        if (value / nextValue === 5) {
                            const subtractiveValue = value - nextValue;
                            if (tempNum >= subtractiveValue && tempNum < value) {
                                groupRoman += symbols[j + 2][0] + symbol;
                                tempNum -= subtractiveValue;
                                continue;
                            }
                        }
                    }
                    
                    // Standard addition
                    while (tempNum >= value) {
                        groupRoman += symbol;
                        tempNum -= value;
                    }
                }
                
                // Add overscore for thousands groups
                if (placeValue > 1) {
                    result += groupRoman.split('').map(char => char + '\u0305').join('');
                } else {
                    result += groupRoman;
                }
            }
        }
        
        return result;
    }
    
    // Handle numbers < 4000 with standard conversion
    let result = '';
    let tempNum = num;
    
    for (let i = 0; i < symbols.length; i++) {
        const [symbol, value] = symbols[i];
        
        // Handle subtractive notation (4s and 9s)
        if (i < symbols.length - 1) {
            const nextValue = symbols[i + 1][1];
            if (i % 2 === 0) { // For powers of 10 (M, C, X, I)
                const subtractiveValue = value - symbols[i + 1][1];
                if (tempNum >= subtractiveValue && tempNum < value && value / nextValue === 2) {
                    result += symbols[i + 1][0] + symbol;
                    tempNum -= subtractiveValue;
                    continue;
                }
            }
        }
        
        // Handle next subtractive possibility (like 90 = XC, 40 = XL)
        if (i < symbols.length - 2 && i % 2 === 1) {
            const nextValue = symbols[i + 2][1];
            if (value / nextValue === 5) {
                const subtractiveValue = value - nextValue;
                if (tempNum >= subtractiveValue && tempNum < value) {
                    result += symbols[i + 2][0] + symbol;
                    tempNum -= subtractiveValue;
                    continue;
                }
            }
        }
        
        // Standard addition
        while (tempNum >= value) {
            result += symbol;
            tempNum -= value;
        }
    }
    
    return result;
}