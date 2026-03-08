import React from "react";

const RefundPolicy: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-6">
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-2xl p-10">

        <h1 className="text-4xl font-bold text-center text-gray-800 mb-6">
          Refund & Cancellation Policy
        </h1>

        <p className="text-gray-600 mb-6 text-center">
          Last Updated: March 8, 2026
        </p>

        <div className="space-y-6 text-gray-700 leading-relaxed">

          <section>
            <h2 className="text-xl font-semibold mb-2">1. Introduction</h2>
            <p>
              At EasyToRent, we aim to provide a smooth experience for users
              searching for rental accommodations. This Refund & Cancellation
              Policy explains when refunds may be issued for payments made
              through our platform.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-2">
              2. Booking Cancellation by User
            </h2>

            <ul className="list-disc ml-6 space-y-2">
              <li>
                If the booking is cancelled before confirmation by the property
                owner, a full refund will be issued.
              </li>

              <li>
                If cancelled at least 24 hours before check-in, the refund may
                be issued after deducting payment processing charges.
              </li>

              <li>
                Cancellation within 24 hours of check-in may not be eligible
                for refund depending on the property policy.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-2">
              3. Non-Refundable Situations
            </h2>

            <ul className="list-disc ml-6 space-y-2">
              <li>The booking period has already started.</li>
              <li>User fails to show up on the check-in date.</li>
              <li>Incorrect booking information was provided.</li>
              <li>The service has already been used.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-2">
              4. Platform Service Fees
            </h2>

            <p>
              Some convenience fees or payment gateway charges may be
              non-refundable because they are charged by third-party
              payment providers.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-2">
              5. Property Owner Cancellation
            </h2>

            <p>
              If a property owner cancels a confirmed booking, users will
              receive a 100% refund to their original payment method.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-2">
              6. Refund Processing Time
            </h2>

            <p>
              Approved refunds will be processed within 5–10 business days
              and credited to the original payment method.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-2">
              7. Contact Us
            </h2>

            <p>
              For refund related queries please contact us:
            </p>

            <p className="mt-2">
              Email: support@easytorent.in <br />
              Website: https://www.easytorent.in/
            </p>
          </section>

        </div>
      </div>
    </div>
  );
};

export default RefundPolicy;