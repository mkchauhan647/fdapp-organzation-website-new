import PublicLayout from "@/views/layouts/publicLayout";
import Image from "next/image";
import Link from "next/link";
import notfoundimage from "../../public/image/404.svg";
export default function NotFound() {
  return (
    <PublicLayout>
      <div className=" flex flex-col items-center justify-center">
        <Image
          alt="404 Not Found"
          src={notfoundimage}
          height={400}
          width={400}
        />
        <Link className=" btn-primary" href="/">Return Home</Link>
      </div>
    </PublicLayout>
  );
}
