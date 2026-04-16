export type CaseStatus = 'Open' | 'Closed' | 'Pending';
export type CaseType = 'Corporate' | 'Civil' | 'Intellectual Property' | 'Employment';
export type Milestone = 'Case Created' | 'Investigation' | 'Hearing' | 'Closed';

export interface LegalMilestone {
    name: Milestone;
    completed: boolean;
    date?: string; // ISO String
}

export interface CaseRecord {
    id: string;
    title: string;
    status: CaseStatus;
    type: CaseType;
    createdAt: string; // ISO
    progress: number; // 0-100
    milestones: LegalMilestone[];
}

// Generate realistic mock data
const generateMockCases = (): CaseRecord[] => {
    const records: CaseRecord[] = [];
    const statuses: CaseStatus[] = ['Open', 'Closed', 'Pending'];
    const types: CaseType[] = ['Corporate', 'Civil', 'Intellectual Property', 'Employment'];
    
    // Spread 30 cases across the last 6 months
    const today = new Date();
    for (let i = 1; i <= 30; i++) {
        const status = statuses[Math.floor(Math.random() * statuses.length)];
        let progress = 0;
        if (status === 'Closed') progress = 100;
        else if (status === 'Pending') progress = Math.floor(Math.random() * 40) + 10;
        else progress = Math.floor(Math.random() * 50) + 40;

        const date = new Date(today);
        date.setMonth(today.getMonth() - Math.floor(Math.random() * 6));
        date.setDate(Math.floor(Math.random() * 28) + 1);

        const milestones: LegalMilestone[] = [
            { name: 'Case Created', completed: true, date: date.toISOString() },
            { name: 'Investigation', completed: progress >= 25, date: progress >= 25 ? new Date(date.getTime() + 86400000 * 5).toISOString() : undefined },
            { name: 'Hearing', completed: progress >= 70, date: progress >= 70 ? new Date(date.getTime() + 86400000 * 30).toISOString() : undefined },
            { name: 'Closed', completed: progress === 100, date: progress === 100 ? new Date(date.getTime() + 86400000 * 60).toISOString() : undefined }
        ];

        records.push({
            id: `CAS-20${i.toString().padStart(3, '0')}`,
            title: `${types[Math.floor(Math.random() * types.length)]} Dispute #${i}`,
            status,
            type: types[i % types.length],
            createdAt: date.toISOString(),
            progress,
            milestones
        });
    }

    // Sort descending by date
    return records.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
}

export const mockDashboardCases = generateMockCases();

export function getStats(cases: CaseRecord[]) {
    return {
        total: cases.length,
        open: cases.filter(c => c.status === 'Open').length,
        closed: cases.filter(c => c.status === 'Closed').length,
        pending: cases.filter(c => c.status === 'Pending').length,
    };
}

export function getCasesPerMonth(cases: CaseRecord[]) {
    const monthlyMap = new Map<string, number>();
    const monthsStr = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    
    // Initialize last 6 months
    const today = new Date();
    for (let i = 5; i >= 0; i--) {
        const d = new Date(today.getFullYear(), today.getMonth() - i, 1);
        monthlyMap.set(`${monthsStr[d.getMonth()]}`, 0);
    }

    cases.forEach(c => {
        const date = new Date(c.createdAt);
        const key = monthsStr[date.getMonth()];
        if (monthlyMap.has(key)) {
            monthlyMap.set(key, monthlyMap.get(key)! + 1);
        }
    });

    return Array.from(monthlyMap.entries()).map(([month, count]) => ({ month, cases: count }));
}

export function getStatusDistribution(cases: CaseRecord[]) {
    const stats = getStats(cases);
    return [
        { name: 'Open', value: stats.open, fill: 'hsl(var(--chart-1))' },
        { name: 'Closed', value: stats.closed, fill: 'hsl(var(--chart-2))' },
        { name: 'Pending', value: stats.pending, fill: 'hsl(var(--chart-3))' },
    ];
}
