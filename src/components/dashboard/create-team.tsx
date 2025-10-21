import React, { useState } from 'react';
import { useCreateTeam } from '../../lib/hooks/teams/useTeam';

const CreateTeamForm = () => {
  const [teamName, setTeamName] = useState('');
  const { mutate, isPending } = useCreateTeam();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (teamName.trim()) {
      mutate(teamName.trim());
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-4 p-6 border rounded-lg shadow-md"
    >
      <h2 className="text-xl font-semibold">Create a New Team</h2>
      <input
        type="text"
        value={teamName}
        onChange={(e) => setTeamName(e.target.value)}
        placeholder="Your new team's name"
        className="p-2 border rounded"
      />
      <button
        type="submit"
        disabled={isPending}
        className="p-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
      >
        {isPending ? 'Creating...' : 'Create Team'}
      </button>
    </form>
  );
};

export default CreateTeamForm;
