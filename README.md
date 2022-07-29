## Ponsor
getting sponsored made easy through widgets

### Tech Stack
A lot of different tech and soft wares were used to create Ponsor, here is a list of the tech I used - 
- [Next.js](https://nextjs.org) - Framework
- [PlanetScale](https://planetscale.com) - Database
- [Tailwind CSS](https://tailwindcss.com) - Styling
- [VS Code](https://code.visualstudio.com/) - Code Editor
- [Next Auth](https://next-auth.js.org/) - Auth
- [GitHub](https://github.com) - Code Base
- [Prisma](https://prisma.io) - ORM
- [Vercel](https://vercel.app) - Host
- [Nprogress](https://ricostacruz.com/nprogress/) - Progress Bars
- [React Hot Toast](https://react-hot-toast.com/) - Toast Notifications
- [React Icons / Feather Icons](https://react-icons.github.io/react-icons/icons?name=fi) - Icons
- [Favmoji](https://github.com/asrvd/favmoji) - Favicon as a service

### Run Locally
- Clone the repository
```bash
git clone https://github.com/asrvd/ponsor.git
```
- Install dependencies
```bash
cd ponsor
pnpm i # or npm i
```
- Create a `.env` file and put these env variables in it
```env
DATABASE_URL=
GITHUB_CLIENT_ID=
GITHUB_CLIENT_SECRET=
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=
NEXTAUTH_SECRET=
NEXT_PUBLIC_CLOUDINARY_PRESET=
NEXT_PUBLIC_CLOUDINARY_NAME=
NEXTAUTH_URL=
```
- Fire up prisma
```bash
pnpm dlx prisma db push # or npx prisma db push
```
- Run the app
```bash
pnpm run dev # or npm run dev
```

### License 
[MIT License](LICENSE)

### Contributing
- Fork the repository
- Create a new branch
- Make your changes
- Commit your changes
- Push your changes to the main branch
- Open a pull request

### Ending Note
- This project was made for the [hashnode](https://hashnode.com) x [planetscale](https://planetscale.com) hackathon.
- If you have any questions, suggestions or bug reports please open an issue.
- Leave a star if you like the project.
- If you like this project, please consider [supporting](https://www.buymeacoffee.com/asheeshh) me.