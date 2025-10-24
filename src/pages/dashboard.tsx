import CreateProductModal from '../components/dashboard/create-product';
import CreateTeamForm from '../components/dashboard/create-team';
import JoinTeamForm from '../components/dashboard/join-team';
import { useProfile } from '../lib/hooks/useProfile';

import ProductsDisplay from '../components/products/products-display';
import { useGetTeamInfo } from '../lib/hooks/teams/useGetTeamInfo';

const Dashboard = () => {
  const { data: profile, isLoading: isProfileLoading } = useProfile();
  const { data: teamName, isLoading: isTeamLoading } = useGetTeamInfo();

  if (isProfileLoading || isTeamLoading) {
    return <p className="text-gray-500">Loading...</p>;
  }

  if (profile?.team_id && teamName) {
    return (
      <div>
        <h1 className="text-3xl font-bold">Welcome to your Dashboard!</h1>
        <p className="my-2">
          Your Team is: <b>{teamName.data.name}</b>
        </p>

        <CreateProductModal />

        <ProductsDisplay />
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center gap-10">
      <h1 className="text-3xl font-bold">Welcome!</h1>
      <p className="text-lg text-gray-600">
        You're not on a team yet. You can create one or join an existing team.
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
};

export default Dashboard;
