'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Eye, DollarSign, Users, TrendingUp } from 'lucide-react';
import { Camera } from '@/types';

interface CameraAnalyticsProps {
  cameras: Camera[];
}

export default function CameraAnalytics({ cameras }: CameraAnalyticsProps) {
  const totalViewers = cameras.reduce((sum, cam) => sum + cam.viewer_count, 0);
  const totalViews = cameras.reduce((sum, cam) => sum + cam.total_views, 0);
  const activeCameras = cameras.filter((cam) => cam.status === 'active').length;

  // Mock revenue data - in production this would come from actual transaction data
  const totalRevenue = cameras.length * 120; // $120 avg per camera per month
  const pendingPayout = totalRevenue * 0.6; // 60% creator split

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium text-earth-600 dark:text-earth-400">
            Active Cameras
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <div className="text-3xl font-bold text-earth-900 dark:text-earth-50">
              {activeCameras}
            </div>
            <div className="p-3 bg-nature-100 dark:bg-nature-900 rounded-lg">
              <Eye className="w-6 h-6 text-nature-600 dark:text-nature-400" />
            </div>
          </div>
          <p className="text-xs text-earth-500 mt-2">
            of {cameras.length} total
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium text-earth-600 dark:text-earth-400">
            Current Viewers
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <div className="text-3xl font-bold text-earth-900 dark:text-earth-50">
              {totalViewers.toLocaleString()}
            </div>
            <div className="p-3 bg-blue-100 dark:bg-blue-900 rounded-lg">
              <Users className="w-6 h-6 text-blue-600 dark:text-blue-400" />
            </div>
          </div>
          <p className="text-xs text-earth-500 mt-2">
            watching now
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium text-earth-600 dark:text-earth-400">
            Total Views
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <div className="text-3xl font-bold text-earth-900 dark:text-earth-50">
              {totalViews.toLocaleString()}
            </div>
            <div className="p-3 bg-purple-100 dark:bg-purple-900 rounded-lg">
              <TrendingUp className="w-6 h-6 text-purple-600 dark:text-purple-400" />
            </div>
          </div>
          <p className="text-xs text-earth-500 mt-2">
            all time
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium text-earth-600 dark:text-earth-400">
            Pending Payout
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <div className="text-3xl font-bold text-earth-900 dark:text-earth-50">
              ${pendingPayout.toFixed(0)}
            </div>
            <div className="p-3 bg-green-100 dark:bg-green-900 rounded-lg">
              <DollarSign className="w-6 h-6 text-green-600 dark:text-green-400" />
            </div>
          </div>
          <p className="text-xs text-earth-500 mt-2">
            60% creator split
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
