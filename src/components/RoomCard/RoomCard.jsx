import { Link } from "react-router-dom";

const RoomCard = ({ room }) => {
  const {
    _id,
    name,
    description,
    image,
    floor,
    capacity,
    hourlyRate,
    amenities = [],
  } = room;

  return (
    <article className="flex h-full flex-col overflow-hidden rounded-2xl border border-base-300 bg-base-100 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
      <img src={image} alt={name} className="h-56 w-full object-cover" />

      <div className="flex flex-1 flex-col p-5">
        <h3 className="text-xl font-bold">{name}</h3>

        <p className="mt-2 line-clamp-2 text-sm leading-6 text-base-content/65">
          {description}
        </p>

        <div className="mt-4 grid grid-cols-2 gap-3 text-sm">
          <div>
            <span className="text-base-content/50">Floor</span>
            <p className="font-semibold">{floor}</p>
          </div>

          <div>
            <span className="text-base-content/50">Capacity</span>
            <p className="font-semibold">{capacity} people</p>
          </div>
        </div>

        <div className="mt-4">
          <span className="text-2xl font-bold text-primary">${hourlyRate}</span>

          <span className="text-sm text-base-content/50">/hour</span>
        </div>

        <div className="mt-4 flex flex-wrap gap-2">
          {amenities.slice(0, 3).map((amenity) => (
            <span key={amenity} className="badge badge-outline">
              {amenity}
            </span>
          ))}

          {amenities.length > 3 && (
            <span className="badge badge-ghost">
              +{amenities.length - 3} more
            </span>
          )}
        </div>

        <Link to={`/rooms/${_id}`} className="btn btn-primary mt-auto w-full">
          View Details
        </Link>
      </div>
    </article>
  );
};

export default RoomCard;
