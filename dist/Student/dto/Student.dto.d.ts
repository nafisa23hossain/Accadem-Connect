export declare class StudentDto {
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
export declare class PasswordChangeStudentDto {
    oldPassword: string;
    newPassword: string;
}
