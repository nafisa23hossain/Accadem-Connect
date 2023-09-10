import { Offer } from './offer.entity';
import { Student } from './student.entity';
export declare class Job {
    id: number;
    title: string;
    details: string;
    createdDate: Date;
    updatedDate: Date;
    hr: number;
    students: Student[];
    letters: Offer[];
}
