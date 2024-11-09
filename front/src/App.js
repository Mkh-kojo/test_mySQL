import './App.css';
import { useState, useEffect } from 'react';

function App() {
  const [apiList, setApiList] = useState([]);
  const [newTask, setNewTask] = useState("");

  // Fonction pour mettre à jour la liste des tâches via l'API
  function UpdateApiList(URL) {
    fetch(URL)
      .then(res => res.json())
      .then(data => {
        setApiList(data);
      })
      .catch(error => {
        console.error("Erreur lors de la récupération des données:", error);
      });
  }

  // Utilisation du useEffect pour récupérer les données lors du chargement du composant
  useEffect(() => {
    UpdateApiList("http://localhost:3001/todo/");
  }, []);

  // Fonction pour ajouter une nouvelle tâche
  function handleAddTask() {
    const newTodo = { title: newTask };
    fetch("http://localhost:3001/todo/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(newTodo)
    })
    .then(res => res.json())
    .then(data => {
      setApiList([...apiList, data]);
      setNewTask(""); // Réinitialise le champ de saisie
    });
  }

  // Fonction pour supprimer une tâche
  function handleDeleteTask(id) {
    fetch(`http://localhost:3001/todo/${id}`, {
      method: "DELETE"
    })
    .then(() => {
      setApiList(apiList.filter(todo => todo.id !== id)); // Supprime la tâche de l'état local
    });
  }

  // Fonction pour modifier une tâche
  function handleEditTask(id, updatedTask) {
    fetch(`http://localhost:3001/todo/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ title: updatedTask })
    })
    .then(res => res.json())
    .then(data => {
      setApiList(apiList.map(todo => 
        todo.id === id ? { ...todo, title: updatedTask } : todo
      ));
    });
  }

  return (
    <div className="global">
      <div className="rec">
        <h1>Liste des Tâches</h1>
        <input
          type="text"
          value={newTask}
          onChange={e => setNewTask(e.target.value)}
          placeholder="Nouvelle tâche"
        />
        <button onClick={handleAddTask}>Ajouter</button>
        <ul>
          {apiList.map(todo => (
            <li key={todo.id}>
              <span>{todo.title}</span>
              <button onClick={() => handleDeleteTask(todo.id)}>Supprimer</button>
              <button onClick={() => {
                const updatedTask = prompt("Modifier la tâche", todo.title);
                if (updatedTask) {
                  handleEditTask(todo.id, updatedTask);
                }
              }}>Modifier</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
