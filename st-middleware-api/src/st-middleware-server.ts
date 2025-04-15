import express from "express";
import cors from "cors";
import supertokens from "supertokens-node";
import Session from "supertokens-node/recipe/session";
import { verifySession } from "supertokens-node/recipe/session/framework/express";
import { middleware, errorHandler, SessionRequest } from "supertokens-node/framework/express";
import EmailPassword from "supertokens-node/recipe/emailpassword";
import Dashboard from "supertokens-node/recipe/dashboard";
import UserRoles from "supertokens-node/recipe/userroles";
import 'dotenv/config'

// Dotenv is a zero-dependency module that loads environment variables
// from a .env file into process.env. Storing configuration in the environment
// separate from code is based on The Twelve-Factor App methodology.
// Ref: https://www.npmjs.com/package/dotenv

const apiPort = process.env.VUE_APP_API_PORT || 3002;
const apiDomain = process.env.VUE_APP_API_URL || `http://localhost:${apiPort}`;
const websitePort = process.env.VUE_APP_WEBSITE_PORT || 5173;
const websiteDomain = process.env.VUE_APP_WEBSITE_URL || `http://localhost:${websitePort}`;

supertokens.init({
    // framework: "express",
    // debug: true,
    supertokens: {
        // connectionURI: "https://try.supertokens.com", This is a core hosted for demo/testing purposes.
        connectionURI: "http://st-core:3567",
        // apiKey: "",
    },
    appInfo: {
        appName: "VueJS SuperTokens Auth", 
        apiDomain, 
        websiteDomain, 
        apiBasePath: "/auth",
        websiteBasePath: "/auth",
    },
    recipeList: [
        EmailPassword.init(),
        Session.init(),
        Dashboard.init(),
        UserRoles.init(),
    ],
});

const app = express();

app.use(
    cors({
        origin: websiteDomain, 
        allowedHeaders: ["content-type", ...supertokens.getAllCORSHeaders()],
        methods: ["GET", "PUT", "POST", "DELETE"],
        credentials: true,
    })
);

app.use(middleware());

// custom API that requires session verification
app.get("/sessioninfo", verifySession(), async (req: SessionRequest, res) => {
    let session = req.session;
    res.send({
        sessionHandle: session!.getHandle(),
        userId: session!.getUserId(),
        accessTokenPayload: session!.getAccessTokenPayload(),
    });
});

app.use(errorHandler());

// app.use((err: any, req: any, res: any, next: any) => {
//     res.status(500).send("Internal error: " + err.message);
// });

app.listen(apiPort, () => console.log(`SuperTokens API Server listening on port ${apiPort}`));