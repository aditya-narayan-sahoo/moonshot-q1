const Avatar = ({ name }) => {
  const initials = name ? name.charAt(0).toUpperCase() : "A";
  return (
    <div
      className="size-12 bg-accent rounded-full text-filterBtn flex items-center justify-center"
      role="img"
      aria-label={`Avatar for ${name || "Anonymous"}`}
      aria-hidden={!name}
    >
      <span className="text-2xl" aria-hidden="true">
        {initials}
      </span>
    </div>
  );
};

export default Avatar;
