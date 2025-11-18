import React from 'react';
import { Card } from '@/components/ui/Card';
import { formatDateTime } from '@/utils/helpers';

interface Activity {
  id: string;
  type: 'appointment' | 'patient' | 'medical_record';
  description: string;
  timestamp: string;
  user: string;
}

interface RecentActivityProps {
  activities: Activity[];
}

export const RecentActivity: React.FC<RecentActivityProps> = ({ activities }) => {
  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'appointment':
        return '📅';
      case 'patient':
        return '👥';
      case 'medical_record':
        return '📋';
      default:
        return '🔔';
    }
  };

  return (
    <Card>
      <Card.Header>
        <h3 className="text-lg font-semibold text-gray-900">Recent Activity</h3>
      </Card.Header>
      <Card.Content>
        <div className="space-y-4">
          {activities.map((activity) => (
            <div key={activity.id} className="flex items-start space-x-3">
              <div className="flex-shrink-0 w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
                <span className="text-sm">{getActivityIcon(activity.type)}</span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900">
                  {activity.description}
                </p>
                <p className="text-sm text-gray-500">
                  By {activity.user} • {formatDateTime(activity.timestamp, '12:00')}
                </p>
              </div>
            </div>
          ))}
        </div>
      </Card.Content>
    </Card>
  );
};