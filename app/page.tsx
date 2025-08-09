export default function ThankYou() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center text-center p-8">
      <div>
        <h1 className="text-3xl font-bold mb-2">Thank you!</h1>
        <p className="text-stone-600">Your payment is being verified. A receipt will be sent via SMS/Email.</p>
        <a href="/" className="inline-block mt-6 underline">Back to home</a>
      </div>
    </div>
  );
}
