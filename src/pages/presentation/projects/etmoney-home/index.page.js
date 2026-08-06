import { Meta } from 'components/Meta';
import EtMoneyHome from '../../../../layouts/Presentations/EtMoneyHome';

/** Long form presentation deck for the ET Money home redesign case study. */
export default function EtMoneyHomePresentationPage() {
  return (
    <>
      <Meta
        title="ET Money Home Redesign, full presentation"
        description="The full walkthrough of the ET Money home and Explore redesign: the discovery problem, the two approaches tested, and the results after launch."
        type="article"
        ogImage="/og/og-etmoney-home.png"
        ogImageAlt="The redesigned ET Money home screen on a phone, over a dark green cover"
      />
      <EtMoneyHome />
    </>
  );
}
