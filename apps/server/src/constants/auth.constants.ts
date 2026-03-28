import { ENV_CONFIG } from "@/config/env";
import ms, { StringValue } from "ms";


const REFRESH_TTL = ENV_CONFIG.REFRESH_TOKEN_TTL as StringValue;
const ACCESS_TTL = ENV_CONFIG.ACCESS_TOKEN_TTL as StringValue;

export const REFRESH_TOKEN_COOKIE_TTL = ms(REFRESH_TTL);
export const REFRESH_TOKEN_JWT_TTL = REFRESH_TTL
export const ACCESS_TOKEN_JWT_TTL = ACCESS_TTL;

export const VERIFICATION_CODE_TTL = ms('10m');