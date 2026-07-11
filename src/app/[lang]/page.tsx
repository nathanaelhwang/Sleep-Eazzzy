import { Home } from '@/components/Home';

// Home page metadata is set in the [lang] layout's generateMetadata (since both
// the layout and the page resolve to the same URL). No per-page override here.
export default function Page() {
  return <Home />;
}
