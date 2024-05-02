import Image from "next/image";

interface userButtonProps {
  profilePath: string;
  altText: string;
  userName: string;
}

export default function UserButton(props: userButtonProps) {
  return (
    <button>
      <Image src={props.profilePath} alt={props.altText} width={20} height={20} />
      {props.userName}
    </button>
  );
}
