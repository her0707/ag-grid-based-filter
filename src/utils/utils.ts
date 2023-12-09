import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

type FindItemReturnType = AdvancedFilterModel & {
  index?: number;
};

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function generateUniqueId() {
  const timestamp = Date.now().toString(36);
  const randomString = Math.random().toString(36).substr(2, 5);
  return timestamp + randomString;
}

export function findItem(items: AdvancedFilterModel[], id: string, withIndex?: boolean): FindItemReturnType | null {
  let item: AdvancedFilterModel | null = null;

  for (var i = 0; i < items.length; i++) {
    item = items[i];
    if (item.id === id) {
      return withIndex ? { ...item, index: i } : item;
    }

    if ("conditions" in item) {
      item = item.conditions && findItem(item.conditions, id, withIndex);

      if (item) {
        return item;
      }
    }
  }

  return null;
}
