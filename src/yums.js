import localforage from "localforage";
import { matchSorter } from "match-sorter";
import sortBy from "sort-by";

// Get all Yums, with optional search query
export async function getYums(query) {
  await fakeNetwork(`getYums:${query}`);
  let yums = await localforage.getItem("yums");
  if (!yums) yums = [];
  if (query) {
    yums = matchSorter(yums, query, { keys: ["name", "type"] });
  }
  return yums.sort(sortBy("createdAt"));
}

// Create a new Yum
export async function createYum() {
  await fakeNetwork();
  let id = Math.random().toString(36).substring(2, 9); // Unique ID
  let yum = { id, createdAt: Date.now() }; // Default values
  let yums = await getYums();
  yums.unshift(yum); // Add to the start of the list
  await setYums(yums); // Save to localforage
  return yum;
}

// Get a specific Yum by ID
export async function getYum(id) {
  await fakeNetwork(`yum:${id}`);
  let yums = await localforage.getItem("yums");
  let yum = yums.find((y) => y.id === id);
  return yum ?? null;
}

// Update a Yum by ID
export async function updateYum(id, updates) {
  await fakeNetwork();
  let yums = await localforage.getItem("yums");
  let yum = yums.find((y) => y.id === id);
  if (!yum) throw new Error("No Yum found for ID: " + id);
  Object.assign(yum, updates); // Apply updates
  await setYums(yums); // Save changes
  return yum;
}

// Delete a Yum by ID
export async function deleteYum(id) {
  let yums = await localforage.getItem("yums");
  let index = yums.findIndex((y) => y.id === id);
  if (index > -1) {
    yums.splice(index, 1); // Remove from list
    await setYums(yums); // Save to localforage
    return true;
  }
  return false;
}

// Save Yums to localforage
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

  fakeCache[key] = true;
  return new Promise((resolve) => {
    setTimeout(resolve, Math.random() * 800); // Random network delay
  });
}
