import { useState } from 'react';
import CreateProductModal from '../components/dashboard/create-product';
import CreateTeamForm from '../components/dashboard/create-team';
import JoinTeamForm from '../components/dashboard/join-team';
import { useProfile } from '../lib/hooks/useProfile';
import { useGetProducts } from '../lib/hooks/products/useGetProducts';
import ProductFilter from '../components/products/products-filter';
import ProductsTable from '../components/products/products-table';
import Pagination from '../components/products/products-pagination';

const Dashboard = () => {
  const { data: profile } = useProfile();
  const [page, setPage] = useState(1);
  const [status, setStatus] = useState('');
  const [search, setSearch] = useState('');

  const { data, isLoading, isError, isFetching } = useGetProducts({
    page,
    limit: 10,
    creator: profile?.id,
    team: profile?.team_id,
    status,
    search,
    enabled: !!profile?.team_id,
  });
  console.log(data);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (profile?.team_id) {
    return (
      <div>
        <h1 className="text-3xl font-bold">Welcome to your Dashboard!</h1>
        <p>Your Team ID is: {profile.team_id}</p>

        <CreateProductModal />

        <ProductFilter
          status={status}
          search={search}
          onStatusChange={setStatus}
          onSearchChange={setSearch}
        />

        <ProductsTable
          products={data?.data ?? []}
          isLoading={isLoading}
          isError={isError}
        />

        {data && data.count > 0 && (
          <Pagination
            page={page}
            pageSize={10}
            total={data.count}
            onPageChange={setPage}
          />
        )}

        {/* Optional fetching indicator */}
        {isFetching && <p>Refreshing products...</p>}
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
