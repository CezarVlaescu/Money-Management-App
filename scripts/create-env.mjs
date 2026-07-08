import { mkdirSync, writeFileSync } from 'node:fs';

const requiredVariables = [
  'SUPABASE_URL',
  'SUPABASE_PUBLISHABLE_KEY'
];

for (const variable of requiredVariables) {
  if (!process.env[variable]) {
    throw new Error(`Missing environment variable: ${variable}`);
  }
}

const environmentFileContent = `export const environment = {
  production: true,
  supabaseUrl: '${process.env.SUPABASE_URL}',
  supabasePublishableKey: '${process.env.SUPABASE_PUBLISHABLE_KEY}'
};
`;

mkdirSync('src/environments', { recursive: true });
writeFileSync('src/environments/environment.prod.ts', environmentFileContent);

console.log('Production environment file generated.');