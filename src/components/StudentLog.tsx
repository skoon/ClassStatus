import React from 'react';
import { StudentLogEntry } from '../types';
import { format } from 'date-fns';

interface Props {
  logs: StudentLogEntry[]; //fetch entries from db here.
  onCheckIn: (id: string) => void;
}

export default function StudentLog({ logs, onCheckIn }: Props) {
  const activeStudents = logs.filter(log => !log.checkInTime);
  const completedLogs = logs.filter(log => log.checkInTime).slice(0, 10);

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6">
      {activeStudents.length > 0 && (
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-xl font-semibold mb-4">Currently Out</h2>
          <div className="space-y-4">
            {activeStudents.map(log => (
              <div key={log.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div>
                  <p className="font-medium">{log.name}</p>
                  <p className="text-sm text-gray-600">
                    {log.destination} • Out since {format(log.checkOutTime, 'h:mm a')}
                  </p>
                </div>
                <button
                  onClick={() => onCheckIn(log.id)}
                  className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
                >
                  Check In
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {completedLogs.length > 0 && (
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-xl font-semibold mb-4">Recent Activity</h2>
          <div className="space-y-3">
            {completedLogs.map(log => (
              <div key={log.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div>
                  <p className="font-medium">{log.name}</p>
                  <p className="text-sm text-gray-600">
                    {log.destination} • {format(log.checkOutTime, 'h:mm a')} - {format(log.checkInTime!, 'h:mm a')}
                  </p>
                </div>
                <span className="text-sm text-gray-500">
                  {Math.round((log.checkInTime!.getTime() - log.checkOutTime.getTime()) / 1000 / 60)} min
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}