import { useEffect, useState } from "react";
import RoomCard from "../../components/RoomCard/RoomCard";
import { getRooms } from "../../api/roomApi";

const Rooms = () => {
  const [rooms, setRooms] = useState([]);
  const [search, setSearch] = useState("");
  const [amenities, setAmenities] = useState("");
  const [floor, setFloor] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    document.title = "StudyNook | Rooms";
  }, []);

  const loadRooms = async (filters = {}) => {
    try {
      setLoading(true);
      setError("");

      const data = await getRooms(filters);

      setRooms(data);
    } catch (error) {
      console.error(error);
      setError("Failed to load study rooms.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadRooms();
  }, []);

  const handleSearch = (event) => {
    event.preventDefault();

    loadRooms({
      search,
      amenities,
      floor,
      minPrice,
      maxPrice,
    });
  };

  const handleReset = () => {
    setSearch("");
    setAmenities("");
    setFloor("");
    setMinPrice("");
    setMaxPrice("");

    loadRooms();
  };

  return (
    <main className="min-h-screen bg-base-200">
      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        {/* Page Header */}
        <div className="mb-10">
          <p className="text-sm font-semibold uppercase tracking-widest text-primary">
            StudyNook Rooms
          </p>

          <h1 className="mt-2 text-4xl font-bold">
            Find a Room That Fits Your Study Plan
          </h1>

          <p className="mt-3 max-w-2xl text-base-content/65">
            Search and filter available study rooms based on your preferred
            location, amenities, and budget.
          </p>
        </div>

        {/* Search & Filters */}
        <form
          onSubmit={handleSearch}
          className="mb-10 rounded-2xl border border-base-300 bg-base-100 p-5 shadow-sm"
        >
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <label className="form-control">
              <span className="mb-2 text-sm font-medium">Search</span>

              <input
                type="text"
                placeholder="Room name or description"
                className="input input-bordered w-full"
                value={search}
                onChange={(event) => setSearch(event.target.value)}
              />
            </label>

            <label className="form-control">
              <span className="mb-2 text-sm font-medium">Amenities</span>

              <input
                type="text"
                placeholder="WiFi, Projector"
                className="input input-bordered w-full"
                value={amenities}
                onChange={(event) => setAmenities(event.target.value)}
              />
            </label>

            <label className="form-control">
              <span className="mb-2 text-sm font-medium">Floor</span>

              <select
                className="select select-bordered w-full"
                value={floor}
                onChange={(event) => setFloor(event.target.value)}
              >
                <option value="">All floors</option>
                <option value="1st Floor">1st Floor</option>
                <option value="2nd Floor">2nd Floor</option>
                <option value="3rd Floor">3rd Floor</option>
                <option value="4th Floor">4th Floor</option>
              </select>
            </label>

            <label className="form-control">
              <span className="mb-2 text-sm font-medium">Minimum Price</span>

              <input
                type="number"
                min="0"
                placeholder="10"
                className="input input-bordered w-full"
                value={minPrice}
                onChange={(event) => setMinPrice(event.target.value)}
              />
            </label>

            <label className="form-control">
              <span className="mb-2 text-sm font-medium">Maximum Price</span>

              <input
                type="number"
                min="0"
                placeholder="50"
                className="input input-bordered w-full"
                value={maxPrice}
                onChange={(event) => setMaxPrice(event.target.value)}
              />
            </label>

            <div className="flex items-end gap-3">
              <button type="submit" className="btn btn-primary flex-1">
                Search
              </button>

              <button
                type="button"
                onClick={handleReset}
                className="btn btn-outline"
              >
                Reset
              </button>
            </div>
          </div>
        </form>

        {/* Results */}
        {loading ? (
          <div className="flex justify-center py-20">
            <span className="loading loading-spinner loading-lg"></span>
          </div>
        ) : error ? (
          <div className="rounded-xl border border-error/20 bg-error/10 p-6 text-center text-error">
            {error}
          </div>
        ) : rooms.length === 0 ? (
          <div className="rounded-xl border border-base-300 bg-base-100 p-10 text-center">
            <h2 className="text-xl font-bold">No rooms found</h2>

            <p className="mt-2 text-base-content/60">
              Try changing your search or filter options.
            </p>
          </div>
        ) : (
          <>
            <div className="mb-5 flex items-center justify-between">
              <h2 className="text-2xl font-bold">Available Rooms</h2>

              <span className="text-sm text-base-content/60">
                {rooms.length} room{rooms.length !== 1 ? "s" : ""}
              </span>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {rooms.map((room) => (
                <RoomCard key={room._id} room={room} />
              ))}
            </div>
          </>
        )}
      </section>
    </main>
  );
};

export default Rooms;
