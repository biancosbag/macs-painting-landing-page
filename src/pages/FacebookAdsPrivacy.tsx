import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

const FacebookAdsPrivacy = () => {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-12 max-w-4xl">
        <Link to="/">
          <Button variant="ghost" className="mb-6">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Home
          </Button>
        </Link>

        <h1 className="text-4xl font-bold mb-2">Facebook Ads Privacy Policy</h1>
        <p className="text-muted-foreground mb-8">Advertising and Data Usage Disclosure</p>
        <p className="text-sm text-muted-foreground mb-8">Last Updated: {new Date().toLocaleDateString()}</p>

        <div className="prose prose-slate max-w-none space-y-8">
          <section>
            <h2 className="text-2xl font-semibold mb-4">1. Overview</h2>
            <p className="text-muted-foreground leading-relaxed">
              Mac's Painting uses Facebook Ads and related Meta technologies to reach potential customers and improve our advertising effectiveness. This policy explains how we use Facebook advertising tools and how your data may be processed when you interact with our Facebook ads or visit our website.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">2. Facebook Pixel and Tracking</h2>
            <h3 className="text-xl font-semibold mb-3 mt-4">2.1 What is Facebook Pixel?</h3>
            <p className="text-muted-foreground leading-relaxed">
              We may use the Facebook Pixel, a piece of code placed on our website that allows us to measure, optimize, and build audiences for our advertising campaigns. The Facebook Pixel enables us to:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-muted-foreground mt-3">
              <li>Track conversions from Facebook ads</li>
              <li>Optimize ads based on collected data</li>
              <li>Build targeted audiences for future ads</li>
              <li>Remarket to people who have visited our website</li>
            </ul>

            <h3 className="text-xl font-semibold mb-3 mt-4">2.2 Data Collected by Facebook Pixel</h3>
            <p className="text-muted-foreground leading-relaxed">
              When you visit our website, the Facebook Pixel may automatically collect:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-muted-foreground mt-3">
              <li>Browser and device information</li>
              <li>IP address and general location data</li>
              <li>Pages visited and actions taken on our website</li>
              <li>Date and time of your visit</li>
              <li>Referral source (how you arrived at our site)</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">3. How We Use Facebook Advertising</h2>
            <p className="text-muted-foreground leading-relaxed mb-3">
              We use Facebook's advertising platform to:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
              <li><strong>Custom Audiences:</strong> Target people who have already interacted with our business or visited our website</li>
              <li><strong>Lookalike Audiences:</strong> Reach new people whose interests are similar to our existing customers</li>
              <li><strong>Interest-Based Targeting:</strong> Show ads to people based on their interests, demographics, and behaviors</li>
              <li><strong>Retargeting:</strong> Show ads to people who have visited our website but haven't contacted us yet</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">4. Data Sharing with Meta (Facebook)</h2>
            <p className="text-muted-foreground leading-relaxed">
              When you interact with our Facebook ads or visit our website with the Facebook Pixel installed, certain information is automatically shared with Meta Platforms, Inc. (Facebook's parent company). This data is subject to Facebook's Data Policy, which can be found at: <a href="https://www.facebook.com/privacy/policy/" target="_blank" rel="noopener noreferrer" className="text-accent hover:underline">https://www.facebook.com/privacy/policy/</a>
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">5. Your Privacy Choices</h2>
            <h3 className="text-xl font-semibold mb-3 mt-4">5.1 Opt-Out Options</h3>
            <p className="text-muted-foreground leading-relaxed mb-3">
              You have several options to control Facebook ad tracking:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
              <li><strong>Facebook Ad Preferences:</strong> Adjust your ad preferences in your Facebook account settings at <a href="https://www.facebook.com/ads/preferences/" target="_blank" rel="noopener noreferrer" className="text-accent hover:underline">facebook.com/ads/preferences</a></li>
              <li><strong>Browser Settings:</strong> Most web browsers allow you to control cookies through their settings. You can set your browser to refuse all cookies or to indicate when a cookie is being sent.</li>
              <li><strong>Digital Advertising Alliance:</strong> Opt out of interest-based advertising at <a href="http://optout.aboutads.info/" target="_blank" rel="noopener noreferrer" className="text-accent hover:underline">optout.aboutads.info</a></li>
              <li><strong>Network Advertising Initiative:</strong> Opt out at <a href="http://optout.networkadvertising.org/" target="_blank" rel="noopener noreferrer" className="text-accent hover:underline">optout.networkadvertising.org</a></li>
            </ul>

            <h3 className="text-xl font-semibold mb-3 mt-4">5.2 Mobile Device Settings</h3>
            <p className="text-muted-foreground leading-relaxed mb-3">
              You can limit ad tracking on your mobile device:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
              <li><strong>iOS:</strong> Go to Settings → Privacy → Advertising → Enable "Limit Ad Tracking"</li>
              <li><strong>Android:</strong> Go to Settings → Google → Ads → Enable "Opt out of Ads Personalization"</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">6. Conversion API and Server-Side Tracking</h2>
            <p className="text-muted-foreground leading-relaxed">
              In addition to the Facebook Pixel, we may use Facebook's Conversions API to send web event data directly from our servers to Facebook. This helps improve the accuracy of conversion tracking and measurement while giving you more control over the data you share.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">7. Children's Privacy</h2>
            <p className="text-muted-foreground leading-relaxed">
              Our services are not directed to individuals under the age of 18. We do not knowingly collect personal information from children under 18 through our Facebook advertising campaigns. If we learn we have collected information from a child under 18, we will delete that information promptly.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">8. International Data Transfers</h2>
            <p className="text-muted-foreground leading-relaxed">
              Facebook operates globally, and your information may be transferred to, stored, and processed in countries outside of your country of residence, including the United States. These countries may have data protection laws that differ from those in your country.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">9. Data Retention</h2>
            <p className="text-muted-foreground leading-relaxed">
              Data collected through Facebook Pixel and advertising tools is retained according to Facebook's data retention policies. We retain Facebook campaign data for analytical purposes as long as necessary to improve our advertising performance and comply with legal requirements.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">10. Your Rights Under CCPA (California Residents)</h2>
            <p className="text-muted-foreground leading-relaxed mb-3">
              If you are a California resident, you have specific rights regarding your personal information collected through Facebook advertising:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
              <li>Right to know what personal information is collected, used, shared, or sold</li>
              <li>Right to delete personal information held by us</li>
              <li>Right to opt-out of the sale of personal information (we do not sell personal information)</li>
              <li>Right to non-discrimination for exercising your privacy rights</li>
            </ul>
            <p className="text-muted-foreground leading-relaxed mt-3">
              To exercise these rights, contact us at byron@macspp.co or (267) 516-3306.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">11. Updates to This Policy</h2>
            <p className="text-muted-foreground leading-relaxed">
              We may update this Facebook Ads Privacy Policy from time to time to reflect changes in our practices or for other operational, legal, or regulatory reasons. We will post the updated policy on this page with a new "Last Updated" date.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">12. Additional Resources</h2>
            <p className="text-muted-foreground leading-relaxed mb-3">
              For more information about Facebook's advertising practices and your choices:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
              <li>Facebook Data Policy: <a href="https://www.facebook.com/privacy/policy/" target="_blank" rel="noopener noreferrer" className="text-accent hover:underline">facebook.com/privacy/policy</a></li>
              <li>Facebook Cookie Policy: <a href="https://www.facebook.com/policies/cookies/" target="_blank" rel="noopener noreferrer" className="text-accent hover:underline">facebook.com/policies/cookies</a></li>
              <li>About Facebook Ads: <a href="https://www.facebook.com/business/ads" target="_blank" rel="noopener noreferrer" className="text-accent hover:underline">facebook.com/business/ads</a></li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">13. Contact Us</h2>
            <p className="text-muted-foreground leading-relaxed mb-3">
              If you have questions or concerns about our Facebook advertising practices or this privacy policy, please contact us:
            </p>
            <div className="bg-muted p-4 rounded-lg">
              <p className="text-muted-foreground"><strong>Mac's Painting</strong></p>
              <p className="text-muted-foreground">Email: byron@macspp.co</p>
              <p className="text-muted-foreground">Phone: (267) 516-3306</p>
              <p className="text-muted-foreground">Serving: PA Suburbs</p>
            </div>
          </section>

          <section className="bg-muted p-6 rounded-lg mt-8">
            <h2 className="text-2xl font-semibold mb-4">Note on Effectiveness</h2>
            <p className="text-muted-foreground leading-relaxed">
              Please note that opting out of interest-based advertising does not mean you will stop seeing ads from Mac's Painting or on Facebook. You may still see ads, but they will be less relevant to your interests.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default FacebookAdsPrivacy;
