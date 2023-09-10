import { Post } from './post.entity';
import { Comment } from './comment.entity';
import { Offer } from './offer.entity';
import { Report } from './report.entity';
import { StudentProfile } from './studentProfile.entity';
export declare class Student {
    id: number;
    name: string;
    age: string;
    phone: string;
    email: string;
    gender: string;
    createdDate: Date;
    updatedDate: Date;
    profileImg: string;
    password: string;
    job: number;
    createdByModerator: number;
    createdByAdmin: number;
    posts: Post[];
    comments: Comment[];
    letters: Offer[];
    reports: Report[];
    sthr: Student[];
    studentProfile: StudentProfile;
}
