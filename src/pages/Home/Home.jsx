import { Link } from "react-router-dom";

const Home = () => {
  return (
    <main>
      <section className="bg-base-200">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="grid min-h-[calc(100vh-65px)] items-center gap-12 lg:grid-cols-2">
            {/* Hero Content */}
            <div className="max-w-2xl">
              <span className="inline-flex rounded-full bg-primary/10 px-4 py-2 text-sm font-semibold text-primary">
                Focus better. Study smarter.
              </span>

              <h1 className="mt-5 text-4xl font-extrabold leading-tight tracking-tight sm:text-5xl lg:text-6xl">
                Find Your Perfect
                <span className="block text-primary">Study Room</span>
              </h1>

              <p className="mt-6 max-w-xl text-base leading-7 text-base-content/70 sm:text-lg">
                Discover quiet and comfortable study rooms designed for focused
                learning. Browse available spaces, compare amenities, and book
                the room that fits your study session.
              </p>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Link to="/rooms" className="btn btn-primary px-7">
                  Explore Rooms
                </Link>

                <Link to="/register" className="btn btn-outline px-7">
                  Get Started
                </Link>
              </div>

              <div className="mt-10 grid max-w-md grid-cols-3 gap-6 border-t border-base-300 pt-6">
                <div>
                  <p className="text-2xl font-bold">24/7</p>
                  <p className="text-sm text-base-content/60">
                    Flexible access
                  </p>
                </div>

                <div>
                  <p className="text-2xl font-bold">100%</p>
                  <p className="text-sm text-base-content/60">Private spaces</p>
                </div>

                <div>
                  <p className="text-2xl font-bold">Easy</p>
                  <p className="text-sm text-base-content/60">Online booking</p>
                </div>
              </div>
            </div>

            {/* Hero Image */}
            <div className="hidden lg:block">
              <div className="relative overflow-hidden rounded-3xl border border-base-300 bg-base-100 p-3 shadow-xl">
                <img
                  src="/study-room.jpg"
                  alt="Quiet study room"
                  className="h-[500px] w-full rounded-2xl object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Home;
