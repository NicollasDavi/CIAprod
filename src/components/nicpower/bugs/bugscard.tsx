"use client"
import React, { useState, useEffect } from 'react';
import axiosInstance from "../../../app/axiosInstance";
import BugCard from './bugcard';

interface BugCardProps {
    id: string;
    text: string;
    type: string;
    createdAt: Date;
}

const BugsCard = () => {
    const [bugs, setBugs] = useState<BugCardProps[]>([]);

    const fetchBugs = async () => {
        try {
            const response = await axiosInstance.get("/bof");
            const data = response.data.map((bug: BugCardProps) => ({
                ...bug,
                createdAt: new Date(bug.createdAt),  // Convert to Date object
            }));
            setBugs(data);
        } catch (error) {
            console.error("Error fetching bugs:", error);
        }
    };

    useEffect(() => {
        fetchBugs();
    }, []);

    const handleDelete = async (id: string) => {
        try {
            await axiosInstance.delete(`/bof/${id}`);
            setBugs(prevBugs => prevBugs.filter(bug => bug.id !== id));
        } catch (error) {
            console.error("Error deleting bug:", error);
        }
    };

    return (
        <div className="container mx-auto p-2 rounded-xl w-full">
            {bugs.map((bug) => (
                <BugCard
                    key={bug.id}
                    id={bug.id}
                    createdAt={bug.createdAt}
                    text={bug.text}
                    type={bug.type}
                    handleDelete={handleDelete}
                />
            ))}
        </div>
    );
}

export default BugsCard;
