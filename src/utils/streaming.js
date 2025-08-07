export const simulateDelay = (ms = 1000) => {
    return new Promise(resolve => setTimeout(resolve, ms))
}

// Create a promise that resolves with data after a delay
export const createDelayedPromise = (data, delay = 1000) => {
    return simulateDelay(delay).then(() => data)
}

// Error boundary for handling streaming errors
export class StreamingErrorBoundary extends Error {
    constructor(message, statusCode = 500) {
        super(message)
        this.name = 'StreamingError'
        this.statusCode = statusCode
    }
}

// Retry logic for failed requests
export const withRetry = async (fn, maxRetries = 3, delay = 1000) => {
    let lastError
    
    for (let i = 0; i <= maxRetries; i++) {
        try {
            return await fn()
        } catch (error) {
            lastError = error
            if (i < maxRetries) {
                await simulateDelay(delay * Math.pow(2, i)) // Exponential backoff
            }
        }
    }
    
    throw new StreamingErrorBoundary(`Failed after ${maxRetries} retries: ${lastError.message}`)
}

// Cache for preventing unnecessary re-fetches
const cache = new Map()

export const withCache = (key, fetchFn, ttl = 300000) => { // 5 minutes default TTL
    return async () => {
        const cached = cache.get(key)
        
        if (cached && Date.now() - cached.timestamp < ttl) {
            return cached.data
        }
        
        const data = await fetchFn()
        cache.set(key, { data, timestamp: Date.now() })
        return data
    }
}

// Debounce function for search and other frequent operations
export const debounce = (func, wait) => {
    let timeout
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout)
            func(...args)
        }
        clearTimeout(timeout)
        timeout = setTimeout(later, wait)
    }
}

// Throttle function for scroll events and other high-frequency events
export const throttle = (func, limit) => {
    let inThrottle
    return function() {
        const args = arguments
        const context = this
        if (!inThrottle) {
            func.apply(context, args)
            inThrottle = true
            setTimeout(() => inThrottle = false, limit)
        }
    }
}

// Progressive loading helper
export const createProgressiveLoader = (items, batchSize = 10, delay = 500) => {
    let currentBatch = 0
    const totalBatches = Math.ceil(items.length / batchSize)
    
    return {
        async *loadBatches() {
            while (currentBatch < totalBatches) {
                const start = currentBatch * batchSize
                const end = start + batchSize
                const batch = items.slice(start, end)
                
                if (currentBatch > 0) {
                    await simulateDelay(delay)
                }
                
                currentBatch++
                yield {
                    items: batch,
                    hasMore: currentBatch < totalBatches,
                    currentBatch,
                    totalBatches
                }
            }
        },
        reset() {
            currentBatch = 0
        }
    }
}
