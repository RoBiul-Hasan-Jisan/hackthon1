import React from 'react';
import { Card } from '@/components/ui/Card';
import { Patient } from '../types/patients.types';
import { formatDate, calculateAge } from '@/utils/helpers';

interface PatientProfileProps {
  patient: Patient;
}

export const PatientProfile: React.FC<PatientProfileProps> = ({ patient }) => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-1">
        <Card>
          <Card.Content>
            <div className="text-center">
              <div className="w-24 h-24 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl text-blue-600">
                  {patient.firstName[0]}{patient.lastName[0]}
                </span>
              </div>
              <h2 className="text-xl font-bold text-gray-900">
                {patient.firstName} {patient.lastName}
              </h2>
              <p className="text-gray-600">
                Patient ID: {patient.id}
              </p>
            </div>
            
            <div className="mt-6 space-y-4">
              <div>
                <label className="text-sm font-medium text-gray-600">Age</label>
                <p className="text-gray-900">{calculateAge(patient.dateOfBirth)} years</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-600">Gender</label>
                <p className="text-gray-900 capitalize">{patient.gender}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-600">Blood Type</label>
                <p className="text-gray-900">{patient.bloodType || 'N/A'}</p>
              </div>
            </div>
          </Card.Content>
        </Card>
      </div>
      
      <div className="lg:col-span-2 space-y-6">
        <Card>
          <Card.Header>
            <h3 className="text-lg font-semibold text-gray-900">Contact Information</h3>
          </Card.Header>
          <Card.Content>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-gray-600">Email</label>
                <p className="text-gray-900">{patient.email}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-600">Phone</label>
                <p className="text-gray-900">{patient.phone}</p>
              </div>
              <div className="md:col-span-2">
                <label className="text-sm font-medium text-gray-600">Address</label>
                <p className="text-gray-900">{patient.address}</p>
              </div>
              {patient.emergencyContact && (
                <div className="md:col-span-2">
                  <label className="text-sm font-medium text-gray-600">Emergency Contact</label>
                  <p className="text-gray-900">{patient.emergencyContact}</p>
                </div>
              )}
            </div>
          </Card.Content>
        </Card>
        
        <Card>
          <Card.Header>
            <h3 className="text-lg font-semibold text-gray-900">Medical Information</h3>
          </Card.Header>
          <Card.Content>
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium text-gray-600">Allergies</label>
                <div className="flex flex-wrap gap-2 mt-1">
                  {patient.allergies && patient.allergies.length > 0 ? (
                    patient.allergies.map((allergy) => (
                      <span
                        key={allergy}
                        className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800"
                      >
                        {allergy}
                      </span>
                    ))
                  ) : (
                    <p className="text-gray-500">No allergies recorded</p>
                  )}
                </div>
              </div>
              
              <div>
                <label className="text-sm font-medium text-gray-600">Medical Conditions</label>
                <div className="flex flex-wrap gap-2 mt-1">
                  {patient.conditions && patient.conditions.length > 0 ? (
                    patient.conditions.map((condition) => (
                      <span
                        key={condition}
                        className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800"
                      >
                        {condition}
                      </span>
                    ))
                  ) : (
                    <p className="text-gray-500">No medical conditions recorded</p>
                  )}
                </div>
              </div>
            </div>
          </Card.Content>
        </Card>
      </div>
    </div>
  );
};