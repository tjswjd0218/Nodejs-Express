const Swaggers = require('../controllers/swagger');
const defaultSwagger = require('./defaultSwagger.js');

// 1) 가공하는 코드
const { paths } = Object.values(Swaggers).reduce((acc, apis) => {
    const APIs = Object.values(apis).map((api) => {
        return { ...api };
    });

    APIs.forEach((api) => {
        const key = Object.keys(api)[0];
        if(!acc.paths[key]) {
            acc.paths = {
                ...acc.paths,
                ...api,
            };
        } else {
            acc.paths[key] = {
                ...acc.paths[key],
                ...api[key],
            };
        }
    });
    return acc;
    }, { paths: {} 
});

// 2) 스웨거에 등록할 json 만들기 (defaultSwagger + 1)에서 가공한 paths)
const swaggerDocs = {
    ...defaultSwagger,
    paths,
};

// 3) 스웨거에 등록하는 방법
const options = {
    swaggerOptions: {
        url: "/swagger.json"
    }
};

module.exports = { swaggerDocs, options };