// async-storage.js
const mockAsyncStorage = {
    getItem: jest.fn((key) => Promise.resolve(null)),
    setItem: jest.fn((key, value) => Promise.resolve()),
    removeItem: jest.fn((key) => Promise.resolve()),
    clear: jest.fn(() => Promise.resolve()),
  };
  
  export default mockAsyncStorage;