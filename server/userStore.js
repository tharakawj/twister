const store = {};

export default {
  set: (key, value) => { store[key] = value},
  get: (key) => { return store[key]; },
  remove: (key) => { delete store[key]}
}