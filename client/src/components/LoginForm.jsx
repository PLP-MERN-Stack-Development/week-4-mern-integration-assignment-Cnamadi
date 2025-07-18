import { useState } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';

const LoginForm = () => {
  const { login } = useAuth();
  const [isRegister, setIsRegister] = useState(false);
  const [form, setForm] = useState({ username: '', password: '' });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const url = isRegister ? '/api/auth/register' : '/api/auth/login';
    try {
      const res = await axios.post(url, form);
      if (!isRegister) login(res.data);
      alert(`${isRegister ? 'Registered' : 'Logged in'} successfully`);
    } catch {
      alert('Auth failed');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input
        placeholder="Username"
        value={form.username}
        onChange={e => setForm({ ...form, username: e.target.value })}
        required
        className="border p-2 w-full"
      />
      <input
        type="password"
        placeholder="Password"
        value={form.password}
        onChange={e => setForm({ ...form, password: e.target.value })}
        required
        className="border p-2 w-full"
      />
      <button className="bg-green-500 px-4 py-2 text-white rounded">
        {isRegister ? 'Register' : 'Login'}
      </button>
      <p
        className="text-sm cursor-pointer underline"
        onClick={() => setIsRegister(!isRegister)}
      >
        {isRegister ? 'Have an account? Login' : 'No account? Register'}
      </p>
    </form>
  );
};

export default LoginForm;
