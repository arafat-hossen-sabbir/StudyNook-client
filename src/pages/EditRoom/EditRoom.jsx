import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getRoomById, updateRoom } from "../../api/roomApi";

const EditRoom = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadRoom = async () => {
      try {
        const room = await getRoomById(id);

        setFormData({
          ...room,
          amenities: room.amenities?.join(", ") || "",
        });
      } catch (error) {
        console.error(error);
        setError("Failed to load room.");
      } finally {
        setLoading(false);
      }
    };

    loadRoom();
  }, [id]);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    setSaving(true);
    setError("");

    try {
      await updateRoom(id, {
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
      });

      navigate("/my-listings");
    } catch (error) {
      console.error(error);

      setError(error.response?.data?.message || "Failed to update room.");
    } finally {
      setSaving(false);
    }
  };

  if (loading || !formData) {
    return (
      <main className="flex min-h-screen items-center justify-center">
        {error ? (
          <p className="text-error">{error}</p>
        ) : (
          <span className="loading loading-spinner loading-lg" />
        )}
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-base-200 px-4 py-12">
      <section className="mx-auto max-w-3xl">
        <div className="rounded-3xl border border-base-300 bg-base-100 p-6 shadow-sm sm:p-8">
          <h1 className="text-3xl font-bold">Edit Study Room</h1>

          <form onSubmit={handleSubmit} className="mt-8 space-y-5">
            <input
              name="name"
              className="input input-bordered w-full"
              value={formData.name}
              onChange={handleChange}
              required
            />

            <textarea
              name="description"
              className="textarea textarea-bordered h-32 w-full"
              value={formData.description}
              onChange={handleChange}
              required
            />

            <input
              name="image"
              type="url"
              className="input input-bordered w-full"
              value={formData.image}
              onChange={handleChange}
              required
            />

            <div className="grid gap-5 sm:grid-cols-2">
              <input
                name="floor"
                className="input input-bordered w-full"
                value={formData.floor}
                onChange={handleChange}
                required
              />

              <input
                name="capacity"
                type="number"
                min="1"
                className="input input-bordered w-full"
                value={formData.capacity}
                onChange={handleChange}
                required
              />

              <input
                name="hourlyRate"
                type="number"
                min="0"
                className="input input-bordered w-full"
                value={formData.hourlyRate}
                onChange={handleChange}
                required
              />

              <input
                name="amenities"
                className="input input-bordered w-full"
                value={formData.amenities}
                onChange={handleChange}
                required
              />
            </div>

            {error && (
              <div className="rounded-lg bg-error/10 p-3 text-error">
                {error}
              </div>
            )}

            <button disabled={saving} className="btn btn-primary w-full">
              {saving ? (
                <span className="loading loading-spinner loading-sm" />
              ) : (
                "Save Changes"
              )}
            </button>
          </form>
        </div>
      </section>
    </main>
  );
};

export default EditRoom;
