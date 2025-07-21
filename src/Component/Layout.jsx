import React, { useState, useEffect } from 'react';

function Layout() {
    const [data, setData] = useState('');
    const [voices, setVoices] = useState([]);
    const [selectedVoice, setSelectedVoice] = useState(null);
    const [rate, setRate] = useState(1);
    const [pitch, setPitch] = useState(1);

    useEffect(() => {
        const synth = window.speechSynthesis;

        const loadVoices = () => {
            const voiceList = synth.getVoices();
            setVoices(voiceList);
            if (voiceList.length > 0 && !selectedVoice) {
                setSelectedVoice(voiceList[0]);
            }
        };

        loadVoices();
        if (speechSynthesis.onvoiceschanged !== undefined) {
            speechSynthesis.onvoiceschanged = loadVoices;
        }
    }, []);

    function handleData(e) {
        setData(e.target.value);
    }

    function handleSpeak() {
        if (!data) return;
        const utterance = new SpeechSynthesisUtterance(data);
        utterance.voice = selectedVoice;
        utterance.rate = rate;
        utterance.pitch = pitch;
        speechSynthesis.speak(utterance);
    }

    return (
        <div className='h-[80vh] border p-4'>
            <div className='flex flex-col gap-4 items-center justify-center h-full'>

                <input
                    type='text'
                    value={data}
                    onChange={handleData}
                    onKeyDown={(e) => e.key === 'Enter' && handleSpeak()}
                    placeholder='Enter text'
                    className='w-full max-w-md p-2.5 text-lg text-gray-600 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
                />

                <select
                    className='w-full max-w-md p-2 border rounded-lg text-gray-700'
                    onChange={(e) => setSelectedVoice(voices[e.target.value])}
                >
                    {voices.map((voice, index) => (
                        <option key={index} value={index}>
                            {voice.name} ({voice.lang})
                        </option>
                    ))}
                </select>

                <div className='w-full max-w-md flex gap-4 items-center'>
                    <label className='w-20'>Rate</label>
                    <input
                        type='range'
                        min='0.5'
                        max='2'
                        step='0.1'
                        value={rate}
                        onChange={(e) => setRate(e.target.value)}
                        className='w-full'
                    />
                    <span>{rate}</span>
                </div>

                <div className='w-full max-w-md flex gap-4 items-center'>
                    <label className='w-20'>Pitch</label>
                    <input
                        type='range'
                        min='0'
                        max='2'
                        step='0.1'
                        value={pitch}
                        onChange={(e) => setPitch(e.target.value)}
                        className='w-full'
                    />
                    <span>{pitch}</span>
                </div>

                <button
                    onClick={handleSpeak}
                    className='p-3 text-lg text-white bg-green-500 hover:bg-green-600 rounded-lg hover:scale-105 transition'
                >
                    Speak
                </button>
            </div>
        </div>
    );
}

export default Layout;
