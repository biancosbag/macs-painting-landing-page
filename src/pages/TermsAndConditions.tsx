import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

const TermsAndConditions = () => {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-12 max-w-4xl">
        <Link to="/">
          <Button variant="ghost" className="mb-6">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Home
          </Button>
        </Link>

        <h1 className="text-4xl font-bold mb-2">Terms & Conditions</h1>
        <p className="text-muted-foreground mb-8">Data Privacy Policy</p>
        <p className="text-sm text-muted-foreground mb-8">Last Updated: {new Date().toLocaleDateString()}</p>

        <div className="prose prose-slate max-w-none space-y-8">
          <section>
            <h2 className="text-2xl font-semibold mb-4">1. Introduction</h2>
            <p className="text-muted-foreground leading-relaxed">
              Mac's Painting ("we," "our," or "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website or use our services, in compliance with applicable United States data protection laws, including but not limited to the California Consumer Privacy Act (CCPA) and other state privacy regulations.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">2. Information We Collect</h2>
            <h3 className="text-xl font-semibold mb-3 mt-4">2.1 Personal Information</h3>
            <p className="text-muted-foreground leading-relaxed mb-3">
              We may collect personal information that you voluntarily provide to us when you:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
              <li>Request a quote or consultation</li>
              <li>Contact us via phone, email, or contact form</li>
              <li>Schedule painting services</li>
            </ul>
            <p className="text-muted-foreground leading-relaxed mt-3">
              This information may include: name, email address, phone number, physical address, and project details.
            </p>

            <h3 className="text-xl font-semibold mb-3 mt-4">2.2 Automatically Collected Information</h3>
            <p className="text-muted-foreground leading-relaxed">
              When you visit our website, we may automatically collect certain information about your device, including information about your web browser, IP address, time zone, and cookies installed on your device.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">3. How We Use Your Information</h2>
            <p className="text-muted-foreground leading-relaxed mb-3">
              We use the information we collect to:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
              <li>Provide, operate, and maintain our services</li>
              <li>Respond to your inquiries and provide customer support</li>
              <li>Send you estimates, invoices, and service-related communications</li>
              <li>Improve our website and services</li>
              <li>Communicate with you about our services, promotions, and updates</li>
              <li>Comply with legal obligations and protect our legal rights</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">4. Disclosure of Your Information</h2>
            <p className="text-muted-foreground leading-relaxed mb-3">
              We may share your information in the following situations:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
              <li><strong>Service Providers:</strong> We may share your information with third-party vendors who perform services on our behalf, such as payment processing, email delivery, or customer support.</li>
              <li><strong>Legal Requirements:</strong> We may disclose your information if required to do so by law or in response to valid requests by public authorities.</li>
              <li><strong>Business Transfers:</strong> In connection with any merger, sale of company assets, or acquisition of all or a portion of our business.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">5. Your Privacy Rights (CCPA)</h2>
            <p className="text-muted-foreground leading-relaxed mb-3">
              If you are a California resident, you have the following rights under the California Consumer Privacy Act:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
              <li><strong>Right to Know:</strong> You have the right to request information about the personal data we have collected about you in the past 12 months.</li>
              <li><strong>Right to Delete:</strong> You have the right to request that we delete your personal information, subject to certain exceptions.</li>
              <li><strong>Right to Opt-Out:</strong> You have the right to opt-out of the sale of your personal information. We do not sell personal information.</li>
              <li><strong>Right to Non-Discrimination:</strong> We will not discriminate against you for exercising any of your CCPA rights.</li>
            </ul>
            <p className="text-muted-foreground leading-relaxed mt-3">
              To exercise these rights, please contact us at byron@macspp.co or (267) 516-3306.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">6. Data Security</h2>
            <p className="text-muted-foreground leading-relaxed">
              We implement appropriate technical and organizational security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. However, no method of transmission over the internet or electronic storage is 100% secure, and we cannot guarantee absolute security.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">7. Data Retention</h2>
            <p className="text-muted-foreground leading-relaxed">
              We will retain your personal information only for as long as necessary to fulfill the purposes outlined in this Privacy Policy, unless a longer retention period is required or permitted by law. When we no longer need your information, we will securely delete or anonymize it.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">8. Third-Party Links</h2>
            <p className="text-muted-foreground leading-relaxed">
              Our website may contain links to third-party websites. We are not responsible for the privacy practices or content of these third-party sites. We encourage you to review the privacy policies of any third-party sites you visit.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">9. Children's Privacy</h2>
            <p className="text-muted-foreground leading-relaxed">
              Our services are not directed to individuals under the age of 18. We do not knowingly collect personal information from children under 18. If you are a parent or guardian and believe your child has provided us with personal information, please contact us.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">10. Changes to This Privacy Policy</h2>
            <p className="text-muted-foreground leading-relaxed">
              We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last Updated" date. You are advised to review this Privacy Policy periodically for any changes.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">11. Contact Us</h2>
            <p className="text-muted-foreground leading-relaxed mb-3">
              If you have any questions about this Privacy Policy or wish to exercise your privacy rights, please contact us:
            </p>
            <div className="bg-muted p-4 rounded-lg">
              <p className="text-muted-foreground"><strong>Mac's Painting</strong></p>
              <p className="text-muted-foreground">Email: byron@macspp.co</p>
              <p className="text-muted-foreground">Phone: (267) 516-3306</p>
              <p className="text-muted-foreground">Serving: PA Suburbs</p>
            </div>
          </section>

          <section className="bg-muted p-6 rounded-lg mt-8">
            <h2 className="text-2xl font-semibold mb-4">Consent</h2>
            <p className="text-muted-foreground leading-relaxed">
              By using our website or services, you consent to our Privacy Policy and agree to its terms. If you do not agree with this policy, please do not use our services.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default TermsAndConditions;
