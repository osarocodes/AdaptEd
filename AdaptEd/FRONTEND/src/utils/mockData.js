export const SUBJECTS = [
    {
        id: 1,
        name: "Mathematics",
        initial: "M",
        color: "#6366F1",
        score: 38,
        change: null,
        status: "weak",
        note: "Quadratics & Trig need work",
        topics: 5,
    },
    {
        id: 2,
        name: "Physics",
        initial: "P",
        color: "#EF4444",
        score: 47,
        change: -2,
        status: "weak",
        note: "Forces dipped a little",
        topics: 4,
    },
    {
        id: 3,
        name: "English Language",
        initial: "E",
        color: "#F59E0B",
        score: 84,
        change: 7,
        status: "strong",
        note: "Comprehension on point",
        topics: 4,
    },
];

export const ALL_SUBJECTS = [
    { id: 1, name: "Mathematics", initial: "M", color: "#6366F1", topics: 5 },
    { id: 2, name: "Physics", initial: "P", color: "#EF4444", topics: 4 },
    { id: 3, name: "English Language", initial: "E", color: "#F59E0B", topics: 4 },
    { id: 4, name: "Chemistry", initial: "C", color: "#10B981", topics: 6 },
    { id: 5, name: "Biology", initial: "B", color: "#3B82F6", topics: 5 },
    { id: 6, name: "Government", initial: "G", color: "#8B5CF6", topics: 3 },
];

export const DATA = {
    Global: [
        { rank: 1, name: "Zainab A.", initials: "ZA", xp: 4650, color: "#6366F1" },
        { rank: 2, name: "Chidi N.", initials: "CN", xp: 4120, color: "#3B82F6" },
        { rank: 3, name: "Fatima S.", initials: "FS", xp: 3800, color: "#EC4899" },
        { rank: 4, name: "Ibrahim L.", initials: "IL", xp: 3400, color: "#8B5CF6" },
        { rank: 5, name: "Amara O. (You)", initials: "AO", xp: 2640, isMe: true, color: "#F59E0B" },
        { rank: 6, name: "Grace O.", initials: "GO", xp: 2510, color: "#10B981" },
        { rank: 7, name: "David M.", initials: "DM", xp: 2300, color: "#EF4444" },
    ],
    City: [
        { rank: 1, name: "Chidi N.", initials: "CN", xp: 4120, color: "#3B82F6" },
        { rank: 2, name: "Fatima S.", initials: "FS", xp: 3800, color: "#EC4899" },
        { rank: 3, name: "Amara O. (You)", initials: "AO", xp: 2640, isMe: true, color: "#F59E0B" },
        { rank: 4, name: "Grace O.", initials: "GO", xp: 2510, color: "#10B981" },
        { rank: 5, name: "David M.", initials: "DM", xp: 2300, color: "#EF4444" },
    ],
    School: [
        { rank: 1, name: "Amara O. (You)", initials: "AO", xp: 2640, isMe: true, color: "#F59E0B" },
        { rank: 2, name: "Grace O.", initials: "GO", xp: 2510, color: "#10B981" },
        { rank: 3, name: "David M.", initials: "DM", xp: 2300, color: "#EF4444" },
        { rank: 4, name: "Emeka T.", initials: "ET", xp: 1980, color: "#6366F1" },
    ],
};

export const PODIUM_MEDALS = {
    1: { label: "🥇", height: "h-24", bg: "#FEF3C7", border: "#F59E0B" },
    2: { label: "🥈", height: "h-16", bg: "#F3F4F6", border: "#9CA3AF" },
    3: { label: "🥉", height: "h-12", bg: "#FEF9EC", border: "#D97706" },
};