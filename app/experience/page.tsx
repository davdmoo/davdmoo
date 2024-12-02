import Link from "next/link"
import PageHeader from "../components/page_header.components"

export default function WorkSummary() {
  return (
    <div className="flex flex-col items-center text-justify justify-center">
      <PageHeader title="/experience" subtitle="" />
      <div className="flex flex-col items-start w-full">
        <h2 className="">
          Staff Programmer at{" "}
          <Link href="https://qios-id.com" target="_blank" rel="noopener noreferrer">
            Qios
          </Link>
        </h2>
        <p className="mb-4">
          <em>(February 2022 - present)</em>
        </p>
        <ul className="list-disc">
          <li>
            Develop, maintain, and deploy a self-service bus ticketing platform using Flutter and Javascript, serving up
            to 90,000 transactions per month in Soekarno-Hatta airport
          </li>
          <li>
            Develop, maintain, and deploy a self-service membership management platform using Flutter and Typescript for
            FTL gym
          </li>
          <li>
            Become a core contributor in various Android, web, and backend applications using Flutter, Typescript, and
            Firebase
          </li>
          <li>Implement Firebase Cloud Messaging for payment notifications</li>
          <li>Integrate QRIS and EDC payments</li>
          <li>Develop integrations with third party systems</li>
          <li>Develop unit tests using Jest</li>
        </ul>
        <p className="mt-3">
          <strong>Tech stacks</strong>: Flutter, Typescript, Javascript, Firestore NoSQL, MongoDB, CI/CD with GitHub
          Actions, Firebase Cloud Messaging, Google Cloud Functions, Google Cloud Platform (GCP)
        </p>

        <hr className="my-6 w-full" />

        <h2 className="">Freelance Full Stack Developer</h2>
        <ul className="list-disc">
          <li>Successfully developed 1 project for a client in the retail industry</li>
          <li>Developed a Windows-based invoice and stock management app using Flutter, Typescript, and MongoDB</li>
          <li>
            Implemented features such as authentication, sales data management, automated hard and soft copy invoice
            generation, stock tracking, customer management, and monthly reporting
          </li>
          <li>Managed project timeline and feature implementations using GitHub Projects</li>
          <li>Create and manage monthly database backups</li>
          <li>Integrated Sentry for application error tracking</li>
        </ul>

        <p className="mt-3">
          <strong>Tech stacks</strong>: Flutter, Typescript, MongoDB, GitHub Projects, Google Cloud Functions, Google
          Cloud Tasks
        </p>
      </div>
    </div>
  )
}
