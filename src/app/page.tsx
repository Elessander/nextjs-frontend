'use client';

import { useEffect, useState } from 'react';

type Todo = { id: number; title: string; createdAt: string };
const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';

export default function Home() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [newTitle, setNewTitle] = useState('');
  const [error, setError] = useState<string | null>(null);

  async function load() {
    try {
      const res = await fetch(`${API_URL}/todos`);
      if (!res.ok) throw new Error('Erro ao carregar tarefas');
      setTodos(await res.json());
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('Erro inesperado');
      }
    }
  }

  async function add() {
    if (!newTitle.trim()) return;
    try {
      const res = await fetch(`${API_URL}/todos`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title: newTitle }),
      });
      if (!res.ok) throw new Error('Erro ao adicionar tarefa');
      setNewTitle('');
      load();
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('Erro inesperado');
      }
    }
  }

  async function remove(id: number) {
    try {
      const res = await fetch(`${API_URL}/todos/${id}`, { method: 'DELETE' });
      if (!res.ok) throw new Error('Erro ao remover tarefa');
      load();
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('Erro inesperado');
      }
    }
  }

  useEffect(() => {
    load();
  }, []);

  return (
    <main
      className="
        w-full max-w-md 
        bg-white/80 backdrop-blur-md 
        rounded-2xl shadow-xl 
        p-6 mt-8
        transition-all duration-500 ease-out
      "
    >
      <h1 className="text-4xl font-extrabold text-indigo-800 drop-shadow-lg mb-6 text-center">
        To-Do List
      </h1>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-2 rounded-md mb-4">
          {error}
        </div>
      )}

      <div className="flex space-x-3 mb-6">
        <input
          className="
            flex-1 
            bg-white/90 border-2 border-indigo-300 
            rounded-full px-4 py-2 
            placeholder-indigo-400 
            focus:outline-none focus:ring-2 focus:ring-indigo-500 
            transition
          "
          value={newTitle}
          onChange={(e) => setNewTitle(e.target.value)}
          placeholder="Nova tarefa"
        />
        <button
          onClick={add}
          className="
            bg-indigo-600 text-white 
            px-6 py-2 rounded-full 
            hover:bg-indigo-700 
            shadow-md hover:shadow-lg 
            transition-all
          "
        >
          Adicionar
        </button>
      </div>

      <ul className="space-y-4">
        {todos.map((t) => (
          <li
            key={t.id}
            className="
              flex justify-between items-center 
              bg-white/90 p-4 rounded-2xl shadow-md 
              hover:shadow-xl hover:-translate-y-1 
              transition-all
            "
          >
            <span className="text-gray-800">{t.title}</span>
            <button
              onClick={() => remove(t.id)}
              className="text-red-600 hover:text-red-800 text-xl transition"
            >
              ✕
            </button>
          </li>
        ))}
      </ul>
    </main>
  );
}
