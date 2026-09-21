import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { deleteRoom, getMyListings } from "../../api/roomApi";

const MyListings = () => {
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const loadListings = async () => {
    try {
      setLoading(true);
      setError("");

      const data = await getMyListings();

      setRooms(data);
    } catch (error) {
      console.error(error);

      setError("Failed to load your listings.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadListings();
  }, []);

  const handleDelete = async (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this room?",
    );

    if (!confirmed) return;

    try {
      await deleteRoom(id);

      setRooms((previous) => previous.filter((room) => room._id !== id));
    } catch (error) {
      console.error(error);

      setError(error.response?.data?.message || "Failed to delete the room.");
    }
  };

  if (loading) {
    return (
      <main className="flex min-h-screen items-center justify-center">
        <span className="loading loading-spinner loading-lg" />
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-base-200 px-4 py-12">
      <section className="mx-auto max-w-7xl">
        <div className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <p className="text-sm font-semibold uppercase tracking-widest text-primary">
              Dashboard
            </p>

            <h1 className="mt-2 text-3xl font-bold">My Listings</h1>
          </div>

          <Link to="/add-room" className="btn btn-primary">
            Add New Room
          </Link>
        </div>

        {error && (
          <div className="mb-6 rounded-lg bg-error/10 p-4 text-error">
            {error}
          </div>
        )}

        {rooms.length === 0 ? (
          <div className="rounded-2xl border border-base-300 bg-base-100 p-10 text-center">
            <h2 className="text-xl font-bold">No listings yet</h2>

            <p className="mt-2 text-base-content/60">
              Add your first study room to get started.
            </p>

            <Link to="/add-room" className="btn btn-primary mt-5">
              Add Room
            </Link>
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {rooms.map((room) => (
              <article
                key={room._id}
                className="overflow-hidden rounded-2xl border border-base-300 bg-base-100 shadow-sm"
              >
                <img
                  src={room.image}
                  alt={room.name}
                  className="h-48 w-full object-cover"
                />

                <div className="p-5">
                  <h2 className="text-xl font-bold">{room.name}</h2>

                  <p className="mt-2 line-clamp-2 text-sm text-base-content/60">
                    {room.description}
                  </p>

                  <div className="mt-4 flex justify-between text-sm">
                    <span>{room.floor}</span>
                    <span>${room.hourlyRate}/hour</span>
                  </div>

                  <div className="mt-5 flex gap-2">
                    <Link
                      to={`/rooms/${room._id}/edit`}
                      className="btn btn-outline flex-1"
                    >
                      Edit
                    </Link>

                    <button
                      onClick={() => handleDelete(room._id)}
                      className="btn btn-error flex-1"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>
    </main>
  );
};

export default MyListings;
