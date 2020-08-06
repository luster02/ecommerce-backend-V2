import { EntityRepository, Repository } from "typeorm";
import { Customer } from "../../customer/customer.entity";
import { CustomerDetail } from '../../customer/customer.detail.entity'
import { Cart } from '../../cart/cart.entity'
import { SignupDto } from "./dto";
import { genSalt, hash } from "bcryptjs";

@EntityRepository(Customer)
export class CustomerAuthRepository extends Repository<Customer> {
    async signup(signupDto: SignupDto): Promise<any> {
        const { password, email } = signupDto

        const customer = new Customer()
        customer.email = email

        const details = new CustomerDetail()
        customer.details = details

        const cart = new Cart()
        customer.cart = cart

        const salt = await genSalt(10)
        customer.password = await hash(password, salt)

        await customer.save()
    }
}
