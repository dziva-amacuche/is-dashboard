"use client";
import Image from "next/image";
import { useState, useEffect } from "react";
import {
  collection,
  doc,
  addDoc,
  getDocs,
  deleteDoc,
} from "firebase/firestore";
import db from "./firebase.js";

export default function Home() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
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
    await deleteDoc(doc(db, "users", userId));
    setUsers(users.filter((user) => user.id !== userId));
  };

  const [formData, setFormData] = useState({
    nome: "",
    email: "",
    senha: "",
    dataNascimento: "",
    telefone: "",
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleAddUser = async (event) => {
    event.preventDefault();

    if (
      formData.nome !== "" &&
      formData.email !== "" &&
      formData.senha !== "" &&
      formData.dataNascimento !== "" &&
      formData.telefone !== ""
    ) {
      await addDoc(collection(db, "users"), {
        nome: formData.nome.trim(),
        email: formData.email.trim(),
        senha: formData.senha.trim(),
        dataNascimento: formData.dataNascimento,
        formData: formData.telefone.trim(),
      });
    }

  };

  return (
    <main>
      <div className="user-list">
        <h2>Lista de usuarios</h2>
        <ul>
          {users.map((user) => (
            <li key={user.id}>
              {user.nome} - {user.email}
              <button onClick={() => handleDeleteUser(user.id)}>Delete</button>
            </li>
          ))}
        </ul>
      </div>
      <div className="add-user">
        {" "}
        <form action="#" class="sign-up-form">
          <h2 class="title">Inscreva-se</h2>
          <div class="input-field">
            <i class="fas fa-user"></i>
            <input
              type="text"
              placeholder="Nome de usuario"
              name="nome"
              value={formData.nome}
              onChange={handleInputChange}
            />
          </div>
          <div class="input-field">
            <i class="fas fa-envelope"></i>
            <input
              type="email"
              placeholder="Email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
            />
          </div>
          <div class="input-field">
            <i class="fas fa-lock"></i>
            <input
              type="password"
              placeholder="Senha"
              name="senha"
              value={formData.senha}
              onChange={handleInputChange}
            />
          </div>
          <div class="input-field">
            <i class="fas fa-lock"></i>
            <input
              type="date"
              placeholder="Data de nascimento"
              name="dataNascimento"
              value={formData.dataNascimento}
              onChange={handleInputChange}
            />
          </div>
          <div class="input-field">
            <i class="fas fa-lock"></i>
            <input
              placeholder="Telefone"
              name="telefone"
              value={formData.telefone}
              onChange={handleInputChange}
            />{" "}
          </div>
          <input
            onClick={handleAddUser}
            type="submit"
            class="btn"
            value="Inscreva-se"
          />
        </form>
      </div>
    </main>
  );
}
