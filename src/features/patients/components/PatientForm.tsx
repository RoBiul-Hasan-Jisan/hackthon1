import React, { useState } from 'react';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { PatientFormData } from '../types/patients.types';
import { BLOOD_TYPES, GENDERS } from '@/utils/constants';

interface PatientFormProps {
  onSubmit: (data: PatientFormData) => void;
  onCancel: () => void;
  initialData?: Partial<PatientFormData>;
  isLoading?: boolean;
}

export const PatientForm: React.FC<PatientFormProps> = ({
  onSubmit,
  onCancel,
  initialData,
  isLoading = false,
}) => {
  const [formData, setFormData] = useState<PatientFormData>({
    firstName: initialData?.firstName || '',
    lastName: initialData?.lastName || '',
    dateOfBirth: initialData?.dateOfBirth || '',
    gender: initialData?.gender || 'male',
    email: initialData?.email || '',
    phone: initialData?.phone || '',
    address: initialData?.address || '',
    emergencyContact: initialData?.emergencyContact || '',
    bloodType: initialData?.bloodType || '',
    allergies: initialData?.allergies || [],
    conditions: initialData?.conditions || [],
  });

  const [newAllergy, setNewAllergy] = useState('');
  const [newCondition, setNewCondition] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const handleAddAllergy = () => {
    if (newAllergy.trim() && !formData.allergies?.includes(newAllergy.trim())) {
      setFormData(prev => ({
        ...prev,
        allergies: [...(prev.allergies || []), newAllergy.trim()]
      }));
      setNewAllergy('');
    }
  };

  const handleRemoveAllergy = (allergy: string) => {
    setFormData(prev => ({
      ...prev,
      allergies: prev.allergies?.filter(a => a !== allergy) || []
    }));
  };

  const handleAddCondition = () => {
    if (newCondition.trim() && !formData.conditions?.includes(newCondition.trim())) {
      setFormData(prev => ({
        ...prev,
        conditions: [...(prev.conditions || []), newCondition.trim()]
      }));
      setNewCondition('');
    }
  };

  const handleRemoveCondition = (condition: string) => {
    setFormData(prev => ({
      ...prev,
      conditions: prev.conditions?.filter(c => c !== condition) || []
    }));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Input
          label="First Name"
          value={formData.firstName}
          onChange={(e) => setFormData(prev => ({ ...prev, firstName: e.target.value }))}
          required
        />
        
        <Input
          label="Last Name"
          value={formData.lastName}
          onChange={(e) => setFormData(prev => ({ ...prev, lastName: e.target.value }))}
          required
        />
        
        <Input
          label="Date of Birth"
          type="date"
          value={formData.dateOfBirth}
          onChange={(e) => setFormData(prev => ({ ...prev, dateOfBirth: e.target.value }))}
          required
        />
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Gender
          </label>
          <select
            value={formData.gender}
            onChange={(e) => setFormData(prev => ({ ...prev, gender: e.target.value as any }))}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {GENDERS.map(gender => (
              <option key={gender} value={gender}>
                {gender.charAt(0).toUpperCase() + gender.slice(1)}
              </option>
            ))}
          </select>
        </div>
        
        <Input
          label="Email"
          type="email"
          value={formData.email}
          onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
          required
        />
        
        <Input
          label="Phone"
          type="tel"
          value={formData.phone}
          onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
          required
        />
        
        <div className="md:col-span-2">
          <Input
            label="Address"
            value={formData.address}
            onChange={(e) => setFormData(prev => ({ ...prev, address: e.target.value }))}
            required
          />
        </div>
        
        <Input
          label="Emergency Contact"
          value={formData.emergencyContact}
          onChange={(e) => setFormData(prev => ({ ...prev, emergencyContact: e.target.value }))}
        />
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Blood Type
          </label>
          <select
            value={formData.bloodType}
            onChange={(e) => setFormData(prev => ({ ...prev, bloodType: e.target.value }))}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Select Blood Type</option>
            {BLOOD_TYPES.map(type => (
              <option key={type} value={type}>{type}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Allergies */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Allergies
        </label>
        <div className="flex space-x-2 mb-2">
          <Input
            value={newAllergy}
            onChange={(e) => setNewAllergy(e.target.value)}
            placeholder="Add allergy"
          />
          <Button type="button" onClick={handleAddAllergy}>
            Add
          </Button>
        </div>
        <div className="flex flex-wrap gap-2">
          {formData.allergies?.map((allergy) => (
            <span
              key={allergy}
              className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-red-100 text-red-800"
            >
              {allergy}
              <button
                type="button"
                onClick={() => handleRemoveAllergy(allergy)}
                className="ml-2 hover:text-red-900"
              >
                ×
              </button>
            </span>
          ))}
        </div>
      </div>

      {/* Medical Conditions */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Medical Conditions
        </label>
        <div className="flex space-x-2 mb-2">
          <Input
            value={newCondition}
            onChange={(e) => setNewCondition(e.target.value)}
            placeholder="Add medical condition"
          />
          <Button type="button" onClick={handleAddCondition}>
            Add
          </Button>
        </div>
        <div className="flex flex-wrap gap-2">
          {formData.conditions?.map((condition) => (
            <span
              key={condition}
              className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800"
            >
              {condition}
              <button
                type="button"
                onClick={() => handleRemoveCondition(condition)}
                className="ml-2 hover:text-blue-900"
              >
                ×
              </button>
            </span>
          ))}
        </div>
      </div>

      <div className="flex justify-end space-x-4 pt-6">
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit" isLoading={isLoading}>
          Save Patient
        </Button>
      </div>
    </form>
  );
};