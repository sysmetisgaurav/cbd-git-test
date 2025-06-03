import { PublicClientApplication } from "@azure/msal-browser";

const MSAL_CONFIG = {
    auth: {
        clientId: "330fc1bc-e794-4942-b4d1-ad4867a1970c",
        // authority: "https://login.microsoftonline.com/[REPLACE_WITH_YOUR_TENANT_NAME].onmicrosoft.com",
        redirectUri: "http://localhost:5173",
    },
    cache: {
        cacheLocation: "localStorage",
        storeAuthStateInCookie: false,
    },
};

const LOGIN_REQUEST = {
    scopes: ["openid", "offline_access"]
};

const TOKEN_REQUEST = {
    scopes: ["User.ReadWrite.All"]
};

const GRAPH_CONFIG = {
    graphUsersEndpoint: "https://graph.microsoft.com/v1.0/users"
};

const PUBLIC_CLIENT_APPLICATION = new PublicClientApplication(MSAL_CONFIG);
async function initializeMsal() {
    await PUBLIC_CLIENT_APPLICATION.initialize();
}
initializeMsal();

export {
    MSAL_CONFIG,
    LOGIN_REQUEST,
    TOKEN_REQUEST,
    GRAPH_CONFIG,
    PUBLIC_CLIENT_APPLICATION
};