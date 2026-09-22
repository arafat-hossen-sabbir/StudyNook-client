import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { cancelBooking, getMyBookings } from "../../api/bookingApi";

const MyBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const loadBookings = async () => {
    try {
      setLoading(true);

      const data = await getMyBookings();

      setBookings(data);
    } catch (error) {
      console.error(error);
      setError("Failed to load your bookings.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadBookings();
  }, []);

  const handleCancel = async (id) => {
    try {
      await cancelBooking(id);

      setBookings((previous) =>
        previous.map((booking) =>
          booking._id === id ? { ...booking, status: "cancelled" } : booking,
        ),
      );

      toast.success("Booking cancelled successfully!");
    } catch (error) {
      console.error(error);

      const message =
        error.response?.data?.message || "Failed to cancel booking.";

      setError(message);
      toast.error(message);
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
        <h1 className="text-3xl font-bold">My Bookings</h1>

        {error && (
          <div className="mt-5 rounded-lg bg-error/10 p-4 text-error">
            {error}
          </div>
        )}

        {bookings.length === 0 ? (
          <div className="mt-8 rounded-2xl border border-base-300 bg-base-100 p-10 text-center">
            <h2 className="text-xl font-bold">No bookings yet</h2>

            <p className="mt-2 text-base-content/60">
              Your confirmed bookings will appear here.
            </p>
          </div>
        ) : (
          <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {bookings.map((booking) => (
              <article
                key={booking._id}
                className="rounded-2xl border border-base-300 bg-base-100 p-5 shadow-sm"
              >
                <h2 className="text-xl font-bold">{booking.room?.name}</h2>

                <div className="mt-4 space-y-2 text-sm">
                  <p>
                    <strong>Date:</strong> {booking.bookingDate}
                  </p>

                  <p>
                    <strong>Time:</strong> {booking.startTime} -{" "}
                    {booking.endTime}
                  </p>

                  <p>
                    <strong>Duration:</strong> {booking.duration} hour
                    {booking.duration !== 1 ? "s" : ""}
                  </p>

                  <p>
                    <strong>Total:</strong> ${booking.totalCost}
                  </p>
                </div>

                <div className="mt-5 flex items-center justify-between">
                  <span
                    className={`badge ${
                      booking.status === "confirmed"
                        ? "badge-success"
                        : "badge-error"
                    }`}
                  >
                    {booking.status}
                  </span>

                  {booking.status === "confirmed" && (
                    <button
                      onClick={() => handleCancel(booking._id)}
                      className="btn btn-sm btn-outline btn-error"
                    >
                      Cancel
                    </button>
                  )}
                </div>
              </article>
            ))}
          </div>
        )}
      </section>
    </main>
  );
};

export default MyBookings;
