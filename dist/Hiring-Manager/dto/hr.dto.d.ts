export declare class HrDto {
    name: string;
    age: string;
    phone: string;
    email: string;
    gender: string;
    createdDate: Date;
    updatedDate: Date;
    password: string;
    profileImg: string;
    createdByAdmin: number;
    createdByModerator: number;
}
export declare class HrLoginDto {
    email: string;
    password: string;
}
export declare class PasswordChangeHrDto {
    oldPassword: string;
    newPassword: string;
}
