import React, { useState } from 'react';
import { Button } from '@/components/ui/Button';
import { Modal } from '@/components/ui/Modal';
import { PatientList } from '@/features/patients/components/PatientList';
import { PatientForm } from '@/features/patients/components/PatientForm';
import { PatientProfile } from '@/features/patients/components/PatientProfile';
import { Patient, PatientFormData } from '@/features/patients/types/patients.types';
import { generateId } from '@/utils/helpers';

const Patients: React.FC = () => {
  const [patients, setPatients] = useState<Patient[]>([
    {
      id: '1',
      firstName: 'John',
      lastName: 'Doe',
      dateOfBirth: '1985-03-15',
      gender: 'male',
      email: 'john.doe@email.com',
      phone: '+1 (555) 123-4567',
      address: '123 Main St, Anytown, USA',
      emergencyContact: '+1 (555) 987-6543',
      bloodType: 'A+',
      allergies: ['Penicillin', 'Peanuts'],
      conditions: ['Hypertension', 'Asthma'],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    },
    {
      id: '2',
      firstName: 'Jane',
      lastName: 'Smith',
      dateOfBirth: '1990-07-22',
      gender: 'female',
      email: 'jane.smith@email.com',
      phone: '+1 (555) 234-5678',
      address: '456 Oak Ave, Somewhere, USA',
      bloodType: 'O-',
      allergies: [],
      conditions: ['Diabetes'],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }
  ]);

  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isViewOpen, setIsViewOpen] = useState(false);
  const [editingPatient, setEditingPatient] = useState<Patient | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleCreatePatient = (data: PatientFormData) => {
    setIsLoading(true);
    setTimeout(() => {
      const newPatient: Patient = {
        ...data,
        id: generateId(),
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };
      setPatients(prev => [...prev, newPatient]);
      setIsFormOpen(false);
      setIsLoading(false);
    }, 1000);
  };

  const handleUpdatePatient = (data: PatientFormData) => {
    if (!editingPatient) return;
    
    setIsLoading(true);
    setTimeout(() => {
      setPatients(prev => prev.map(patient =>
        patient.id === editingPatient.id
          ? { ...data, id: editingPatient.id, createdAt: editingPatient.createdAt, updatedAt: new Date().toISOString() }
          : patient
      ));
      setEditingPatient(null);
      setIsFormOpen(false);
      setIsLoading(false);
    }, 1000);
  };

  const handleDeletePatient = (patientId: string) => {
    if (window.confirm('Are you sure you want to delete this patient?')) {
      setPatients(prev => prev.filter(patient => patient.id !== patientId));
    }
  };

  const handleEditPatient = (patient: Patient) => {
    setEditingPatient(patient);
    setIsFormOpen(true);
  };

  const handleViewPatient = (patient: Patient) => {
    setSelectedPatient(patient);
    setIsViewOpen(true);
  };

  const handleFormSubmit = (data: PatientFormData) => {
    if (editingPatient) {
      handleUpdatePatient(data);
    } else {
      handleCreatePatient(data);
    }
  };

  const handleFormClose = () => {
    setIsFormOpen(false);
    setEditingPatient(null);
  };

  return (
    <div className="space-y-6 p-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Patients</h1>
          <p className="text-gray-600">Manage patient records and information</p>
        </div>
        <Button onClick={() => setIsFormOpen(true)}>
          Add New Patient
        </Button>
      </div>

      <PatientList
        patients={patients}
        onEdit={handleEditPatient}
        onDelete={handleDeletePatient}
        onView={handleViewPatient}
      />

      {/* Patient Form Modal */}
      <Modal
        isOpen={isFormOpen}
        onClose={handleFormClose}
        title={editingPatient ? 'Edit Patient' : 'Add New Patient'}
        size="xl"
      >
        <PatientForm
          onSubmit={handleFormSubmit}
          onCancel={handleFormClose}
          initialData={editingPatient || undefined}
          isLoading={isLoading}
        />
      </Modal>

      {/* Patient View Modal */}
      <Modal
        isOpen={isViewOpen}
        onClose={() => setIsViewOpen(false)}
        title="Patient Profile"
        size="xl"
      >
        {selectedPatient && <PatientProfile patient={selectedPatient} />}
      </Modal>
    </div>
  );
};

export default Patients;