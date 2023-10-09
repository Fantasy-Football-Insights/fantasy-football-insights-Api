import { SetMetadata } from "@nestjs/common";

// This is used to mark a route as public. This bypasses the auth guard.
export const IS_PUBLIC_KEY = "isPublic";
export const Public = () => SetMetadata(IS_PUBLIC_KEY, true);
