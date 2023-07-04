import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
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
}
