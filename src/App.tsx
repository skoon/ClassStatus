import React, { useState } from 'react';
import { ClipboardList } from 'lucide-react';
import StudentForm from './components/StudentForm';
import StudentLog from './components/StudentLog';
import { StudentLogEntry as StudentLogType, Destination } from './types';

function App() {
  const [logs, setLogs] = useState<StudentLogType[]>([]);

  const handleCheckOut = (name: string, destination: Destination) => {
    const newLog: StudentLogType = {
      id: crypto.randomUUID(),
      name,
      destination,
      checkOutTime: new Date(),
    };
    setLogs(prev => [newLog, ...prev]);
  };

  const handleCheckIn = (id: string) => {
    setLogs(prev =>
      prev.map(log =>
        log.id === id ? { ...log, checkInTime: new Date() } : log
      )
    );
  };

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4">
      <div className="max-w-6xl mx-auto space-y-8">
        <header className="text-center">
          <div className="flex items-center justify-center gap-3 mb-2">
            <ClipboardList className="w-8 h-8 text-blue-600" />
            <h1 className="text-3xl font-bold text-gray-900">Classroom Check In/Out</h1>
          </div>
          <p className="text-gray-600">Track student movements efficiently and securely</p>
        </header>

        <StudentForm onCheckOut={handleCheckOut} />
        <StudentLog logs={logs} onCheckIn={handleCheckIn} />
      </div>
    </div>
  );
}

export default App;