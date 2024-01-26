import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function LandingPage() {
  return (
    <div className="">
      <Link href="/signin">
        <Button variant="secondary">Login</Button>
      </Link>
      <Link href="/signup">
        <Button variant="secondary">Register</Button>
      </Link>
    </div>
  );
}
