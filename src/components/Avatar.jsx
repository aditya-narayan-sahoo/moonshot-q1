const Avatar = ({ name }) => {
  const initials = name ? name.charAt(0).toUpperCase() : "A";
  return (
    <div className="size-12 bg-accent rounded-full text-filterBtn flex items-center justify-center">
      <span className="text-2xl">{initials}</span>
    </div>
  );
};

export default Avatar;