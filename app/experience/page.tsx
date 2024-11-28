import Link from "next/link";

export default function WorkSummary() {
  return (
    <div className="flex flex-col items-center text-justify">
      <h1 className="text-4xl font-bold mb-4">Work Experience</h1>

      <hr className="my-6 w-full" />

      <div className="flex flex-col items-start w-full">
        <h2 className="text-xl mb-2 font-bold">Staff Programmer at <Link href="https://qios-id.com" target="_blank" rel="noopener noreferrer" >Qios</Link></h2>
        <p className="mb-4"><em>(February 2022 - present)</em></p>
        <ul className="list-disc">
          <li>Independently delivered a self-service bus ticketing Android app serving up to 90,000 transactions per month in Soekarno-Hatta airport</li>
          <li>Independently delivered a self-service membership management Android app for FTL gym</li>
          <li>Become a core contributor in various Android, web, and backend applications using Flutter, Typescript, and Firebase</li>
          <li>Implement Firebase Cloud Messaging for payment notifications</li>
          <li>Integrate QRIS and EDC (non-Android) payments</li>
          <li>Develop integrations with third party systems</li>
        </ul>

        <hr className="my-6 w-full" />

        <h2 className="text-xl mb-2 font-bold">Freelance Full Stack Developer</h2>
        <ul className="list-disc">
          <li>Successfully delivered 1 project for a client in the retail industry</li>
          <li>Developed a Windows-based invoice and stock management app using Flutter, Typescript, and MongoDB</li>
          <li>Implemented features such as authentication, sales data management, automated hard and soft copy invoice generation, stock tracking, customer management, and monthly reporting</li>
          <li>Managed project timeline and feature implementations using GitHub Projects</li>
          <li>Create and manage monthly database backups</li>
          <li>Integrated Sentry for application error tracking</li>
        </ul>

        <hr className="mt-6 w-full" />
      </div>
    </div>
  );
}
