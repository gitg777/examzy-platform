import { redirect } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';
import { Heart } from 'lucide-react';
import CameraCard from '@/components/stream/CameraCard';
import { Camera } from '@/types';

async function getUser() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect('/auth/login');
  }

  return user;
}

interface FavoriteWithCamera {
  id: string;
  created_at: string;
  camera: Camera | null;
}

async function getFavoriteCameras(userId: string): Promise<FavoriteWithCamera[]> {
  const supabase = await createClient();
  const { data } = await supabase
    .from('favorite_cameras')
    .select(`
      id,
      created_at,
      camera:cameras(*)
    `)
    .eq('user_id', userId)
    .order('created_at', { ascending: false });

  return (data as FavoriteWithCamera[]) || [];
}

export default async function FavoritesPage() {
  const user = await getUser();
  const favorites = await getFavoriteCameras(user.id);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-earth-900 dark:text-earth-50 mb-2">
          My Favorite Cameras
        </h1>
        <p className="text-earth-600 dark:text-earth-400">
          Quick access to your bookmarked wildlife streams
        </p>
      </div>

      {favorites.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {favorites.map((fav) => fav.camera && (
            <CameraCard key={fav.id} camera={fav.camera} isFavorite={true} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12 bg-earth-100 dark:bg-earth-900 rounded-lg">
          <Heart className="w-12 h-12 mx-auto mb-4 text-earth-400" />
          <p className="text-earth-600 dark:text-earth-400 mb-4">
            You haven&apos;t favorited any cameras yet
          </p>
          <a
            href="/browse"
            className="inline-flex items-center justify-center px-6 py-3 bg-nature-600 text-white rounded-lg hover:bg-nature-700 transition-colors"
          >
            Browse Cameras
          </a>
        </div>
      )}
    </div>
  );
}
