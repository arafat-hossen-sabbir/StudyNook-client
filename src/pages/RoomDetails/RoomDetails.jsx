import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getRoomById } from "../../api/roomApi";

const RoomDetails = () => {
  const { id } = useParams();

  const [room, setRoom] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadRoom = async () => {
      try {
        setLoading(true);
        setError("");

        const data = await getRoomById(id);

        setRoom(data);
      } catch (error) {
        console.error(error);
        setError("Failed to load room details.");
      } finally {
        setLoading(false);
      }
    };

    loadRoom();
  }, [id]);

  useEffect(() => {
    document.title = room ? `${room.name} | StudyNook` : "StudyNook | Room";
  }, [room]);

  if (loading) {
    return (
      <main className="flex min-h-screen items-center justify-center">
        <span className="loading loading-spinner loading-lg"></span>
      </main>
    );
  }

  if (error || !room) {
    return (
      <main className="flex min-h-screen items-center justify-center px-4">
        <div className="text-center">
          <h1 className="text-3xl font-bold">Room Not Found</h1>

          <p className="mt-3 text-base-content/60">
            We couldn't find the study room you're looking for.
          </p>

          <Link to="/rooms" className="btn btn-primary mt-6">
            Back to Rooms
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-base-200">
      <section className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="overflow-hidden rounded-3xl border border-base-300 bg-base-100 shadow-sm">
          <div className="grid lg:grid-cols-2">
            {/* Room Image */}
            <div className="min-h-[350px]">
              <img
                src={room.image}
                alt={room.name}
                className="h-full min-h-[350px] w-full object-cover"
              />
            </div>

            {/* Room Information */}
            <div className="p-6 sm:p-8 lg:p-10">
              <span className="badge badge-primary badge-outline">
                Study Room
              </span>

              <h1 className="mt-4 text-4xl font-bold">{room.name}</h1>

              <p className="mt-4 leading-7 text-base-content/65">
                {room.description}
              </p>

              {/* Room Stats */}
              <div className="mt-8 grid grid-cols-2 gap-4">
                <div className="rounded-xl bg-base-200 p-4">
                  <span className="text-sm text-base-content/50">Floor</span>

                  <p className="mt-1 font-semibold">{room.floor}</p>
                </div>

                <div className="rounded-xl bg-base-200 p-4">
                  <span className="text-sm text-base-content/50">Capacity</span>

                  <p className="mt-1 font-semibold">{room.capacity} people</p>
                </div>
              </div>

              {/* Price */}
              <div className="mt-7">
                <span className="text-sm text-base-content/50">
                  Hourly rate
                </span>

                <div className="mt-1">
                  <span className="text-3xl font-bold text-primary">
                    ${room.hourlyRate}
                  </span>

                  <span className="text-base-content/50">/hour</span>
                </div>
              </div>

              {/* Amenities */}
              <div className="mt-7">
                <h2 className="font-semibold">Amenities</h2>

                <div className="mt-3 flex flex-wrap gap-2">
                  {room.amenities?.map((amenity) => (
                    <span
                      key={amenity}
                      className="badge badge-outline px-4 py-3"
                    >
                      {amenity}
                    </span>
                  ))}
                </div>
              </div>

              {/* Actions */}
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Link
                  to={`/rooms/${room._id}/book`}
                  className="btn btn-primary flex-1"
                >
                  Book This Room
                </Link>

                <Link to="/rooms" className="btn btn-outline">
                  Back to Rooms
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default RoomDetails;
