import { connect as connectDatabase } from './database';
import { start as startServing } from './http';

connectDatabase();
startServing();