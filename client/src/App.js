import React from "react";
import PeopleList from "./components/PeopleList";
import AddPerson from "./components/AddPerson";

function App() {
    return (
        <div className="App">
            <h1>People and Cars</h1>
            <AddPerson />
            <PeopleList />
        </div>
    );
}

export default App;
