'use client';

import { useEffect, useState } from 'react';
import { FaListAlt } from 'react-icons/fa';
import styles from './page.module.css';

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
      setError(err instanceof Error ? err.message : 'Erro inesperado');
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
      setError(err instanceof Error ? err.message : 'Erro inesperado');
    }
  }

  async function remove(id: number) {
    try {
      const res = await fetch(`${API_URL}/todos/${id}`, { method: 'DELETE' });
      if (!res.ok) throw new Error('Erro ao remover tarefa');
      load();
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Erro inesperado');
    }
  }

  useEffect(() => {
    load();
  }, []);

  return (
    <main className={styles.container}>
      <h1 className={styles.title}>
        <FaListAlt style={{ marginRight: '0.75rem' }} /> To-Do List
      </h1>

      {error && <div className={styles.error}>{error}</div>}

      <div className={styles.form}>
        <input
          className={styles.input}
          value={newTitle}
          onChange={(e) => setNewTitle(e.target.value)}
          placeholder="Nova tarefa"
        />
        <button onClick={add} className={styles.addButton}>
          Adicionar
        </button>
      </div>

      <ul className={styles.todoList}>
        {todos.map((t) => (
          <li key={t.id} className={styles.todoItem}>
            <span className={styles.todoTitle}>{t.title}</span>
            <button
              onClick={() => remove(t.id)}
              className={styles.removeButton}
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
