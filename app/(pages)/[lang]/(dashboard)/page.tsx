import { redirect } from "next/navigation";

export default async function Home() {
  redirect("/bookings"); // temporarily hide the home page
  return (
    <div className="homePage">
      <p>Welcome to the Home page</p>
    </div>
  );
}
