import { useState } from 'react';

import Button from '~/components/Button';
import AccountSetting from './AccountSetting';
import AccountSecurity from './AccountSecurity';
import styles from './Setting.module.scss';

function Setting() {
    const [setting, setSetting] = useState('account');

    return (
        <div className={styles['wrapper']}>
            <h2 className={styles['header']}>Setting</h2>

            <div className="space-between">
                <div className={styles['sidebar']}>
                    <Button
                        deepBlack={setting === 'account'}
                        customStyle={styles['btn']}
                        onClick={() => setSetting('account')}
                    >
                        Account Settings
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
                    {setting === 'account' && <AccountSetting />}

                    {/* Security */}
                    {setting === 'security' && <AccountSecurity />}
                </div>
            </div>
        </div>
    );
}

export default Setting;
