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

const environmentContent = `export const environment = {
  production: true,
  supabaseUrl: '${process.env.SUPABASE_URL}',
  supabasePublishableKey: '${process.env.SUPABASE_PUBLISHABLE_KEY}'
};
`;

mkdirSync('src/environments', { recursive: true });

writeFileSync('src/environments/environment.ts', environmentContent);
writeFileSync('src/environments/environment.prod.ts', environmentContent);

console.log('Production environment files generated.');
console.log('SUPABASE_URL exists:', Boolean(process.env.SUPABASE_URL));
console.log('SUPABASE_PUBLISHABLE_KEY exists:', Boolean(process.env.SUPABASE_PUBLISHABLE_KEY));