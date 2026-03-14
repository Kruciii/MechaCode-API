import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const STATUS_COLORS = {
    DONE: '#00ff88',         // Neonowa zieleń
    IN_PROGRESS: '#f1c40f',  // Złoty
    NOT_STARTED: '#ff4757'   // Krwista czerwień
};

function TaskList() {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        fetch('http://localhost:8000/api/tasks')
            .then(res => res.json())
            .then(json => {
                setData(json);
                setLoading(false);
            })
            .catch(err => console.error("Błąd:", err));
    }, []);

    if (loading) return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', color: '#00ff88', fontFamily: 'monospace' }}>
            <h2> INICJALIZACJA SYSTEMU...</h2>
        </div>
    );

    return (
        <div style={{ 
            maxWidth: '1100px', 
            margin: '0 auto', 
            padding: '40px 20px', 
            color: '#ffffff', 
            fontFamily: '"Segoe UI", Roboto, Helvetica, Arial, sans-serif',
            background: '#121212' 
        }}>
            
            {/* --- NAGŁÓWEK I PROGRES --- */}
            <div style={{ 
                background: 'linear-gradient(145deg, #1e272e, #2c3e50)', 
                padding: '30px', 
                borderRadius: '15px', 
                marginBottom: '40px',
                boxShadow: '0 10px 30px rgba(0,0,0,0.5)',
                border: '1px solid #34495e'
            }}>
                <h1 style={{ margin: '0 0 20px 0', fontSize: '28px', letterSpacing: '2px', color: '#3498db' }}>
                    {data.progress.subject_name.toUpperCase()}
                </h1>
                
                <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                    <div style={{ flex: 1, backgroundColor: '#1a252f', borderRadius: '20px', height: '12px', position: 'relative', overflow: 'hidden' }}>
                        <div style={{ 
                            width: `${data.progress.percentage}%`, 
                            backgroundColor: '#3498db', 
                            height: '100%', 
                            boxShadow: '0 0 15px #3498db',
                            transition: 'width 1s cubic-bezier(0.175, 0.885, 0.32, 1.275)' 
                        }} />
                    </div>
                    <span style={{ fontSize: '18px', fontWeight: 'bold', color: '#3498db', minWidth: '50px' }}>
                        {data.progress.percentage}%
                    </span>
                </div>
            </div>

            <h2 style={{ 
                fontSize: '22px', 
                marginBottom: '25px', 
                display: 'flex', 
                alignItems: 'center', 
                gap: '10px',
                color: '#bdc3c7' 
            }}>
                <span style={{ color: '#00ff88' }}>●</span> DOSTĘPNE OPERACJE
            </h2>
            
            {/* --- GRID ZADANIA --- */}
            <div style={{ 
                display: 'grid', 
                gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', 
                gap: '25px' 
            }}>
                {data.tasks.map(task => (
                    <div 
                        key={task.id} 
                        onClick={() => navigate(`/task/${task.id}`)}
                        style={{ 
                            backgroundColor: '#1e272e', 
                            border: '1px solid #34495e',
                            padding: '25px', 
                            borderRadius: '12px', 
                            cursor: 'pointer',
                            position: 'relative',
                            transition: 'all 0.3s ease',
                            overflow: 'hidden'
                        }}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.transform = 'translateY(-8px)';
                            e.currentTarget.style.borderColor = '#3498db';
                            e.currentTarget.style.boxShadow = '0 12px 24px rgba(0,0,0,0.6)';
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.transform = 'translateY(0)';
                            e.currentTarget.style.borderColor = '#34495e';
                            e.currentTarget.style.boxShadow = 'none';
                        }}
                    >
                        {/* Akcent kolorystyczny statusu */}
                        <div style={{ 
                            position: 'absolute', 
                            top: 0, 
                            left: 0, 
                            width: '4px', 
                            height: '100%', 
                            backgroundColor: STATUS_COLORS[task.status] || '#57606f' 
                        }} />

                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '15px' }}>
                            <h4 style={{ margin: 0, fontSize: '20px', fontWeight: '600' }}>{task.title}</h4>
                            <div style={{ 
                                width: '10px', height: '10px', 
                                borderRadius: '50%', 
                                backgroundColor: STATUS_COLORS[task.status] || '#57606f',
                                boxShadow: `0 0 10px ${STATUS_COLORS[task.status]}`
                            }} />
                        </div>
                        
                        <p style={{ fontSize: '14px', color: '#95a5a6', lineHeight: '1.5', marginBottom: '20px', height: '42px', overflow: 'hidden' }}>
                            {task.short_content}
                        </p>
                        
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <div style={{ display: 'flex', gap: '8px' }}>
                                <Tag text={task.topic} color="#34495e" />
                                <Tag 
                                    text={task.difficulty} 
                                    color={task.difficulty === 'HARD' ? 'rgba(231, 76, 60, 0.2)' : 'rgba(52, 152, 219, 0.2)'} 
                                    textColor={task.difficulty === 'HARD' ? '#ff4757' : '#3498db'}
                                />
                            </div>
                            <span style={{ fontSize: '12px', color: '#57606f', fontWeight: 'bold' }}>{task.semester}</span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

// Pomocniczy komponent dla tagów
const Tag = ({ text, color, textColor = '#bdc3c7' }) => (
    <span style={{ 
        backgroundColor: color, 
        color: textColor,
        padding: '4px 10px', 
        borderRadius: '6px', 
        fontSize: '11px', 
        fontWeight: 'bold',
        textTransform: 'uppercase',
        letterSpacing: '0.5px'
    }}>
        {text}
    </span>
);

export default TaskList;