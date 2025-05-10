import { useState } from 'react';

import Button from '~/components/Button';
import images from '~/assets/images';
import CartBox from '~/admin/components/CartBox';
import AccountSetting from './AccountSetting';
import AccountSecurity from './AccountSecurity';
import styles from './Setting.module.scss';

const account = {
    id: 'U008',
    avatar: images.zuri,
    phone: 903727230,
    email: 'rio@gmail.com',
    username: 'admin',
    password: '123123',
    role: 'admin',
    fullName: 'Admin Rio',
    createdAt: '2025-01-30T11:30:00',
    customerId: null,
    lastLogin: '2025-05-09T10:10:00',
    status: 'active',
};

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
                    {setting === 'account' && <AccountSetting account={account} />}

                    {/* Security */}
                    {setting === 'security' && <AccountSecurity account={account} />}
                </div>
            </div>
        </div>
    );
}

export default Setting;
