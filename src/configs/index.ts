const { env } = process;
export const config = () => ({
  host: env.HOST || 'localhost',
  port: Number(env.PORT) || 3000,
  prod: Boolean(Number(env.PROD)) || false,
});
