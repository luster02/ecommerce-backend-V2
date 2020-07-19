import { IsNotEmpty } from 'class-validator'
import { RoleType } from '../../role/roletypes.enum';
import { UserDetails } from '../user.detail.entity';

export class UserDto {
    @IsNotEmpty()
    id: number;

    @IsNotEmpty()
    email: string;

    @IsNotEmpty()
    roles: RoleType[];

    @IsNotEmpty()
    details: UserDetails;
}