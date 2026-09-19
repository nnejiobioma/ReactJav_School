'use client';

import { useEffect } from 'react';
import { LocalDataService } from '@/lib/supabase/client';

/**
 * ServerSyncProvider mounts once globally in RootLayout.
 * On mount, it synchronizes all server-persisted JSON files (site content, courses, tracks)
 * from the disk to the browser's localStorage, ensuring edits made from the GUI are never
 * lost across server restarts, port changes, or browser sessions.
 */
export default function ServerSyncProvider() {
  useEffect(() => {
    LocalDataService.syncFromServer();
  }, []);

  return null;
}
