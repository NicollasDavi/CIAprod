import React from 'react';
import { IoMdClose } from "react-icons/io";
import { MdDoneOutline } from "react-icons/md";
import { GoAlertFill } from "react-icons/go";
import { BsCalendarEventFill } from "react-icons/bs";
import { MdDeleteForever } from 'react-icons/md';
import axiosInstance from '../../app/axiosInstance';



interface NotificationProps {
    type: string;
    title: string;
    text: string;
    id: string
    adm: boolean
    onFecth?: () => (void)
}

const Notification: React.FC<NotificationProps> = ({ type, title, text, adm, id, onFecth }) => {
    const getBackgroundColor = (type: string) => {
        switch (type) {
            case 'D':
                return 'bg-red-500/30 text-red-500';
            case 'S':
                return 'bg-green-500/30 text-green-500';
            case 'A':
                return 'bg-yellow-500/30 text-orange-500';
            case 'E':
                return 'bg-purple-500/30 text-purple-500';
            default:
                return '';
        }
    };

    const handleDelete = async (id: string) => {
        await axiosInstance.delete(`/alert/${id}`)
        if(onFecth){
            onFecth()
        }
    }

    const getIcon = (type: string) => {
        switch (type) {
            case 'D':
                return <IoMdClose className='ml-2' />;
            case 'S':
                return <MdDoneOutline className='ml-2' />;
            case 'A':
                return <GoAlertFill className='ml-2' />;
            case 'E':
                return <BsCalendarEventFill className='ml-2' />;
            default:
                return null;
        }
    };

    return (
        <div className={`w-full flex flex-row rounded-xl p-2 ${getBackgroundColor(type)}`}>
            <div className='text-base flex flex-row w-full items-center justify-between px-4'>
                <div className='flex items-center'>
                    <h3 className='mr-2'>{title}</h3>
                    <span className='mr-2'>|</span>
                    <p>{text}</p>
                </div>
                <div className='flex items-center'>
                {getIcon(type)}
                {adm && <MdDeleteForever className='ml-10 bg-white rounded-full text-red-500  cursor-pointer' onClick={() => handleDelete(id)}/>}
                </div>
            </div>
        </div>
    );
};

export default Notification;
