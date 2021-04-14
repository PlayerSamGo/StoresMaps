(() => {
    'use strict';

    const FS = require('fs');
    const path = require('path');

    const tsOutput = path.join('.','scripts','setConfig.json');

    let entrance = process.argv[2] ? process.argv[2].toLowerCase() : '';
    let env = (entrance === 'production' || entrance === 'prod' || entrance === 'p') ? 'production' :
              (entrance === 'qa' || entrance === 'q' ) ? 'qa' :
              (entrance === 'testing' || entrance === 't' ) ? 'testing' : 'development';

    let configFile = 'config.json';

    let config;
    switch (env) {
        case "production":
            config = JSON.parse(FS.readFileSync(configFile)).production;
            break;
        case "qa":
            config = JSON.parse(FS.readFileSync(configFile)).qa;
            break;
        case "testing":
            config = JSON.parse(FS.readFileSync(configFile)).testing;
            break;
        default:
            config = JSON.parse(FS.readFileSync(configFile)).development;
            break;
    }

    let content = `${JSON.stringify(config, null, 4)}`;

    FS.writeFile(tsOutput, content,(errors)=>{
        if(errors){
            console.error("Errors save setConfig.json "+errors);
        }
    });

    console.log(` -- Configured proyect for env [${env}] `);
    return;
})();
