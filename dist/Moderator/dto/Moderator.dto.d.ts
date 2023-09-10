export declare class ModeratorDto {
    name: string;
    age: string;
    phone: string;
    email: string;
    gender: string;
    createdDate: Date;
    education: string;
    updatedDate: Date;
    password: string;
    profileImg: string;
    status: string;
    createdBy: number;
}
export declare class ModeratorLoginDto {
    email: string;
    password: string;
}
export declare class PasswordChangeModeratorDto {
    oldPassword: string;
    newPassword: string;
}
export declare class PasswordForgetModeratorDto {
    email: string;
}
export declare class ForgetPassModeratorDto {
    otp: string;
    newPassword: string;
}
