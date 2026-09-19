import { DEFAULT_SITE_CONTENT } from '../src/lib/supabase/defaultSiteContent';
import { INITIAL_COURSES } from '../src/lib/supabase/mockData';
import { ACADEMY_TRACKS } from '../src/data/academyTracks';
import fs from 'fs';
import path from 'path';

const dataDir = path.join(process.cwd(), 'src', 'data');
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true });
}

fs.writeFileSync(path.join(dataDir, 'persistedSiteContent.json'), JSON.stringify(DEFAULT_SITE_CONTENT, null, 2));
fs.writeFileSync(path.join(dataDir, 'persistedCourses.json'), JSON.stringify(INITIAL_COURSES, null, 2));
fs.writeFileSync(path.join(dataDir, 'persistedAcademyTracks.json'), JSON.stringify(ACADEMY_TRACKS, null, 2));
console.log('INITIALIZED_PERSISTED_DATA_OK');
