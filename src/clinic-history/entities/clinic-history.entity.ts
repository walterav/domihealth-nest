import { User } from "src/auth/entities/user.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity({name: 'medical_records'})
export class ClinicHistory {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column('text',{
    })
    gender:string;

    @Column('text',{
    })
    fullName:string;

    @Column('int',{
        unique: true,
    })
    idNumber:number;

    @Column('date',{
    })
    dateOfBirth:Date;

    @Column('text',{
    })
    address:string;

    @Column('int',{
    })
    phoneNumber:number;

    @Column('text',{
    })
    familiarContact:string;

    @Column('text',{
    })
    profession:string;

    @Column('text',{
    })
    maritalStatus:string;

    @Column('text',{
    })
    bloodType:string;

    @Column('text',{
    })
    religion:string;

    @ManyToOne(
        () => User, 
        user => user.clinicHistory, 
        { eager: true }
    )
    user: User;


}
