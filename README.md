This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

Create a modern, beautiful and sleek design using beautiful micro-interactions for a product that deals with booking your parking area and EV Charging Spot using NextJS, Tailwindcss and ShadCN UI.

The Homepage should look modern, showcasing the product

The platform can have two types of Users:

1. Renter : They can place their parking area/ev charging station in the platform.
2. User: They can search for parking areas and ev charging station and book the following.

Create Designs for Sign Up and Sign In flows for both types of users.

Here are the requirements of UI for both types of users:
Host:

1. A Dashboard UI showing analytics like the number of parking areas/ev stations, booking and revenue earned along with other relevant UI elements that you feel important.
2. A bookings page showing all the bookings and with booking details page.
3. Listing pages showing all the parking areas/ev stations that the renter has added to the platform.
4. Revenue/Wallet page from where the renter can withdraw the money they have earned.
5. Profile Page for the host that will contain all the user's information.
6. Dedicated pages where the renter can add a parking area and ev charging spots.

User:

1. An interative home page where the user will first select the checkin and checkout datetime and the type of vehicle, then they can search for parking areas/ev charging station by entering the address. There will also be a map that show all the locations available near the address they have searched. The user will can also see the list of available location for better UX. The user can click on any location and it will take them to the location details page.
2. The location details page should contain all the information about the location with images and any relevant information that you think is important.
3. A booking page where the user will book the location and pay using stripe. Do not integrate Stripe. Just create the UI.
4. A booking page, where the user can see all the booking they have made. Add necessary UI items accordingly.
5. Profile Page for the user that will contain all the user's information.

Make sure that the design is beautiful and does not look like a template.
