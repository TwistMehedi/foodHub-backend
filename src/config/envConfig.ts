interface EnvConfig {
  port: number | string;
}

const envConfig: EnvConfig = {
  port: process.env.PORT || 5000,
};

export default envConfig;
