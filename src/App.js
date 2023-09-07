import React, { useState } from "react";
import "./App.css";
import UserInputForm from "./UserInputForm";
import { fetchUserData, fetchUserRepositories } from "./GitHubAPI";

function App() {
  // Definirea stării pentru datele utilizatorului 1, datele utilizatorului 2, repository-urile utilizatorului 1 și repository-urile utilizatorului 2
  const [userData1, setUserData1] = useState(null);
  const [userData2, setUserData2] = useState(null);
  const [userRepos1, setUserRepos1] = useState([]);
  const [userRepos2, setUserRepos2] = useState([]);
  const [error, setError] = useState(null);

  // Funcție pentru a căuta informații despre un utilizator GitHub și a afișa repository-urile și numărul de stargazers
  async function searchUserInfo(username, setUserFunc, setReposFunc) {
    try {
      // Obținerea datelor utilizatorului
      const user = await fetchUserData(username);
      // Obținerea repository-urilor utilizatorului
      const repos = await fetchUserRepositories(username);

      // Actualizarea stării cu datele utilizatorului și repository-urile
      setUserFunc(user);
      setReposFunc(repos);
      setError(null); // Resetarea mesajelor de eroare
    } catch (error) {
      console.error("Eroare la căutarea utilizatorului:", error);
      setError(
        "Eroare la căutarea utilizatorului. Verificați numele de utilizator și încercați din nou."
      );
    }
  }

  // Funcție pentru a căuta utilizatori GitHub
  async function onSearchFunction(username1, username2) {
    setError(null); // Resetarea mesajelor de eroare înainte de căutare

    // Apelarea funcției searchUserInfo pentru primul și al doilea utilizator
    await searchUserInfo(username1, setUserData1, setUserRepos1);
    await searchUserInfo(username2, setUserData2, setUserRepos2);
  }

  return (
    <div className="App">
      <header className="App-header">
        {/* Componenta UserInputForm pentru a permite utilizatorilor să introducă numele utilizatorilor GitHub */}
        <UserInputForm onSearch={onSearchFunction} />

        {/* Afișarea mesajului de eroare în caz de eroare */}
        {error && <p style={{ color: "red" }}>{error}</p>}

        {/* Verificarea dacă datele utilizatorilor sunt disponibile și afișarea acestora */}
        {userData1 && userData2 && (
          <div>
            <h2>Rezultate:</h2>
            <div>
              {/* Afișarea informațiilor despre primul utilizator */}
              <h3>Utilizator 1: {userData1.login}</h3>
              <p>Urmăritori: {userData1.followers}</p>
              <h4>Repository-uri:</h4>
              <ul>
                {/* Afișarea repository-urilor primului utilizator */}
                {userRepos1.map((repo) => (
                  <li key={repo.id}>
                    {repo.name} - Stargazers: {repo.stargazers_count}, Forks:{" "}
                    {repo.forks}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              {/* Afișarea informațiilor despre al doilea utilizator */}
              <h3>Utilizator 2: {userData2.login}</h3>
              <p>Urmăritori: {userData2.followers}</p>
              <h4>Repository-uri:</h4>
              <ul>
                {/* Afișarea repository-urilor celui de-al doilea utilizator */}
                {userRepos2.map((repo) => (
                  <li key={repo.id}>
                    {repo.name} - Stargazers: {repo.stargazers_count}, Forks:{" "}
                    {repo.forks}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </header>
    </div>
  );
}

export default App;
