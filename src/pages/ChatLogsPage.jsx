import { useState, useEffect } from 'react';
import { chatAPI } from '../api';
import { MessageSquare, Calendar, Hash, ChevronRight, ArrowLeft, User, Bot } from 'lucide-react';

export default function ChatLogsPage() {
  const [sessions, setSessions] = useState([]);
  const [selectedSession, setSelectedSession] = useState(null);
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingMessages, setLoadingMessages] = useState(false);

  useEffect(() => {
    chatAPI.getSessions()
      .then(res => setSessions(res.data))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const viewSession = async (sessionId) => {
    setSelectedSession(sessionId);
    setLoadingMessages(true);
    try {
      const res = await chatAPI.getLogs(sessionId);
      setMessages(res.data.reverse());
    } catch (err) {
      console.error(err);
    } finally {
      setLoadingMessages(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20 animate-fade-in">
        <div className="w-8 h-8 border-2 border-primary-400 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center gap-4">
        {selectedSession && (
          <button
            onClick={() => { setSelectedSession(null); setMessages([]); }}
            className="p-2 rounded-lg hover:bg-surface-800 text-surface-400 hover:text-white transition-all"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
        )}
        <div>
          <h1 className="text-3xl font-bold text-white mb-1">
            {selectedSession ? `Session ${selectedSession}` : 'Chat Logs'}
          </h1>
          <p className="text-surface-400">
            {selectedSession ? `${messages.length} messages` : `${sessions.length} conversations`}
          </p>
        </div>
      </div>

      {!selectedSession ? (
        sessions.length === 0 ? (
          <div className="bg-surface-800 border border-surface-700 rounded-2xl p-12 text-center">
            <MessageSquare className="w-12 h-12 text-surface-600 mx-auto mb-4" />
            <p className="text-surface-400 font-medium mb-2">No conversations yet</p>
            <p className="text-surface-500 text-sm">
              Chat sessions will appear here once customers start using your widget
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {sessions.map((session) => (
              <button
                key={session.session_id}
                onClick={() => viewSession(session.session_id)}
                className="w-full bg-surface-800 border border-surface-700 rounded-xl p-5 flex items-center gap-4 hover:bg-surface-700 transition-all group text-left"
              >
              <div className="w-11 h-11 rounded-xl bg-primary-400/15 flex items-center justify-center shrink-0">
                <MessageSquare className="w-5 h-5 text-primary-400" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-medium text-white text-sm">Session {session.session_id}</p>
                <div className="flex items-center gap-4 mt-1">
                  <span className="flex items-center gap-1 text-xs text-surface-400">
                    <Hash className="w-3.5 h-3.5" /> {session.message_count} messages
                  </span>
                  <span className="flex items-center gap-1 text-xs text-surface-400">
                    <Calendar className="w-3.5 h-3.5" /> {new Date(session.started_at).toLocaleDateString()}
                  </span>
                </div>
              </div>
              <ChevronRight className="w-5 h-5 text-surface-500 group-hover:text-surface-300 transition-colors" />
              </button>
            ))}
          </div>
        )
      ) : (
        loadingMessages ? (
          <div className="flex items-center justify-center py-20">
            <div className="w-8 h-8 border-2 border-primary-400 border-t-transparent rounded-full animate-spin" />
          </div>
        ) : (
          <div className="space-y-4 max-w-3xl">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex gap-3 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                {msg.role === 'assistant' && (
                  <div className="w-9 h-9 rounded-xl bg-primary-400/15 flex items-center justify-center shrink-0 mt-1">
                    <Bot className="w-4 h-4 text-primary-400" />
                  </div>
                )}
                <div
                  className={`max-w-[80%] rounded-2xl px-5 py-3 text-sm leading-relaxed ${
                    msg.role === 'user'
                      ? 'bg-primary-400 text-white rounded-br-md'
                      : 'bg-surface-800 border border-surface-700 text-surface-300 rounded-bl-md'
                  }`}
                >
                  <p className="whitespace-pre-wrap">{msg.content}</p>
                  <p className={`text-[10px] mt-2 ${msg.role === 'user' ? 'text-primary-200' : 'text-surface-500'}`}>
                    {new Date(msg.created_at).toLocaleTimeString()}
                  </p>
                </div>
                {msg.role === 'user' && (
                  <div className="w-9 h-9 rounded-xl bg-surface-700 flex items-center justify-center shrink-0 mt-1">
                    <User className="w-4 h-4 text-surface-400" />
                  </div>
                )}
              </div>
            ))}
          </div>
        )
      )}
    </div>
  );
}
