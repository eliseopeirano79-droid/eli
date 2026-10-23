import {redirectLegacyLocation} from './elix-migration.js';
if(!await redirectLegacyLocation())await import('./app.js');
