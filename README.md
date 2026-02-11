# EL NAFEER - Real Estate Platform

A comprehensive real estate marketplace platform for buying, selling, and renting properties with advanced lead management and owner dashboards.

## Features

- ✅ Property listings with images and detailed descriptions
- ✅ Advanced search and filtering
- ✅ Lead management system
- ✅ Property owner dashboards
- ✅ Email notifications
- ✅ Admin dashboard with full control
- ✅ User authentication with Gmail
- ✅ Responsive design
- ✅ Bilingual support (Arabic/English)
- ✅ Mobile-friendly interface

## Technology Stack

- **Framework**: Next.js 16+ with TypeScript
- **Database**: PostgreSQL with Prisma ORM
- **Authentication**: NextAuth.js with Gmail OAuth
- **Styling**: Tailwind CSS with RTL support
- **Internationalization**: next-intl
- **Image Handling**: Optimized image uploads

## Getting Started

### Prerequisites

- Node.js 18+ 
- PostgreSQL database
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd el-nafeer-real-estate
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.local.example .env.local
```

Edit `.env.local` with your configuration (see `REQUIRED_CONFIGURATION.md`)

4. Set up the database:
```bash
npx prisma generate
npx prisma db push
```

5. Run the development server:
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Environment Variables

See `.env.local` for configuration.

Key variables:
- `DATABASE_URL` - PostgreSQL connection string (Supabase)
- `NEXTAUTH_SECRET` - NextAuth secret key
- `GOOGLE_CLIENT_ID` / `GOOGLE_CLIENT_SECRET` - Google OAuth credentials
- `NEXTAUTH_URL` - Your application URL
- `ADMIN_EMAIL` - Admin contact email

## Project Structure

```
el-nafeer-real-estate/
├── app/
│   ├── (public)/          # Public pages
│   ├── admin/             # Admin dashboard
│   ├── owner/             # Property owner dashboard
│   └── api/               # API routes
├── components/            # React components
├── lib/                   # Utility functions
├── prisma/                # Database schema
└── public/                # Static assets
```

## Key Features

### For Buyers/Renters
- Browse property listings
- Advanced filters (location, price, features)
- Contact property owners
- Save favorite properties
- View property details and images

### For Property Owners
- Create and manage property listings
- Upload multiple property images
- Track leads and inquiries
- Manage property status
- View contact information from interested buyers

### For Administrators
- Full platform control
- User and property management
- Analytics and reporting
- Settings management
- Support and troubleshooting

## Admin Access

Default admin credentials (change in production):
- Email: Set via `ADMIN_EMAIL` env variable
- Password: Set via `ADMIN_PASSWORD` env variable

## Property Management

Property owners can:
- List new properties with detailed information
- Upload multiple images
- Set pricing and availability
- Track interested buyers
- Manage property status (available, sold, reserved)

## Development

```bash
# Development server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Database commands
npm run db:generate  # Generate Prisma client
npm run db:push      # Push schema to database
npm run db:studio    # Open Prisma Studio
```

## Security Notes

- Secure user authentication with NextAuth
- All API routes are protected
- User data encryption
- Input validation on all forms
- Secure password hashing
- Protected admin panel

## License

This project is provided as-is for real estate marketplace operations.

## Support

For issues or questions, please contact the development team.

---

**Status**: Production Ready (with proper environment configuration)


