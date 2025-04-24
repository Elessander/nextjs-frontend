'use client';

import { useEffect, useState } from 'react';
import { FaListAlt } from 'react-icons/fa';

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
    } catch (err: any) {
      setError(err.message || 'Erro inesperado');
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
        bg-white/90 backdrop-blur-md 
        rounded-3xl shadow-2xl 
        p-8 mt-12
        transition-all duration-500 ease-out
      "
    >
      <h1 className="flex items-center justify-center text-5xl font-bold text-indigo-900 mb-8">
        <FaListAlt className="mr-3" /> To-Do List
      </h1>

      {error && (
        <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-6 rounded-md">
          {error}
        </div>
      )}

      <div className="flex space-x-3 mb-6">
        <input
          className="
            flex-1 
            bg-white border-2 border-indigo-200 
            rounded-full px-5 py-3 
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
            px-6 py-3 rounded-full 
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
              bg-white p-4 rounded-2xl shadow-md 
              hover:shadow-xl hover:-translate-y-1 
              transition-all
            "
          >
            <span className="text-gray-800 font-medium">{t.title}</span>
            <button
              onClick={() => remove(t.id)}
              className="text-red-500 hover:text-red-700 text-xl transition"
              aria-label="Remover tarefa"
            >
              ✕
            </button>
          </li>
        ))}
      </ul>
    </main>
  );
}