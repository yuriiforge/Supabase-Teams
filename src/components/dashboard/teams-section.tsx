import CreateTeamForm from './create-team';
import JoinTeamForm from './join-team';

const TeamSection = () => (
  <div className="flex flex-col items-center gap-10">
    <h1 className="text-3xl font-bold">Welcome!</h1>
    <p className="text-lg text-gray-600">
      You&apos;re not on a team yet. You can create one or join an existing
      team.
    </p>

    <div className="flex flex-col md:flex-row gap-8 w-full max-w-4xl">
      <div className="flex-1">
        <CreateTeamForm />
      </div>

      <div className="flex items-center justify-center">
        <span className="text-gray-500 font-semibold">OR</span>
      </div>

      <div className="flex-1">
        <JoinTeamForm />
      </div>
    </div>
  </div>
);

export default TeamSection;
