/* eslint-disable */

"use client"
import { SetStateAction, useState } from 'react';
import { format } from 'date-fns';
import { DayPicker } from 'react-day-picker';
import 'react-day-picker/dist/style.css';
import DocsModal from '../../../components/DocsModal';
import PegarDia from '../../../components/PegarDia';


const Page = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selected, setSelected] = useState<Date | undefined>();
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [eventos, setEventos] = useState<any[]>([]);
    const [day, setDay] = useState(0);
    const [month, setMonth] = useState(0);
    const [year, setYear] = useState(0);
    const [hour, setHour] = useState(0);
    const [minutes, setMinutes] = useState(0);



    const handleDateSelect = (date: Date | undefined) => {
        if (!date) {
            console.error('Nenhuma data selecionada');
            return;
        }
    
        const selectedDay = date.getDate();
        const selectedMonth = date.getMonth() + 1;
        const selectedYear = date.getFullYear();
        const selectedHour = hour;
        const selectedMinutes = minutes;
        setDay(selectedDay);
        setMonth(selectedMonth);
        setYear(selectedYear);
        setHour(selectedHour);
        setMinutes(selectedMinutes);
        console.log("No dia ", selectedDay, "do mês ", selectedMonth, "de", selectedYear, "às", selectedHour, "horas e", selectedMinutes, "minutos, você tem o evento:", title, "com a descrição:", description);
    };

    const handleCreateEvent = () => {
        const novoEvento = {
            nome: title,
            dia: day,
            mes: month,
            ano: year,
            hora: hour,
            minuto: minutes,
            descricao: description
        };

        setEventos([...eventos, novoEvento]);

        setTitle("");
        setDescription("");

        console.log("Evento criado:", novoEvento);
        setIsModalOpen(false);
    };

    let footer: JSX.Element;
    if (selected) {
        footer = <p className="text-gray-700 mt-6">Você selecionou {format(selected, 'PP')}.</p>;
    } else {
        footer = <p className="text-gray-700 mt-6">Selecione um dia.</p>;
    }

    const closeModal = () => setIsModalOpen(false);
    const openModal = () => setIsModalOpen(true);

    return (
        <div className="w-12/12 md:w-9/12 mx-auto flex flex-col md:flex-row ">
            <div className="md:pt-32 pt-20 w-11/12 md:w-6/12 m-auto">
                <DocsModal isOpen={isModalOpen} onClose={closeModal} style="absolute z-20 w-8/12">
                    <>
                        <div className='flex flex-row gap-3'>
                            <section className='w-6/12 flex items-center justify-center'>
                                <section className='bg-[#3B82F6] p-3 rounded-xl'>
                                <PegarDia handleResult={handleDateSelect} />
                                    
                                </section>
                            </section>
                            <section className='w-6/12 bg-white flex flex-col gap-5 p-10'>
                                <input type='text' placeholder='Nome do evento' className='w-full p-2 border border-[#3B82F6]' onChange={(e) => setTitle(e.target.value)}/>
                                <textarea placeholder='Digite a descrição' className='w-full border p-2 border-[#3B82F6]' cols={10} rows={15} onChange={(e) => setDescription(e.target.value)}></textarea>
                            </section>
                        </div>
                        <section className='w-full text-center '>
                            <button className='bg-[#3B82F6] text-white px-14 py-2 rounded-3xl' onClick={handleCreateEvent}>Criar evento</button>
                        </section>
                    </>
                </DocsModal>
                <div className='bg-gray-100/30 rounded-lg shadow-2xl shadow-black px-3 md:px-8 md:py-4 w-full md:w-6/12'>
                    <DayPicker
                        showOutsideDays
                        fixedWeeks
                        mode="single"
                        selected={selected}
                        onSelect={setSelected}
                        footer={footer}
                        className='m-auto'
                    />
                </div>
                <button className='md:mt-24 mt-8 rounded-lg text-white px-10 py-2 bg-[#3B82F6]'  onClick={openModal}>Adicionar compromisso</button>
            </div>
            <div className='px-4 md:w-6/12 pb-5'>
                <div className=' mt-32 flex flex-col gap-5'>
                    {eventos.map((evento, index) => (
                        <section key={index} className='bg-gray-200/80 rounded-lg flex items-center'>
                            <h1 className='px-8 py-3 border-r-zinc-950 border-r w-2/12'>{evento.dia}</h1>
                            <p className='m-auto'>{evento.nome}</p>
                        </section>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Page;