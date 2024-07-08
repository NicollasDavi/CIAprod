"use client";
import axiosInstance from '../../../app/axiosInstance';
import React, { useEffect, useState } from 'react';
import { Switch } from '@headlessui/react';

interface User {
    matricula: number;
    nome: string;
    email: string;
    admin: boolean;
    cargo: string;
    isN: boolean;
}

const Page = () => {
    const [users, setUsers] = useState<User[]>([]);
    const [editIndex, setEditIndex] = useState<number | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await axiosInstance.get('/users');
                setUsers(response.data.findAllUsers);  // Atualize a lógica aqui para acessar a propriedade correta
            } catch (error) {
                console.error("Erro ao buscar usuários:", error);
                setError("Erro ao buscar usuários");
            }
        };
        fetchUsers();
    }, []);

    const handleSave = async (index: number) => {
        setLoading(true);
        const user = users[index];
        try {
            await axiosInstance.patch(`/user/${user.matricula}`, user);
            setEditIndex(null);
        } catch (error) {
            console.error("Erro ao atualizar usuário:", error);
            setError("Erro ao atualizar usuário");
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (index: number, field: keyof User, value: any) => {
        const newUsers = [...users];
        newUsers[index] = { ...newUsers[index], [field]: value };
        setUsers(newUsers);
    };

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Lista de Usuários</h1>
            {error && <div className="text-red-500 mb-4">{error}</div>}
            <table className="min-w-full bg-white border border-gray-300">
                <thead>
                    <tr className="bg-gray-200">
                        <th className="py-2 px-4 border-b">Matrícula</th>
                        <th className="py-2 px-4 border-b">Nome</th>
                        <th className="py-2 px-4 border-b">Email</th>
                        <th className="py-2 px-4 border-b">Admin</th>
                        <th className="py-2 px-4 border-b">Cargo</th>
                        <th className="py-2 px-4 border-b">isN</th>
                        <th className="py-2 px-4 border-b">Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {Array.isArray(users) && users.map((user, index) => (
                        <tr key={user.matricula} className="hover:bg-gray-100">
                            <td className="py-2 px-4 border-b">{user.matricula}</td>
                            <td className="py-2 px-4 border-b">
                                {editIndex === index ? (
                                    <input
                                        type="text"
                                        value={user.nome}
                                        onChange={(e) => handleChange(index, 'nome', e.target.value)}
                                        className="border p-1 rounded w-full"
                                    />
                                ) : (
                                    user.nome
                                )}
                            </td>
                            <td className="py-2 px-4 border-b">
                                {editIndex === index ? (
                                    <input
                                        type="text"
                                        value={user.email}
                                        onChange={(e) => handleChange(index, 'email', e.target.value)}
                                        className="border p-1 rounded w-full"
                                    />
                                ) : (
                                    user.email
                                )}
                            </td>
                            <td className="py-2 px-4 border-b text-center">
                                {editIndex === index ? (
                                    <Switch
                                        checked={user.admin}
                                        onChange={(checked) => handleChange(index, 'admin', checked)}
                                        className={`${
                                            user.admin ? 'bg-blue-600' : 'bg-gray-200'
                                        } relative inline-flex items-center h-6 rounded-full w-11`}
                                    >
                                        <span
                                            className={`${
                                                user.admin ? 'translate-x-6' : 'translate-x-1'
                                            } inline-block w-4 h-4 transform bg-white rounded-full`}
                                        />
                                    </Switch>
                                ) : (
                                    user.admin ? 'Sim' : 'Não'
                                )}
                            </td>
                            <td className="py-2 px-4 border-b">
                                {editIndex === index ? (
                                    <input
                                        type="text"
                                        value={user.cargo}
                                        onChange={(e) => handleChange(index, 'cargo', e.target.value)}
                                        className="border p-1 rounded w-full"
                                    />
                                ) : (
                                    user.cargo
                                )}
                            </td>
                            <td className="py-2 px-4 border-b text-center">
                                {editIndex === index ? (
                                    <Switch
                                        checked={user.isN}
                                        onChange={(checked) => handleChange(index, 'isN', checked)}
                                        className={`${
                                            user.isN ? 'bg-blue-600' : 'bg-gray-200'
                                        } relative inline-flex items-center h-6 rounded-full w-11`}
                                    >
                                        <span
                                            className={`${
                                                user.isN ? 'translate-x-6' : 'translate-x-1'
                                            } inline-block w-4 h-4 transform bg-white rounded-full`}
                                        />
                                    </Switch>
                                ) : (
                                    user.isN ? 'Sim' : 'Não'
                                )}
                            </td>
                            <td className="py-2 px-4 border-b text-center">
                                {editIndex === index ? (
                                    <button
                                        onClick={() => handleSave(index)}
                                        className="bg-green-500 text-white px-4 py-2 rounded"
                                        disabled={loading}
                                    >
                                        {loading ? 'Salvando...' : 'Salvar'}
                                    </button>
                                ) : (
                                    <button
                                        onClick={() => setEditIndex(index)}
                                        className="bg-blue-500 text-white px-4 py-2 rounded"
                                    >
                                        Editar
                                    </button>
                                )}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Page;
