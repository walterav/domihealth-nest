import { IsDateString, IsIn, IsNumber, IsString } from "class-validator";

export class CreateClinicHistoryDto {
    
    @IsIn(['male', 'female', 'other'])
    gender:string;

    @IsString()
    fullName:string;

    @IsNumber()
    idNumber:number;

    @IsDateString()
    dateOfBirth:Date;

    @IsString()
    address:string;

    @IsNumber()
    phoneNumber:number;

    @IsString()
    familiarContact:string;

    @IsString()
    profession:string;

    @IsIn(['single', 'married', 'divorced', 'widowed', 'common-law'])
    maritalStatus:string;

    @IsIn(['A+', 'O+', 'B+', 'AB+', 'A-', 'O-', 'B-', 'AB-'])
    bloodType:string;

    @IsIn(['evangelical-christian', 'catholic', 'protestant', 'atheist', 'other'])
    religion:string;
}
