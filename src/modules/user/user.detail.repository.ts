import { Repository, EntityRepository } from 'typeorm'
import { UserDetails } from './user.detail.entity'

@EntityRepository(UserDetails)
export class UserDetailRepositry extends Repository<UserDetails> { }