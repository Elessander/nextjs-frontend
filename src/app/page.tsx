'use client';

import { useEffect, useState } from 'react';

type Todo = { id: number; title: string; createdAt: string };

export default function Home() {
  const [todos, setTodos]       = useState<Todo[]>([]);
  const [newTitle, setNewTitle] = useState('');

  async function load() {
    const res = await fetch('/api/todos');
    setTodos(await res.json());
  }

  async function add() {
    if (!newTitle.trim()) return;
    await fetch('/api/todos', {
      method:  'POST',
      headers: { 'Content-Type': 'application/json' },
      body:    JSON.stringify({ title: newTitle }),
    });
    setNewTitle('');
    load();
  }

  async function remove(id: number) {
    await fetch(`/api/todos/${id}`, { method: 'DELETE' });
    load();
  }

  useEffect(() => { load(); }, []);

  return (
    <main className="p-4 max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-4">To‑Do List</h1>
      <div className="flex gap-2 mb-4">
        <input
          className="flex-1 border p-2 rounded"
          value={newTitle}
          onChange={e => setNewTitle(e.target.value)}
          placeholder="Nova tarefa"
        />
        <button
          onClick={add}
          className="bg-blue-500 text-white px-4 rounded hover:bg-blue-600"
        >
          Adicionar
        </button>
      </div>
      <ul className="space-y-2">
        {todos.map(t => (
          <li key={t.id} className="flex justify-between items-center">
            <span>{t.title}</span>
            <button
              onClick={() => remove(t.id)}
              className="text-red-500 hover:text-red-700"
            >
              ✕
            </button>
          </li>
        ))}
      </ul>
    </main>
  );
}
