import React from 'react';
import { Card } from '@/components/ui/Card';

export const HealthMetrics: React.FC = () => {
  const metrics = [
    { label: 'Average Patient Wait Time', value: '15 min', trend: 'down' },
    { label: 'Patient Satisfaction', value: '94%', trend: 'up' },
    { label: 'Appointment Completion', value: '88%', trend: 'up' },
    { label: 'Emergency Cases', value: '12', trend: 'down' },
  ];

  return (
    <Card>
      <Card.Header>
        <h3 className="text-lg font-semibold text-gray-900">Health Metrics</h3>
      </Card.Header>
      <Card.Content>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {metrics.map((metric) => (
            <div key={metric.label} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div>
                <p className="text-sm font-medium text-gray-600">{metric.label}</p>
                <p className="text-2xl font-bold text-gray-900">{metric.value}</p>
              </div>
              <div className={`text-lg ${
                metric.trend === 'up' ? 'text-green-500' : 'text-red-500'
              }`}>
                {metric.trend === 'up' ? '↗' : '↘'}
              </div>
            </div>
          ))}
        </div>
      </Card.Content>
    </Card>
  );
};