export interface GoalData{
    id: number;
    childId: number;
    item: string;
    amount: number;
    target: string;
    duration: string;
    savedAmount: number;
    status: 'ongoing' | 'complete';
}