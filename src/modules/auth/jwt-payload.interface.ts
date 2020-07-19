import { RoleType } from "../role/roletypes.enum";

export interface IJwtPayload {
    id: number
    email: string
    role: RoleType[]
    iat?: Date
}