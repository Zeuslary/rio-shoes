import { useState } from 'react';

import { storage } from '~/utils';
import ProfileContext from './ProfileContext';

function ProfileProvider({ children }) {
    const [profile, setProfile] = useState(() => storage.get('profile'));

    return (
        <ProfileContext.Provider value={{ profile, setProfile }}>
            {children}
        </ProfileContext.Provider>
    );
}

export default ProfileProvider;
