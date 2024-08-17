import Image from "next/image";
import { Button } from "@repo/ui/button";
import styles from "./page.module.css";
import {PrismaClient} from "@prisma/client"


export default async function Home() {
  const pri = new PrismaClient()
  const users = await pri.user.findMany()
  return (
    <div className="min-h-screen bg-primary">
    {/* Hero Section */}
    <section className="hero min-h-screen bg-primary text-primary-content flex flex-col justify-center items-center space-y-4">
  <h1 className="text-primary">Primary: #1DA1F2</h1>
  <h1 className="text-primary-focus">Primary Focus: #1A91DA</h1>
  <h1 className="text-secondary">Secondary: #15202B</h1>
  <h1 className="text-secondary-focus">Secondary Focus: #1C2733</h1>
  <h1 className="text-accent">Accent: #17BF63</h1>
  <h1 className="text-accent-focus">Accent Focus: #16A15D</h1>
  <h1 className="text-neutral">Neutral: #38444D</h1>
  <h1 className="text-neutral-focus">Neutral Focus: #2C3E50</h1>
  <h1 className="text-info">Info: #1DA1F2</h1>
  <h1 className="text-success">Success: #17BF63</h1>
  <h1 className="text-warning">Warning: #FFAD1F</h1>
  <h1 className="text-error">Error: #E0245E</h1>
</section>


    {/* Benefits Section */}
    <section className="py-12 bg-base-100">
      <div className="container mx-auto text-center">
        <h2 className="text-4xl font-bold mb-6">Why Exchange Courses?</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="card bg-base-200 shadow-lg">
            <div className="card-body">
              <h3 className="text-xl font-semibold">Expand Your Knowledge</h3>
              <p>Gain access to a diverse range of courses without spending a dime. Learn from different perspectives and expertise.</p>
            </div>
          </div>
          <div className="card bg-base-200 shadow-lg">
            <div className="card-body">
              <h3 className="text-xl font-semibold">Cost-Effective Learning</h3>
              <p>Save money by exchanging courses instead of purchasing new ones. Enjoy high-quality education at no extra cost.</p>
            </div>
          </div>
          <div className="card bg-base-200 shadow-lg">
            <div className="card-body">
              <h3 className="text-xl font-semibold">Flexible and Convenient</h3>
              <p>Exchange courses with ease and access them anytime, anywhere. Fit learning into your schedule without hassle.</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    {/* CTA Section */}
    <section className="py-12 bg-primary text-primary-content">
      <div className="container mx-auto text-center">
        <h2 className="text-3xl font-bold mb-4">Ready to Start Learning?</h2>
        <p className="mb-6">Join our community today and start exchanging courses with fellow learners. The path to knowledge starts here!</p>
        <button className="btn btn-secondary">Join Now</button>
      </div>
    </section>
  </div>
  );
}
