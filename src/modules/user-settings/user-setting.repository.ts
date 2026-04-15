import api from '../../lib/api';
import { UserSetting } from './user-setting.entity';

export const userSettingRepository = {
  async findAll(): Promise<UserSetting> {
    const result = await api.get('/settings');
    return new UserSetting(result.data);
  },

  async update(data: Partial<UserSetting>): Promise<UserSetting> {
    const result = await api.put('/settings', data);
    return new UserSetting(result.data);
  },
};
