import React, { useState } from 'react';
import { ClipboardList } from 'lucide-react';
import StudentForm from './components/StudentForm';
import StudentLog from './components/StudentLog';
import { StudentLogEntry as StudentLogType, Destination } from './types';
import PocketBase from 'pocketbase';




const pb = new PocketBase("http://10.31.0.138:8091");

async function authenticateUser() {
  if (!pb.authStore.isValid) {
    try {
      const authData = await pb.collection('users').authWithPassword(
        'leuser@lhs.edu', // Replace with the user's email
        'lepassword'      // Replace with the user's password
      );

      console.log('Authenticated successfully:', authData);

      // The token is automatically saved in the authStore
      console.log('Auth token:', pb.authStore.token);
    } catch (error) {
      console.error('Authentication failed:', error);
    }
  }
}

// Call the function to authenticate
//authenticateUser();
function App() {
  const [logs, setLogs] = useState<StudentLogType[]>([]);
  

  const getLogs =  async() => {
    authenticateUser();
    //grab current logs.
    console.log("getting logs");
    const records = await pb.collection('StudentLogEntries').getFullList({
     sort: '+checkOutTime',
   });
   let mappedRecords:StudentLogType[] = [];
   console.log("records", records);
     records.map( (rec) => {
      if(new Date(rec.checkOutTime).getDate() == new Date().getDate()) {
        const newRec:StudentLogType = {
          id:rec.id,
          name:rec.name,
          destination: rec.destination,
          checkOutTime:new Date(rec.checkOutTime),
          checkInTime: rec.checkInTime != ""? new Date(rec.checkInTime) : rec.checkInTime
        }
          mappedRecords.push(newRec);
          setLogs(prev => [newRec, ...prev]);
      }
    });
    console.log("mappedRecords", mappedRecords);
    return mappedRecords;
     
  }
   

  const handleCheckOut = async (name: string, destination: Destination) => {
    authenticateUser();
    const record:StudentLogType = await pb.collection('StudentLogEntries').create({
      name:name,
      destination:destination,
      checkOutTime: new Date()
    });

    setLogs(prev => [record, ...prev]);   
  };
  authenticateUser();
  const handleCheckIn = async (id: string) => {
    const record = await pb.collection('StudentLogEntries').update(id, {checkInTime:new Date()});
    setLogs(prev =>
      prev.map(log =>
        log.id === id ? { ...log, checkInTime: new Date(record.checkInTime) } : log
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
        <StudentLog logs={logs} onCheckIn={handleCheckIn} fetchLogs={getLogs} />
      </div>
    </div>
  );
}

export default App;
