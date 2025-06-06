import { useState } from 'react';

import Button from '~/components/Button';
import AccountSetting from './AccountSetting';
import AccountSecurity from './AccountSecurity';
import styles from './AccountProfile.module.scss';

function AccountProfile() {
    const [setting, setSetting] = useState('profile');

    return (
        <div className={styles['wrapper']}>
            <div className={styles['container']}>
                <h2 className={styles['header']}>Setting</h2>

                <div className="space-between">
                    <div className={styles['sidebar']}>
                        <Button
                            deepBlack={setting === 'profile'}
                            customStyle={styles['btn']}
                            onClick={() => setSetting('profile')}
                        >
                            Profile
                        </Button>

                        <Button
                            deepBlack={setting === 'security'}
                            customStyle={styles['btn']}
                            onClick={() => setSetting('security')}
                        >
                            Security
                        </Button>
                    </div>

                    <div className={styles['body']}>
                        {/* Account Setting */}
                        {setting === 'profile' && <AccountSetting />}

                        {/* Security */}
                        {setting === 'security' && <AccountSecurity />}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AccountProfile;
