export interface TeamMember {
    id: string;
    name: string;
    avatar?: string;
}

export interface TeamMembersResponse {
    users: TeamMember[];
}
