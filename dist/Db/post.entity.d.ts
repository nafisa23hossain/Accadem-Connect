import { Comment } from './comment.entity';
export declare class Post {
    id: number;
    title: string;
    details: string;
    createdDate: Date;
    updatedDate: Date;
    student: number;
    comments: Comment[];
}
