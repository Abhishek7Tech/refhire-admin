function Dashboard() {
  return (
    <section className="mt-8 mx-auto">
      <div className="flex space-x-8">
        <div className="bg-white/25 border border-white/30 shadow-lg backdrop-blur-md p-4 rounded-2xl w-fit">
          <h1 className="text-slate-700 font-mukta text-2xl font-medium">
            👋 Welcome, Abhishek.
          </h1>
        </div>

        <div className="bg-white/25 border border-white/30 shadow-lg backdrop-blur-md p-4 rounded-2xl w-fit">
          <h1 className="text-slate-700 font-mukta text-2xl font-medium">
            💰 Earnings: $500.
          </h1>
        </div>

        <div className="bg-white/25 border border-white/30 shadow-lg backdrop-blur-md p-4 rounded-2xl w-fit">
          <h1 className="text-slate-700 font-mukta text-2xl font-medium">
            📑Resume Added: 10.
          </h1>
        </div>

        <div className="bg-white/25 border border-white/30 shadow-lg backdrop-blur-md p-4 rounded-2xl w-fit">
          <h1 className="text-slate-700 font-mukta text-2xl font-medium">
            ✅ Successfull Referrals: 6.
          </h1>
        </div>
      </div>
    </section>
  );
}

export default Dashboard;
