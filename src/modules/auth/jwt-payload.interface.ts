import { RoleType } from "../role/roletypes.enum";

export interface IJwtPayload {
    id: number
    username: string
    email: string
    role: RoleType[]
    iat?: Date
}