import { useAuthStore } from '@/libs/features/auth/useAuthStore.ts';
import { CustomButton } from '@/libs/components/ui/Button';
import { useTranslation } from 'react-i18next';

export default function Home() {
  const { logout } = useAuthStore();
  const { t } = useTranslation();
  return (
    <div>
      <div>Home Components</div>
      <CustomButton
        onClick={() => {
          logout();
        }}
      >
        {t('common.logout')}
      </CustomButton>
    </div>
  );
}
