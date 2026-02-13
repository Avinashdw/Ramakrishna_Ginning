// Static Admin Credentials Configuration
// Credentials are stored in environment variables for security
// Fallback values are provided in case environment variables are not loaded

export const ADMIN_CREDENTIALS = {
    email: import.meta.env.VITE_ADMIN_EMAIL || 'Admin@ramakrishna.com',
    password: import.meta.env.VITE_ADMIN_PASSWORD || 'Ramakrishna@7030'
};

// Admin user data structure
export const ADMIN_USER_DATA = {
    uid: 'admin-ramakrishna-2004',
    email: import.meta.env.VITE_ADMIN_EMAIL || 'Admin@ramakrishna.com',
    name: 'Administrator',
    role: 'admin',
    createdAt: '2004-01-01T00:00:00.000Z'
};
