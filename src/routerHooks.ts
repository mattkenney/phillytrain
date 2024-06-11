import { useLocation, useNavigate } from 'react-router-dom';

export function useGoBack(fallback: string) {
  const location = useLocation();
  const navigate = useNavigate();
  const state = location.state as { allowBack: boolean } | null;

  if (state?.allowBack) {
    return () => {
      navigate(-1);
    };
  }

  return () => {
    navigate(fallback);
  };
}

export function useGoForward() {
  const navigate = useNavigate();

  return (to: string) => {
    navigate(to, { state: { allowBack: true } });
  };
}
