module.exports = {
  apps: [
    {
      name: "noodle-server",
      script: "npm",
      args: 'run dev',
      autorestart: true,
      watch: false,
      cwd: './server',
      max_memory_restart: "1G",
      env: {
        NODE_ENV: "development",
        PORT: 3000,
      },
    },
    {
      name: 'noodle-client',
      script: 'npm',
      args: 'run serve',
      cwd: './client',
      autorestart: true,
      env: {
        NODE_ENV: 'development',
      }
    }
 
  ],
};
