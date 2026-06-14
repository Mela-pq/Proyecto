import { useOutletContext } from 'react-router-dom';
import Gallery from '../components/Gallery';

function Home() {
  const { openPinDrawer } = useOutletContext();

  return (
    <main className="px-6">
      <Gallery onOpenPin={openPinDrawer} />
    </main>
  );
}

export default Home;