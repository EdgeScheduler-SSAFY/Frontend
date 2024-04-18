"use client";
import Link from "next/link";

export default function MyPageLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div>
      <Link href="/myPage/update">update information</Link>
      <Link href="/myPage/alarm">alarm list</Link>
    </div>
  );
}
