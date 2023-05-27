This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Cloning the repository
```
git clone https://github.com/futureituki/NextAuth-template.git
```

## Install packages
```
npm i
```

## Setup .env file

```
DATABASE_URL=
NEXTAUTH_SECRET=

NEXT_PUBLIC_PUSHER_APP_KEY=
PUSHER_APP_ID=
PUSHER_SECRET=

NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=

GITHUB_ID=
GITHUB_SECRET=

GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=
```

## SetUp Prisma
```
npx prisma db push
```

## Start the app 
```
npm run dev
```

# Available commands
Running commands with npm `npm run [command]`

| command         | description                              　　　　|
| :-------------- | :--------------------------------------- 　　　　|
| `dev`           | Starts a development instance of the app 　　　　|
| `prisma`        | prisma studio https://www.prisma.io/studio |
