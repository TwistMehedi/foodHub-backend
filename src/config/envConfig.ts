interface EnvConfig {
  port: number | string;
  node_env: string | undefined;
}

const envConfig: EnvConfig = {
  port: process.env.PORT || 5000,
  node_env: process.env.NODE_ENV,
};

export default envConfig;
