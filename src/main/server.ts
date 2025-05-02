import moduleAlias from 'module-alias'

moduleAlias.addAlias('@', __dirname + '/../../src')

import { createApp } from "./config/app";

process.env.SECRET_KEY = '123456'
const app = createApp()
const port = 5050
app.listen(port, () => console.log(`Server running on http://localhost:${port}`))