"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const supertokens_node_1 = __importDefault(require("supertokens-node"));
const session_1 = __importDefault(require("supertokens-node/recipe/session"));
const express_2 = require("supertokens-node/recipe/session/framework/express");
const express_3 = require("supertokens-node/framework/express");
const emailpassword_1 = __importDefault(require("supertokens-node/recipe/emailpassword"));
const dashboard_1 = __importDefault(require("supertokens-node/recipe/dashboard"));
const userroles_1 = __importDefault(require("supertokens-node/recipe/userroles"));
require("dotenv/config");
// Dotenv is a zero-dependency module that loads environment variables
// from a .env file into process.env. Storing configuration in the environment
// separate from code is based on The Twelve-Factor App methodology.
// Ref: https://www.npmjs.com/package/dotenv
const apiPort = process.env.VUE_APP_API_PORT || 3002;
const apiDomain = process.env.VUE_APP_API_URL || `http://localhost:${apiPort}`;
const websitePort = process.env.VUE_APP_WEBSITE_PORT || 5173;
const websiteDomain = process.env.VUE_APP_WEBSITE_URL || `http://localhost:${websitePort}`;
supertokens_node_1.default.init({
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
        emailpassword_1.default.init(),
        session_1.default.init(),
        dashboard_1.default.init(),
        userroles_1.default.init(),
    ],
});
const app = (0, express_1.default)();
app.use((0, cors_1.default)({
    origin: websiteDomain,
    allowedHeaders: ["content-type", ...supertokens_node_1.default.getAllCORSHeaders()],
    methods: ["GET", "PUT", "POST", "DELETE"],
    credentials: true,
}));
app.use((0, express_3.middleware)());
// custom API that requires session verification
app.get("/sessioninfo", (0, express_2.verifySession)(), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let session = req.session;
    res.send({
        sessionHandle: session.getHandle(),
        userId: session.getUserId(),
        accessTokenPayload: session.getAccessTokenPayload(),
    });
}));
app.use((0, express_3.errorHandler)());
// app.use((err: any, req: any, res: any, next: any) => {
//     res.status(500).send("Internal error: " + err.message);
// });
app.listen(apiPort, () => console.log(`SuperTokens API Server listening on port ${apiPort}`));
