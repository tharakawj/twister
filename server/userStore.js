import CachemanFile from "cacheman-file";

const cache = new CachemanFile({});

export default {
  set: (key, value, callback) => {
    cache.set(key, value, 86400 * 30, function(error) {
      if (error) throw error;
      if (callback) callback();
    });
  },

  get: (key, callback) => {
    cache.get(key, function(err, value) {
      if (err) throw err;
      if (callback) callback(value);
    });
  },

  remove: (key, callback) => {
    cache.del(key, function(err) {
      if (err) throw err;
      if (callback) callback();
    });
  }
};
