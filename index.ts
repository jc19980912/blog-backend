import express from 'express';

import {backendSetup, databaseSetup} from './src/setup';

const app = express();

databaseSetup(() => {
    backendSetup(app);
});