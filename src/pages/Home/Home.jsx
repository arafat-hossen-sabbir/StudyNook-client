import { Link } from "react-router-dom";
import RoomCard from "../../components/RoomCard/RoomCard";
import roomData from "./roomData";

const Home = () => {
  return (
    <main>
      <section className="bg-base-200">
        <div className="mx-auto max-w-6xl px-4 py-1 sm:px-6 lg:px-8">
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
                  src="/hero.png"
                  alt="Quiet study room"
                  className="h-[500px] w-full rounded-2xl object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="bg-base-100 py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <span className="text-sm font-semibold uppercase tracking-wider text-primary">
              Available spaces
            </span>

            <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
              Latest Study Rooms
            </h2>

            <p className="mt-4 text-base leading-7 text-base-content/65">
              Explore our newest study spaces and find a comfortable place to
              focus on your next learning session.
            </p>
          </div>

          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {roomData.slice(0, 6).map((room) => (
              <RoomCard key={room._id} room={room} />
            ))}
          </div>

          <div className="mt-10 text-center">
            <Link to="/rooms" className="btn btn-outline">
              View All Rooms
            </Link>
          </div>
        </div>
      </section>
      {/* Why StudyNook */}
      <section className="bg-base-200 py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <span className="text-sm font-semibold uppercase tracking-wider text-primary">
              Why StudyNook
            </span>

            <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
              Built for Better Study Sessions
            </h2>

            <p className="mt-4 text-base leading-7 text-base-content/65">
              Everything you need to find a comfortable and productive
              environment for your academic work.
            </p>
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-3">
            <div className="rounded-2xl border border-base-300 bg-base-100 p-7">
              <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-xl text-primary">
                ✓
              </div>

              <h3 className="text-xl font-bold">Comfortable Spaces</h3>

              <p className="mt-3 leading-7 text-base-content/65">
                Choose from dedicated study spaces designed for focused learning
                and productive sessions.
              </p>
            </div>

            <div className="rounded-2xl border border-base-300 bg-base-100 p-7">
              <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-xl text-primary">
                ★
              </div>

              <h3 className="text-xl font-bold">Useful Amenities</h3>

              <p className="mt-3 leading-7 text-base-content/65">
                Find rooms with Wi-Fi, projectors, whiteboards, power outlets,
                and other useful facilities.
              </p>
            </div>

            <div className="rounded-2xl border border-base-300 bg-base-100 p-7">
              <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-xl text-primary">
                ⚡
              </div>

              <h3 className="text-xl font-bold">Simple Booking</h3>

              <p className="mt-3 leading-7 text-base-content/65">
                Browse rooms, select a suitable time, and manage your bookings
                from one convenient place.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="bg-base-100 py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <span className="text-sm font-semibold uppercase tracking-wider text-primary">
              Simple process
            </span>

            <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
              Book a Room in Three Steps
            </h2>

            <p className="mt-4 text-base leading-7 text-base-content/65">
              Getting your ideal study space is quick and straightforward.
            </p>
          </div>

          <div className="mt-12 grid gap-8 md:grid-cols-3">
            <div className="text-center">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-primary text-lg font-bold text-primary-content">
                01
              </div>

              <h3 className="mt-5 text-xl font-bold">Find a Room</h3>

              <p className="mt-3 leading-7 text-base-content/65">
                Explore available rooms and compare their capacity, hourly rate,
                and amenities.
              </p>
            </div>

            <div className="text-center">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-primary text-lg font-bold text-primary-content">
                02
              </div>

              <h3 className="mt-5 text-xl font-bold">Choose Your Time</h3>

              <p className="mt-3 leading-7 text-base-content/65">
                Select a suitable date and available hourly time slot for your
                study session.
              </p>
            </div>

            <div className="text-center">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-primary text-lg font-bold text-primary-content">
                03
              </div>

              <h3 className="mt-5 text-xl font-bold">Confirm Booking</h3>

              <p className="mt-3 leading-7 text-base-content/65">
                Confirm your booking and manage your study sessions from your
                account.
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Home;
