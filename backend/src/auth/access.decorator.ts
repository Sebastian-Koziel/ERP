import { SetMetadata } from "@nestjs/common";
import { Access } from "./access.enum";

export const Access_decorator = (access:Access) => SetMetadata('access', access);