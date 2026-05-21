import { useAuthStore } from '@/libs/features/auth/useAuthStore.ts';
import { CustomButton } from '@/libs/components/ui/Button';

export default function Home() {
  const { logout } = useAuthStore();
  return (
    <div>
      <div>Home Components</div>
      <CustomButton
        onClick={() => {
          logout();
        }}
      >
        Logout
      </CustomButton>
    </div>
  );
}
