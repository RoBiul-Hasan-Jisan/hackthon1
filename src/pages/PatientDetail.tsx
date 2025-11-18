import React from 'react';
import { useParams } from 'react-router-dom';

const PatientDetail: React.FC = () => {
  const { id } = useParams();

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-gray-900">Patient Detail</h1>
      <p className="text-gray-600">Patient ID: {id}</p>
      <div className="mt-4 p-4 bg-yellow-100 border border-yellow-400 rounded-lg">
        <p className="text-yellow-800">
          This is a placeholder page. In a real application, you would fetch and display 
          detailed information for patient {id} here.
        </p>
      </div>
    </div>
  );
};

export default PatientDetail;