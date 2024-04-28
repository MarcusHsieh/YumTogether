import localforage from "localforage";
import { matchSorter } from "match-sorter";
import sortBy from "sort-by";

// Get all Yums with optional search query
export async function getYums(query) {
  await fakeNetwork(`getYums:${query}`);
  let yums = await localforage.getItem("yums");
  if (!yums) yums = [];
  
  // Use matchSorter for flexible search
  if (query) {
    yums = matchSorter(yums, query, { keys: ["yumName", "restaurantName"] });
  }
  
  return yums.sort(sortBy("createdAt")); // Sort by creation time
}

// Create a new Yum with given data
export async function createYum(data = {}) {
  await fakeNetwork();
  const id = Math.random().toString(36).substring(2, 9); // Unique ID
  const createdAt = Date.now(); // Current timestamp
  
  // Initialize a new Yum with default values and provided data
  const yum = {
    id,
    createdAt,
    ...data,
  };

  const yums = await getYums();
  yums.unshift(yum); // Add the new Yum to the start of the list
  
  // Save to localforage
  await setYums(yums);
  return yum; // Return the created Yum
}

// Get a specific Yum by ID
export async function getYum(id) {
  await fakeNetwork(`yum:${id}`);
  const yums = await localforage.getItem("yums");
  return yums.find(y => y.id === id) || null; // Return null if not found
}

// Update a Yum with given updates
export async function updateYum(id, updates) {
  await fakeNetwork();
  const yums = await localforage.getItem("yums");
  const yum = yums.find(y => y.id === id);
  
  if (!yum) {
    throw new Error(`No Yum found with ID: ${id}`);
  }

  // Apply updates to the Yum
  Object.assign(yum, updates);
  
  // Save updated list to localforage
  await setYums(yums);
  return yum; // Return the updated Yum
}

// Delete a Yum by ID
export async function deleteYum(id) {
  const yums = await localforage.getItem("yums");
  const index = yums.findIndex(y => y.id === id);

  if (index >= 0) {
    yums.splice(index, 1); // Remove the Yum
    await setYums(yums); // Save changes
    return true; // Successfully deleted
  }

  return false; // Could not find the Yum
}

// Save the list of Yums to localforage
function setYums(yums) {
  return localforage.setItem("yums", yums);
}

// Simulate a network delay for caching
let fakeCache = {};

async function fakeNetwork(key) {
  if (!key) {
    fakeCache = {};
  }

  if (fakeCache[key]) {
    return;
  }

  fakeCache[key] = true; // Mark the key as cached
  return new Promise((resolve) => {
    setTimeout(resolve, Math.random() * 800); // Random delay to simulate network latency
  });
}
