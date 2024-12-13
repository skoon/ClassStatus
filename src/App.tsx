import React, { useState } from 'react';
import { ClipboardList } from 'lucide-react';
import StudentForm from './components/StudentForm';
import StudentLog from './components/StudentLog';
import { StudentLogEntry as StudentLogType, Destination } from './types';
import PocketBase from 'pocketbase';

const auth_token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjb2xsZWN0aW9uSWQiOiJwYmNfMzE0MjYzNTgyMyIsImV4cCI6MTczMjc0NDUzNSwiaWQiOiI5NHo3NThieWo4ZzJlNngiLCJyZWZyZXNoYWJsZSI6ZmFsc2UsInR5cGUiOiJhdXRoIn0.qL3rFgk-NjblM5ZWbm1Nb0SwDtzAg5Ub18njuc3w12s";
const pb = new PocketBase("http://10.31.0.138:8090");
pb.authStore.save(auth_token, null);

function App() {
  const [logs, setLogs] = useState<StudentLogType[]>([]);

  const getLogs =  async() => {
    //grab current logs.
    console.log("getting logs");
    const records = await pb.collection('StudentLogEntries').getFullList({
     sort: '-checkouttime',
   });
   let mappedRecords:StudentLogType[] = [];
     console.log("Settings logs" + records);
     records.map( (rec) => {
      console.log(rec);
      console.log(rec.checkouttime);
      console.log("CheckInTime=" + rec.checkintime);
      const newRec:StudentLogType = {
        id:rec.id,
        name:rec.name,
        destination: rec.destination,
        checkOutTime:new Date(rec.checkouttime),
        checkInTime: rec.checkintime != ""? new Date(rec.checkintime) : rec.checkintime
      }
        mappedRecords.push(newRec);
        setLogs(prev => [newRec, ...prev]);
    });
    return mappedRecords;
     
  }
   

  const handleCheckOut = async (name: string, destination: Destination) => {
      
    const record: StudentLogType = await pb.collection('StudentLogEntries').create({
      name:name,
      destination:destination,
      checkouttime: new Date().toUTCString()
    });
    setLogs(prev => [record, ...prev]);
  };

  const handleCheckIn = async (id: string) => {
    const record = await pb.collection('StudentLogEntries').update(id, {checkintime:new Date().toUTCString()});
    setLogs(prev =>
      prev.map(log =>
        log.id === record.id ? { ...log, checkInTime: new Date() } : log
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
