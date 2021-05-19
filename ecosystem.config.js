module.exports = {
  apps: [
    {
      name: "noodle-server",
      script: "npm",
      args: 'start',
      autorestart: true,
      watch: false,
      cwd: './server',
      max_memory_restart: "1G",
      env: {
        NODE_ENV: "production",
        PORT: 6000,
      },
    },
  ],
};
