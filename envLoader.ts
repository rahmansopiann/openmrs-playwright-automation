import { devConfig } from './env.dev';
import { stagingConfig } from './env.staging';

type EnvType = 'dev' | 'staging' ;

export function loadConfig(env: EnvType) {
  switch (env) {
    case 'dev':
      return devConfig;
    case 'staging':
      return stagingConfig;
    default:
      throw new Error(`Unknown environment: ${env}`);
  }
}
