import { Product } from "@/types";

interface CacheItem<T> {
  data: T;
  timestamp: number;
}

class APICache<T> {
  private cache: Map<string, CacheItem<T>> = new Map();
  private requestCount: number = 0;
  private lastResetTime: number = Date.now();

  constructor(private maxRequests: number, private resetIntervalMs: number) {}

  async get(url: string, fetchFn: () => Promise<T>): Promise<T> {
    this.resetRequestCountIfNeeded();

    const cachedItem = this.cache.get(url);
    if (
      cachedItem &&
      Date.now() - cachedItem.timestamp < this.resetIntervalMs
    ) {
      return cachedItem.data;
    }

    if (this.requestCount >= this.maxRequests) {
      throw new Error("API rate limit exceeded");
    }

    this.requestCount++;
    const data = await fetchFn();
    this.cache.set(url, { data, timestamp: Date.now() });
    return data;
  }

  private resetRequestCountIfNeeded() {
    const now = Date.now();
    if (now - this.lastResetTime >= this.resetIntervalMs) {
      this.requestCount = 0;
      this.lastResetTime = now;
    }
  }
}

const productCache = new APICache<Product>(5, 3600000); // 5 requests per hour

export async function fetchProduct(): Promise<Product> {
  return productCache.get(
    "https://3sb655pz3a.execute-api.ap-southeast-2.amazonaws.com/live/product",
    async () => {
      const response = await fetch(
        "https://3sb655pz3a.execute-api.ap-southeast-2.amazonaws.com/live/product"
      );
      if (!response.ok) {
        throw new Error("Failed to fetch product data");
      }
      return response.json();
    }
  );
}
