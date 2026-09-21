import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getRoomById } from "../../api/roomApi";
import { createBooking } from "../../api/bookingApi";

const BookRoom = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [room, setRoom] = useState(null);

  const [bookingDate, setBookingDate] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [specialNote, setSpecialNote] = useState("");

  const [loading, setLoading] = useState(true);
  const [booking, setBooking] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadRoom = async () => {
      try {
        const data = await getRoomById(id);

        setRoom(data);
      } catch (error) {
        console.error(error);
        setError("Failed to load room.");
      } finally {
        setLoading(false);
      }
    };

    loadRoom();
  }, [id]);

  const duration =
    startTime && endTime
      ? Number(endTime.split(":")[0]) - Number(startTime.split(":")[0])
      : 0;

  const totalCost = duration > 0 ? duration * Number(room?.hourlyRate || 0) : 0;

  const handleSubmit = async (event) => {
    event.preventDefault();

    setError("");

    if (!bookingDate || !startTime || !endTime) {
      setError("Please select date and time.");
      return;
    }

    if (startTime >= endTime) {
      setError("End time must be after start time.");
      return;
    }

    setBooking(true);

    try {
      await createBooking({
        roomId: id,
        bookingDate,
        startTime,
        endTime,
        specialNote,
      });

      navigate("/my-bookings");
    } catch (error) {
      console.error(error);

      setError(error.response?.data?.message || "Failed to create booking.");
    } finally {
      setBooking(false);
    }
  };

  if (loading) {
    return (
      <main className="flex min-h-screen items-center justify-center">
        <span className="loading loading-spinner loading-lg" />
      </main>
    );
  }

  if (!room) {
    return (
      <main className="flex min-h-screen items-center justify-center">
        <p>Room not found.</p>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-base-200 px-4 py-12">
      <section className="mx-auto max-w-3xl">
        <div className="rounded-3xl border border-base-300 bg-base-100 p-6 shadow-sm sm:p-8">
          <h1 className="text-3xl font-bold">Book {room.name}</h1>

          <p className="mt-2 text-base-content/60">
            ${room.hourlyRate} per hour
          </p>

          <form onSubmit={handleSubmit} className="mt-8 space-y-6">
            <label className="form-control">
              <span className="mb-2 font-medium">Booking Date</span>

              <input
                type="date"
                className="input input-bordered"
                value={bookingDate}
                min={new Date().toISOString().split("T")[0]}
                onChange={(event) => setBookingDate(event.target.value)}
                required
              />
            </label>

            <div className="grid gap-5 sm:grid-cols-2">
              <label className="form-control">
                <span className="mb-2 font-medium">Start Time</span>

                <select
                  className="select select-bordered"
                  value={startTime}
                  onChange={(event) => setStartTime(event.target.value)}
                  required
                >
                  <option value="">Select start time</option>

                  {Array.from({ length: 12 }, (_, index) => {
                    const hour = index + 8;
                    const value = `${String(hour).padStart(2, "0")}:00`;

                    return (
                      <option key={value} value={value}>
                        {value}
                      </option>
                    );
                  })}
                </select>
              </label>

              <label className="form-control">
                <span className="mb-2 font-medium">End Time</span>

                <select
                  className="select select-bordered"
                  value={endTime}
                  onChange={(event) => setEndTime(event.target.value)}
                  required
                >
                  <option value="">Select end time</option>

                  {Array.from({ length: 12 }, (_, index) => {
                    const hour = index + 9;

                    if (hour > 20) return null;

                    const value = `${String(hour).padStart(2, "0")}:00`;

                    return (
                      <option key={value} value={value}>
                        {value}
                      </option>
                    );
                  })}
                </select>
              </label>
            </div>

            <label className="form-control">
              <span className="mb-2 font-medium">Special Note</span>

              <textarea
                className="textarea textarea-bordered h-28"
                placeholder="Any special requirements?"
                value={specialNote}
                onChange={(event) => setSpecialNote(event.target.value)}
              />
            </label>

            <div className="rounded-2xl bg-base-200 p-5">
              <div className="flex justify-between">
                <span>Duration</span>
                <strong>
                  {duration > 0 ? duration : 0} hour
                  {duration !== 1 ? "s" : ""}
                </strong>
              </div>

              <div className="mt-3 flex justify-between text-lg">
                <span>Total Cost</span>
                <strong className="text-primary">${totalCost}</strong>
              </div>
            </div>

            {error && (
              <div className="rounded-lg bg-error/10 p-4 text-error">
                {error}
              </div>
            )}

            <button
              type="submit"
              className="btn btn-primary w-full"
              disabled={booking}
            >
              {booking ? (
                <span className="loading loading-spinner loading-sm" />
              ) : (
                "Confirm Booking"
              )}
            </button>
          </form>
        </div>
      </section>
    </main>
  );
};

export default BookRoom;
