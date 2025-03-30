interface Props {
  name: string;
  description: string;
}

function BadgeText({ name, description }: Props) {
  return (
    <div className="flex flex-col gap-1 max-w-sm">
      <div className="font-bold">{name}</div>
      <div>{description}</div>
    </div>
  );
}

export default BadgeText;
