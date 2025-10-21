import { useState } from 'react';
import { useJoinTeam } from '../../lib/hooks/teams/useTeam';

const JoinTeamForm = () => {
  const [inviteCode, setInviteCode] = useState('');
  const { mutate, isPending } = useJoinTeam();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inviteCode.trim()) {
      mutate(inviteCode.trim());
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-4 p-6 border rounded-lg shadow-md"
    >
      <h2 className="text-xl font-semibold">Join an Existing Team</h2>
      <input
        type="text"
        value={inviteCode}
        onChange={(e) => setInviteCode(e.target.value)}
        placeholder="Enter invite code"
        className="p-2 border rounded"
      />
      <button
        type="submit"
        disabled={isPending}
        className="p-2 bg-gray-600 text-white rounded hover:bg-gray-700"
      >
        {isPending ? 'Joining...' : 'Join Team'}
      </button>
    </form>
  );
};

export default JoinTeamForm;
