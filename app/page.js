"use client";
import Image from "next/image";
import { useState, useEffect } from "react";
import { collection,doc, addDoc, getDocs, deleteDoc } from "firebase/firestore";
import db from "./firebase.js";

export default function Home() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    // Fetch users from Firebase
    const fetchUsers = async () => {
      const usersCollection = collection(db, "users");
      const usersSnapshot = await getDocs(usersCollection);
      const userList = usersSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setUsers(userList);
    };
    fetchUsers();
  }, []);

  const handleDeleteUser = async (userId) => {
    // Delete user from Firebase
    await deleteDoc(doc(db, "users", userId));
    setUsers(users.filter((user) => user.id !== userId));
  };
  return (
    <main>
      <div className="user-list">
        <h2>User List</h2>
        <ul>
          {users.map((user) => (
            <li key={user.id}>
              {user.nome} - {user.email}
              <button onClick={() => handleDeleteUser(user.id)}>Delete</button>
            </li>
          ))}
        </ul>
      </div>
    </main>
  );
}
