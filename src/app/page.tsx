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
      const data = await res.json();
      setTodos(data);
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
    <main className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div>
        <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">To‑Do-List</h1>

        {error && (
          <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 rounded mb-4 text-sm">
            {error}
          </div>
        )}

        <div className="flex flex-col sm:flex-row gap-2 mb-4">
          <input
            className="flex-1 border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
            placeholder="Nova tarefa"
          />
          <button
            onClick={add}
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition duration-200"
          >
            Adicionar
          </button>
        </div>

        <ul className="space-y-3">
          {todos.map((t) => (
            <li key={t.id} className="flex justify-between items-center bg-gray-50 p-3 rounded-md shadow-sm">
              <span className="text-gray-700">{t.title}</span>
              <button
                onClick={() => remove(t.id)}
                className="text-red-500 hover:text-red-700 transition duration-200"
              >
                ✕
              </button>
            </li>
          ))}
        </ul>
      </div>
    </main>
  );
}
