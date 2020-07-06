module.exports = {
  apps: [
    {
      name: "CTE",
      script: "bin/www",
      autorestart: true,
			watch: false,
			cwd: './server',
      max_memory_restart: "1G",
      env: {
        NODE_ENV: "production",
        PORT: 3000,
      },
    },
  ],
};
