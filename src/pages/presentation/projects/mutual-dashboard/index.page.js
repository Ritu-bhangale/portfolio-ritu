import { Meta } from 'components/Meta';
import MutualDashboard from '../../../../layouts/Presentations/MutualDashboard';

/** Long form presentation deck for the mutual funds dashboard case study. */
export default function MutualDashboardPresentationPage() {
  return (
    <>
      <Meta
        title="Mutual Funds Dashboard, full presentation"
        description="The full walkthrough of the ET Money mutual funds dashboard redesign: the trust problem, the phased rollout, and the road to 99.9% accuracy."
        type="article"
        ogImage="/og/og-mutual-dashboard.png"
        ogImageAlt="Two phones showing the redesigned ET Money mutual funds dashboard beside a wax seal reading 99.9% accuracy"
      />
      <MutualDashboard />
    </>
  );
}
