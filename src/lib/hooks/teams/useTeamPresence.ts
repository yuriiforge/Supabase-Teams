import { useEffect, useState } from "react";
import { supabase } from "../../../config/supabase-client";
import type { Profile } from "../../types/profile";

interface PresenceState {
    user_id: string;
    name: string;
    avatar_url: string;
}

interface OnlineUser {
    id: string;
    name: string;
    avatar_url: string;
}

export function useTeamPresence(teamId: string, profile: Profile | null) {
    const [onlineUsers, setOnlineUsers] = useState<OnlineUser[]>([]);

    useEffect(() => {
        if (!teamId || !profile) return;

        const teamChannel = supabase.channel(`team-presence:${teamId}`, {
            config: {
                presence: {
                    key: profile.id,
                },
            },
        });

        teamChannel.on("presence", { event: "sync" }, () => {
            const state = teamChannel.presenceState<PresenceState>();

            const users: OnlineUser[] = Object.keys(state)
                .map((key) => {
                    const presence = state[key][0];
                    return {
                        id: presence.user_id,
                        name: presence.name,
                        avatar_url: presence.avatar_url,
                    };
                });

            setOnlineUsers(users);
        });

        teamChannel.on("presence", { event: "join" }, ({ newPresences }) => {
            setOnlineUsers((prevUsers) => {
                const joinedUser = newPresences[0];

                if (prevUsers.find((u) => u.id === joinedUser.user_id)) {
                    return prevUsers;
                }
                return [
                    ...prevUsers,
                    {
                        id: joinedUser.user_id,
                        name: joinedUser.name,
                        avatar_url: joinedUser.avatar_url,
                    },
                ];
            });
        });

        teamChannel.on("presence", { event: "leave" }, ({ leftPresences }) => {
            setOnlineUsers((prevUsers) =>
                prevUsers.filter((u) => u.id !== leftPresences[0].user_id)
            );
        });

        teamChannel.subscribe(async (status) => {
            if (status === "SUBSCRIBED") {
                await teamChannel.track({
                    user_id: profile.id,
                    name: profile.full_name,
                    avatar_url: profile.avatar_url,
                });
            }
        });

        return () => {
            if (teamChannel) {
                supabase.removeChannel(teamChannel);
            }
        };
    }, [teamId, profile]);

    return { onlineUsers };
}
