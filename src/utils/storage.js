const STORAGE_PREFIX = 'coserve_sih_';

export function loadFromStorage(key, fallback) {
  try {
    const item = localStorage.getItem(STORAGE_PREFIX + key);
    return item ? JSON.parse(item) : fallback;
  } catch (e) {
    console.warn(`Storage load error for ${key}:`, e);
    return fallback;
  }
}

export function saveToStorage(key, value) {
  try {
    localStorage.setItem(STORAGE_PREFIX + key, JSON.stringify(value));
  } catch (e) {
    console.warn(`Storage save error for ${key}:`, e);
  }
}
