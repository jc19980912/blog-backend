import {Column, Entity} from 'typeorm';
import { CoreEntity } from './Core.entity';
import {UserActivationStatus} from 'types';
@Entity({
    name: 'user',
})

export class UserEntity extends CoreEntity{
    @Column ({name: 'name', nullable: true})
    name: string;
    @Column ({name: 'email', nullable: true})
    email: string;
    @Column ({name: 'role', default: 0})
    role: number;
    @Column ({name: 'password', nullable: true,})
    password: string;
    @Column({ name: 'activated', default: 0 /** UserActivationStatus.CREATED */ })
    activated: UserActivationStatus;
}