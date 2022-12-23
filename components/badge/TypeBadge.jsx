import PropTypes from "prop-types";

const TYPES_STYLES = {
  bug: "bg-lime-200 text-lime-700",
  dark: "bg-violet-200 text-violet-700",
  dragon: "bg-indigo-200 text-indigo-700",
  electric: "bg-yellow-300 text-yellow-700",
  fairy: "bg-pink-200 text-pink-700",
  fighting: "bg-red-200 text-red-700",
  fire: "bg-orange-200 text-orange-700",
  flying: "bg-blue-200 text-blue-700",
  ghost: "bg-indigo-200 text-indigo-700",
  grass: "bg-green-200 text-green-700",
  ground: "bg-yellow-200 text-yellow-700",
  ice: "bg-cyan-200 text-cyan-700",
  normal: "bg-gray-200 text-gray-700",
  poison: "bg-violet-200 text-violet-700",
  water: "bg-blue-300 text-blue-700",
  psychic: "bg-rose-300 text-rose-700",
};

function TypeBadge({ type, className }) {
  return (
    <span
      className={`text-xs font-bold rounded-xl px-3 leading-5 uppercase ${TYPES_STYLES[type]} ${className}` }
    >
      {type}
    </span>
  );
}

TypeBadge.propTypes = {
  type: PropTypes.string.isRequired,
  className: PropTypes.string,
};

TypeBadge.defaultProps = {
  className: "",
};

export default TypeBadge;