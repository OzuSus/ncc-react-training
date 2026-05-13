import { useAuthStore } from '@/features/auth/useAuthStore.ts';
import { CustomButton } from '@/components/ui/Button';

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
