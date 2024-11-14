import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Threads() {
    const [threads, setThreads] = useState([]);
    const [newThreadTitle, setNewThreadTitle] = useState('');
    const [newMessage, setNewMessage] = useState('');

    useEffect(() => {
        axios.get('http://localhost:5000/api/threads')
            .then(response => setThreads(response.data))
            .catch(error => console.error("Error fetching threads:", error));
    }, []);

    const createThread = () => {
        axios.post('http://localhost:5000/api/threads', { title: newThreadTitle })
            .then(response => {
                setThreads([...threads, response.data]);
                setNewThreadTitle('');
            })
            .catch(error => console.error("Error creating thread:", error));
    };

    const addMessage = (threadId) => {
        axios.post(`http://localhost:5000/api/threads/${threadId}/messages`, { content: newMessage })
            .then(response => {
                const updatedThreads = threads.map(thread => {
                    if (thread.id === threadId) {
                        return { ...thread, messages: [...thread.messages, response.data] };
                    }
                    return thread;
                });
                setThreads(updatedThreads);
                setNewMessage('');
            })
            .catch(error => console.error("Error adding message:", error));
    };

    return (
        <div className="threads">
            <h1>Threads</h1>
            <input
                type="text"
                value={newThreadTitle}
                onChange={(e) => setNewThreadTitle(e.target.value)}
                placeholder="Enter thread title"
            />
            <button onClick={createThread}>Create Thread</button>

            <div className="thread-list">
                {threads.map(thread => (
                    <div key={thread.id} className="thread">
                        <h2>{thread.title}</h2>
                        <div className="messages">
                            {thread.messages.map(message => (
                                <p key={message.id}>{message.content}</p>
                            ))}
                        </div>
                        <input
                            type="text"
                            value={newMessage}
                            onChange={(e) => setNewMessage(e.target.value)}
                            placeholder="Enter your message"
                        />
                        <button onClick={() => addMessage(thread.id)}>Add Message</button>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Threads;
