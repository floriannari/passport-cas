import { Strategy as BaseStrategy } from "passport-strategy";
import type express from "express";
type CasInfo = {
    user: string;
    attributes?: {
        [key in string]: string | string[];
    };
};
type VersionOptions = "CAS1.0" | "CAS2.0" | "CAS2.0-with-saml" | "CAS3.0" | "CAS3.0-with-saml";
type VerifyDoneCallback = (err: any, user?: any, info?: any) => void;
type VerifyFunction = (login: CasInfo, done: VerifyDoneCallback) => void;
/** used by {@link performBackChannelSLO} */
declare module "express-session" {
    interface SessionData {
        id?: string;
        passport?: {
            cas?: {
                ticket?: String;
            };
        };
    }
}
export declare class Strategy extends BaseStrategy {
    name: string;
    private version;
    private ssoBaseURL;
    private serverBaseURL?;
    private validateURL;
    private callbackURL?;
    private verify;
    private performBackChannelSLO?;
    constructor(options: {
        version: VersionOptions;
        ssoBaseURL: string;
        serverBaseURL?: string;
        validateURL?: string;
        callbackURL?: string;
        performBackChannelSLO?: boolean;
    }, verify: VerifyFunction);
    authenticate(req: express.Request, options?: {
        /** Preserve the original query parameters. Default true. */
        copyQueryParameters?: boolean;
    }): Promise<void>;
    /**
     * Generate the "service" parameter for the CAS callback URL.
     */
    private service;
}
export default Strategy;
