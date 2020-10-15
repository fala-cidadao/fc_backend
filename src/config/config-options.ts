import { join } from "path"

const config = 'development.env';
const configPath = join(process.cwd(), '/src/environments', config);

export const configOptions = {
    isGlobal: true,
    envFilePath: configPath
};