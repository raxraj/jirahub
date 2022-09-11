const router = require('express').Router();
const axios = require('axios');
const qs = require('query-string');

router.get('/', function (request, response) {
    const githubOAuthUrl = 'https://github.com/login/oauth/authorize';

    const stringifiedParams = qs.stringify({
        client_id: process.env.GITHUB_CLIENT_ID,
        redirect_uri: process.env.GITHUB_REDIRECT_URI,
        scope: 'repo',
        state: process.env.GITHUB_STATE
    });

    response.redirect(`${githubOAuthUrl}?${stringifiedParams}`);
});

router.get('/github-redirect', async function ( request, response ){
    const githubTokenUrl = 'https://github.com/login/oauth/access_token';
    const { code } = request.query;
    const { data } = await axios(githubTokenUrl,{
        method: 'POST',
        data: {
            client_id: process.env.GITHUB_CLIENT_ID,
            client_secret: process.env.GITHUB_CLIENT_SECRET,
            code,
            redirect_uri: process.env.GITHUB_REDIRECT_URI
        }
    });
    console.log(JSON.stringify(data));
    return response.status(200).json({ error: false, data, message: "Access code generated." });
    
});

module.exports = router;