// The admin API client is the easiest way to use the API
const GhostAdminAPI = require('@tryghost/admin-api');

// Configure the client
const api = new GhostAdminAPI({
  url: 'https://ghost-production-93c7.up.railway.app',
  key: '63fef4934b3a0e00258c7d83:f2808942dca363647036b0731870c7044493a567583e4ed4f812c3e2e9a88f0c',
  version: 'v3',
});

export { api };
