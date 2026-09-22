import { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { createRoom } from "../../api/roomApi";

const AddRoom = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    image: "",
    floor: "",
    capacity: "",
    hourlyRate: "",
    amenities: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    setLoading(true);
    setError("");

    try {
      const roomData = {
        name: formData.name,
        description: formData.description,
        image: formData.image,
        floor: formData.floor,
        capacity: Number(formData.capacity),
        hourlyRate: Number(formData.hourlyRate),
        amenities: formData.amenities
          .split(",")
          .map((item) => item.trim())
          .filter(Boolean),
      };

      await createRoom(roomData);

      toast.success("Room added successfully!");

      navigate("/my-listings");
    } catch (error) {
      console.error(error);

      const message = error.response?.data?.message || "Failed to add room";

      setError(message);
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-base-200 px-4 py-12">
      <section className="mx-auto max-w-3xl">
        <div className="rounded-3xl border border-base-300 bg-base-100 p-6 shadow-sm sm:p-8">
          <h1 className="text-3xl font-bold">Add Study Room</h1>

          <p className="mt-2 text-base-content/60">
            Create a new study room listing.
          </p>

          <form onSubmit={handleSubmit} className="mt-8 space-y-5">
            <input
              name="name"
              placeholder="Room name"
              className="input input-bordered w-full"
              value={formData.name}
              onChange={handleChange}
              required
            />

            <textarea
              name="description"
              placeholder="Room description"
              className="textarea textarea-bordered h-32 w-full"
              value={formData.description}
              onChange={handleChange}
              required
            />

            <input
              name="image"
              type="url"
              placeholder="Image URL"
              className="input input-bordered w-full"
              value={formData.image}
              onChange={handleChange}
              required
            />

            <div className="grid gap-5 sm:grid-cols-2">
              <input
                name="floor"
                placeholder="Floor e.g. 2nd Floor"
                className="input input-bordered w-full"
                value={formData.floor}
                onChange={handleChange}
                required
              />

              <input
                name="capacity"
                type="number"
                min="1"
                placeholder="Capacity"
                className="input input-bordered w-full"
                value={formData.capacity}
                onChange={handleChange}
                required
              />

              <input
                name="hourlyRate"
                type="number"
                min="0"
                placeholder="Hourly rate"
                className="input input-bordered w-full"
                value={formData.hourlyRate}
                onChange={handleChange}
                required
              />

              <input
                name="amenities"
                placeholder="Wi-Fi, Projector, Whiteboard"
                className="input input-bordered w-full"
                value={formData.amenities}
                onChange={handleChange}
                required
              />
            </div>

            {error && (
              <div className="rounded-lg bg-error/10 p-3 text-sm text-error">
                {error}
              </div>
            )}

            <button
              type="submit"
              className="btn btn-primary w-full"
              disabled={loading}
            >
              {loading ? (
                <span className="loading loading-spinner loading-sm" />
              ) : (
                "Create Room"
              )}
            </button>
          </form>
        </div>
      </section>
    </main>
  );
};

export default AddRoom;
