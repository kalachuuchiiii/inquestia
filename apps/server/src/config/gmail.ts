

import { google } from 'googleapis';
import { ENV_CONFIG } from './env';

const oauth2Client = new google.auth.OAuth2(
  ENV_CONFIG.OAUTH_CLIENT_ID,
  ENV_CONFIG.OAUTH_CLIENT_SECRET,
  "https://developers.google.com/oauthplayground"
);

oauth2Client.setCredentials({
    refresh_token: ENV_CONFIG.OAUTH_REFRESH_TOKEN,
})


const gmail = google.gmail({ version: 'v1', auth: oauth2Client });

export default gmail;