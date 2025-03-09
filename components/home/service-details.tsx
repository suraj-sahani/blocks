import React from "react";
import { Card, CardContent } from "../ui/card";

const ServiceDetails = () => {
  return (
    <section className="container">
      <h2 className="text-5xl text-center font-bold">
        We are a class apart from our competitiors.
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 py-8 max-w-6xl mx-auto">
        <Card className="min-h-[200px]">
          <CardContent>
            <h3 className="text-xl font-bold">Completed Bookings</h3>
            <p className="text-3xl font-bold">1.24 M</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent>
            <h3>Completed Bookings</h3>
            <p>1. 24 M</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent>
            <h3>Completed Bookings</h3>
            <p>1. 24 M</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent>
            <h3>Completed Bookings</h3>
            <p>1. 24 M</p>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default ServiceDetails;
