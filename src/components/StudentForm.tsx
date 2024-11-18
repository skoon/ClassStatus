import React, { useState } from 'react';
import { Destination } from '../types';
import { Building2, GraduationCap, School } from 'lucide-react';

interface Props {
  onCheckOut: (name: string, destination: Destination) => void;
}

export default function StudentForm({ onCheckOut }: Props) {
  const [name, setName] = useState('');
  
  const destinations: { type: Destination; icon: React.ReactNode; color: string }[] = [
    { type: 'Bathroom', icon: <Building2 className="w-6 h-6" />, color: 'bg-blue-500' },
    { type: 'Office', icon: <School className="w-6 h-6" />, color: 'bg-purple-500' },
    { type: 'Other Class', icon: <GraduationCap className="w-6 h-6" />, color: 'bg-green-500' }
  ];

  const handleSubmit = (destination: Destination) => {
    if (name.trim()) {
      onCheckOut(name.trim(), destination);
      setName('');
    }
  };

  return (
    <div className="w-full max-w-md mx-auto bg-white rounded-xl shadow-lg p-6 space-y-6">
      <div className="space-y-4">
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Student Name"
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
        
        <div className="grid grid-cols-3 gap-4">
          {destinations.map(({ type, icon, color }) => (
            <button
              key={type}
              onClick={() => handleSubmit(type)}
              disabled={!name.trim()}
              className={`${color} text-white p-4 rounded-lg transition-transform hover:scale-105 disabled:opacity-50 disabled:hover:scale-100 flex flex-col items-center gap-2`}
            >
              {icon}
              <span className="text-sm font-medium">{type}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}