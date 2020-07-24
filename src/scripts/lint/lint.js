const spawn = require('cross-spawn');

spawn.sync(`eslint --ext .js --ext .jsx --ext .ts --ext .tsx ${process.argv.slice(2)} .`, { stdio: 'inherit' });
