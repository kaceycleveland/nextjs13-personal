import Link from "next/link";

export default function NotFound() {
  return (
    <div className="prose m-auto p-4 text-center">
      <h1>Lost?</h1>
      <p>
        It seems like that post could not be found, try reading some other posts
        <Link className="ml-1" href="/posts">
          here
        </Link>
        !
      </p>
    </div>
  );
}
