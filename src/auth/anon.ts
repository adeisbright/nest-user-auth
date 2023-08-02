import { SetMetadata } from "@nestjs/common";

export const IS_ANON_KEY = "isAnon"
export const PUBLIC = () => SetMetadata(IS_ANON_KEY , true)