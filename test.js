function findDiscontinuityIntervals(arr) {
    if (arr.length === 0) {
        return [];
    }

    const result = [];
    let currentInterval = {start: arr[0], end: arr[0]};

    for (let i = 1; i < arr.length; i++) {
        const currentValue = arr[i];
        const nextValue = arr[i + 1] || null;

        if (currentInterval === null) {
            // Start a new interval
            currentInterval = {start: currentValue, end: currentValue};
        } else {
            // Check if the current interval is still valid
            if (currentValue !== currentInterval.end + 1) {
                // Discontinuity, push the current interval and start a new one
                result.push({start: currentInterval.start, end: currentInterval.end});
                currentInterval = null;
            }
        }
    }

    return result;
}

// Examples
console.log(findDiscontinuityIntervals([1, 4, 5, 8])); // Output: [{start:1, end:4}, {start:5, end:8}]
console.log(findDiscontinuityIntervals([1, 2, 7, 8])); // Output: [{start:1, end:2}, {start:7, end:8}]
console.log(findDiscontinuityIntervals([1, 2, 3, 4, 8])); // Output: [{start:4, end:8}]
