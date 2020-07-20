import { Repository, EntityRepository, getConnection } from "typeorm";
import { User } from "../user/user.entity";
import { SignupDto } from "./dto";
import { RoleRepository } from "../role/role.repository";
import { Role } from "../role/role.entity";
import { RoleType } from "../role/roletypes.enum";
import { UserDetails } from "../user/user.detail.entity";
import { genSalt, hash } from "bcryptjs";
import { Shop } from "../shop/shop.entity";

@EntityRepository(User)
export class AuthRepository extends Repository<User> {

    async signup(signupDto: SignupDto) {
        const { password, email } = signupDto
        const user = new User()
        user.email = email

        const roleRepository: RoleRepository = getConnection().getRepository(Role)
        const defaultRole: Role = await roleRepository.findOne({ where: { name: RoleType.GENERAL } })
        user.roles = [defaultRole]

        const details = new UserDetails()
        user.details = details

        const shop = new Shop()
        user.shop = shop

        const salt = await genSalt(10)
        user.password = await hash(password, salt)

        await user.save()
    }


}