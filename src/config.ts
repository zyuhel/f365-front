export default {
    api: {
        baseUrl: process.env.API_BASE_URL || 'https://f365.zyuhel.ru',
    },
    imageHost: {
        domain: process.env.IMAGE_HOSTNAME || 'http://f365.zyuhel.ru:3000' // Or use a more specific port if needed
    }
    host: {
        domain: process.env.HOSTNAME || 'http://f365.zyuhel.ru:3000' // Or use a more specific port if needed
    }
};
