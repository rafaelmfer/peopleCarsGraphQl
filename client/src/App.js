import React from 'react';
import PeopleList from './components/PeopleList';
import AddPerson from './components/AddPerson';
import AddCar from './components/AddCar';
import { useQuery } from '@apollo/client';
import { GET_PEOPLE } from './graphql/queries';

function App() {
  const { loading, error, data } = useQuery(GET_PEOPLE);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div className="App">
      <h1>People and Cars</h1>
      <AddPerson />
      <AddCar people={data.people} />
      <PeopleList />
    </div>
  );
}

export default App;
